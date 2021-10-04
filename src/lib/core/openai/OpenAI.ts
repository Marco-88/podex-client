import { get } from 'svelte/store';
import { codeStore } from '$lib/components/completion/code_panel/codeStore'
import type { CompletionOpts, StoreItem } from '$lib/types';
import { CodeStreamer } from '../stream/CodeStreamer';
import { preparePrompt } from './examples';
import { settingsStore } from '$lib/components/completion/settings/settingsStore';

const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`

export class OpenAI {
	private streamer: CodeStreamer;
	private readonly apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
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

	private async sendRequest (prompt: string): Promise<Response> {
		if(get(settingsStore).sandbox)
			prompt = preparePrompt(prompt);
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
		const {maxTokens, temperature} = get(settingsStore);
		return {
			prompt,
			max_tokens: Number(maxTokens),
			temperature: Number(temperature),
			stream: true,
			stop: "/* Command:",
		}
	}
}