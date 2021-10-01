import { writable } from 'svelte/store';
import type { Writable, ItemStore, StoreItem } from '$lib/types';

function createCodeStore(): ItemStore<StoreItem> {
    const { subscribe, set, update }: Writable<StoreItem[]> = writable([]);

    return {
        subscribe,
        add: (item: StoreItem) => update(prev => [...prev, item]),
        removeById: (id: string) => update(prev => prev.filter(item => item.id !== id)),
        removeByValue: (item: StoreItem) => update(prev => prev.filter(storeItem => storeItem !== item)),
        appendToken: (id: string, token: string) => update(prev => {
            prev.find(item => item.id === id).response += token;
            return prev;
        }),
        setResponse: (id: string, response: string) => update(prev => {
            prev.find(item => item.id === id).response = response;
            return prev;
        }),
        clear: () => set([])
    };
}

export const codeStore = createCodeStore();