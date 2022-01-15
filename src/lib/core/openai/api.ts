import { OPENAI_API_KEY } from '$lib/env';
import { OpenAI } from '$lib/core/openai/OpenAI';
import { writable } from 'svelte/store';
import type { Engine } from '$lib/types';

const openAi = new OpenAI(OPENAI_API_KEY);

export const requestCompletion = (prompt: string): Promise<void> => openAi.complete(prompt);
export const stopCompletion = (): Promise<void> => openAi.stop();
export const isCompletionFinished = writable(true);
export const getEngines = (): Promise<Engine[]> => openAi.getEngines();