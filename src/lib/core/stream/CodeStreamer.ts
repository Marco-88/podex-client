import type { ItemStore, StoreItem, Completion } from '$lib//types';
import * as uuid from 'uuid';

export class CodeStreamer {
    private store: ItemStore<StoreItem>;
    private readonly reader: ReadableStreamReader<Uint8Array>;
    private tempToken: string;

    constructor(itemStore: ItemStore<StoreItem>, reader: ReadableStreamReader<Uint8Array>) {
        this.store = itemStore;
        this.reader = reader;
    }

    public async processStream(request: string): Promise<void> {
        const id = uuid.v4();
        const item = { id, request, response: '\n' }
        this.store.add(item);

        for await (const chunk of CodeStreamer.asyncIterableFromStream(this.reader)) {
            this.storeToken(id, chunk);
        }
    }

    private storeToken(id: string, chunk: Uint8Array) {
        const token = this.processCompletionToken(chunk);
        this.store.updateItem(id, token);

        if(this.tempToken) {
            this.store.updateItem(id, JSON.parse(this.tempToken).choices[0].text);
            this.tempToken = undefined;
        }
    }

    public async stopStream(): Promise<void> {
        try {
            await this.reader.cancel();
        } catch (e) {
            console.warn("Canceling not possible! It is no stream available.")
        }
    }

    private processCompletionToken(chunk: Uint8Array): string {
        const token = CodeStreamer.byteToString(chunk);

        if (token.startsWith('data: ')) {
            const item = this.parseCompletion(token);

            if (item && item.choices.length > 0)
                return item.choices[0].text
        }
        return '';
    }

    private parseCompletion(token: string): Completion {
        token = token.substr(6).replace('data: [DONE]', '');
        token = this.ifDoubleDataSetTemp(token);
        return JSON.parse(token);
    }

    private ifDoubleDataSetTemp(token: string): string {
        if (CodeStreamer.checkTokenForDoubleData(token)) {
            const tokens = token.split('data: {"id": "cmpl-')
            console.log("Found double data in token: : ", tokens[0]);
            this.tempToken = '{"id": "cmpl-' + tokens[1];
            return tokens[0];
        }
        return token;
    }

    private static checkTokenForDoubleData(token: string): boolean {
        return token.includes('data: {"id": "cmpl-') &&
            token.indexOf('data: {"id": "cmpl-') < token.lastIndexOf("davinci-codex:2021-08-03")
    }

    private static async* asyncIterableFromStream<T>(reader: ReadableStreamReader<T>): AsyncIterable<T> {
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) return;
                yield value;
            }
        } finally {
            reader.releaseLock();
        }
    }

    private static byteToString(bytes: Uint8Array): string {
        let str = '';
        for (let i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }
}