import type { ItemStore, StoreItem, Completion } from '$lib//types';
import * as uuid from 'uuid';

export class CodeStreamer {
    private store: ItemStore<StoreItem>;
    private readonly reader: ReadableStreamReader<Uint8Array>;

    constructor(itemStore: ItemStore<StoreItem>, reader: ReadableStreamReader<Uint8Array>) {
        this.store = itemStore;
        this.reader = reader;
    }

    public async processStream(request: string): Promise<void> {
        const id = uuid.v4();
        const item = { id, request, response: '\n' }
        this.store.add(item);

        for await (const chunk of CodeStreamer.asyncIterableFromStream(this.reader)) {
            const token = CodeStreamer.processCompletionToken(chunk);
            this.store.updateItem(id, token);
        }
    }

    public async stopStream(): Promise<void> {
        try {
            await this.reader.cancel();
        } catch (e) {
            console.warn("Canceling not possible! It is no stream available.")
        }
    }

    private static processCompletionToken(chunk: Uint8Array): string {
        const token = CodeStreamer.byteToString(chunk);

        if (token.startsWith('data:')) {
            const item = CodeStreamer.parseCompletion(token);

            if (item && item.choices.length > 0)
                return item.choices[0].text
        }
        return '';
    }

    private static parseCompletion(token: string): Completion {
        token = token.substr(6).replace('data: [DONE]', '').trim();
        return JSON.parse(token);
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