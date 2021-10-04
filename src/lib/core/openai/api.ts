import { OPENAI_API_KEY } from '$lib/env';
import { OpenAI } from '$lib/core/openai/OpenAI';
import { writable } from 'svelte/store';

const openAi = new OpenAI(OPENAI_API_KEY);

export const requestCompletion = (prompt: string): Promise<void> => openAi.complete(prompt);
export const stopCompletion = (): Promise<void> => openAi.stop();
export const isCompletionFinished = writable(true);
export const requestTokenCount = async (prompt: string): Promise<number> => {
	const requestTokenCount = await fetch('http://localhost:3001', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({prompt})
	})

	const {numberOfTokens} = await requestTokenCount.json();
	return numberOfTokens;
}