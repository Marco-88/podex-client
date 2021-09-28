import { codeStore } from '$lib/components/completion/code_panel/codeStore'
import type { CompletionOpts } from '$lib/types';
import { CodeStreamer } from '../stream/CodeStreamer';

const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`

export class OpenAI {
	private streamer: CodeStreamer;
	private readonly apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async stop (): Promise<void> {
		await this.streamer.stopStream();
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

	private async sendRequest (prompt: string): Promise<Response> {
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
			max_tokens: 3584,
			temperature: 0.0,
			stream: true,
			stop: "/* Command:",
		}
	}
}