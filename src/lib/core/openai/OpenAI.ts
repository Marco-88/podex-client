import { get } from 'svelte/store';
import { codeStore } from '$lib/components/completion/code_panel/codeStore'
import type { CompletionOpts, StoreItem } from '$lib/types';
import { CodeStreamer } from '../stream/CodeStreamer';
import { addExamplePattern, addStopSequence } from '$lib/core/openai/exampleCommand';

const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`

export class OpenAI {
	private streamer: CodeStreamer;
	private readonly apiKey: string;
	private readonly withExamples: boolean;

	constructor(apiKey: string, withExamples = true) {
		this.apiKey = apiKey;
		this.withExamples = withExamples;
	}

	public async complete (prompt: string): Promise<void> {
		try {
			const response = await this.sendRequest(prompt);
			const reader = response.body.getReader();
			this.streamer = new CodeStreamer(codeStore, reader);
			await this.streamer.processStream(prompt);
		} catch (err) {
			console.log(err);
		}
	}

	public stop = async (): Promise<void> => await this.streamer.stopStream();

	private static preparePrompt(prompt: string): string {
		const items = get(codeStore);

		if(items.length === 0)
			return addExamplePattern(prompt);

		return OpenAI.addPreviousCode(items) + addStopSequence(prompt);
	}

	private static addPreviousCode(items: StoreItem[]): string {
		let prompts = addExamplePattern(items[0].request) + items[0].response + '\n';

		for(let i = 1; i < items.length; i++) {
			prompts += addStopSequence(items[i].request) + items[i].response + '\n';
		}

		return prompts;
	}

	private async sendRequest (prompt: string): Promise<Response> {
		prompt = this.withExamples && OpenAI.preparePrompt(prompt);
		const url = `${OPEN_AI_URL}/engines/davinci-codex/completions`;
		return await fetch(url, this.createRequestInfo(prompt));
	}

	private createRequestInfo (prompt: string): RequestInit {
		return {
			method: 'POST',
			headers: this.createRequestHeader(),
			body: JSON.stringify(OpenAI.createRequestData(prompt))
		};
	}

	private createRequestHeader (): HeadersInit {
		return {
			'authorization': `Bearer ${this.apiKey}`,
			'content-type': 'application/json',
		}
	}

	private static createRequestData (prompt: string): CompletionOpts {
		return {
			prompt,
			max_tokens: 1000,
			temperature: 0.0,
			stream: true,
			stop: "/* Command:",
		}
	}
}