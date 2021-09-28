import { OPENAI_API_KEY } from '$lib/env';
import { OpenAI } from '$lib/core/openai/OpenAI';

const openAi = new OpenAI(OPENAI_API_KEY);

export const requestCompletion = (prompt: string): Promise<void> => openAi.complete(prompt);
export const stopCompletion = (): Promise<void> => openAi.stop();