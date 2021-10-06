import type { TokenCountStore, PromptTokenCount, Writable } from '$lib/types';
import { writable } from 'svelte/store';

const defaultValue = {
    prompt: '',
    tokenCount: 0
}

function createTokenCountStore(): TokenCountStore<PromptTokenCount> {
    const { subscribe, set, update }: Writable<PromptTokenCount> = writable(defaultValue);

    return {
        subscribe,
        setPrompt: (prompt: string) => update(prev => ({...prev, prompt})),
        setTokenCount: (tokenCount: number) => update(prev => ({...prev, tokenCount})),
        reset: () => set(defaultValue)
    };
}

export const tokenCountStore = createTokenCountStore();