import { writable } from 'svelte/store';
import type { Writable, ItemStore, StoreItem } from '$lib/types';

function createCodeStore(): ItemStore<StoreItem> {
    const { subscribe, set, update }: Writable<StoreItem[]> = writable([]);

    return {
        subscribe,
        add: (item: StoreItem) => update(prev => [...prev, item]),
        appendToken: (id: string, token: string) => update(prev => {
            prev.find(item => item.id === id).response += token;
            return prev;
        }),
        removeById: (id: string) => update(prev => prev.filter(item => item.id !== id)),
        removeByValue: (item: StoreItem) => update(prev => prev.filter(storeItem => storeItem !== item)),
        setItem: (id: string, newItem: StoreItem) => update(prev => {
            const index = prev.findIndex(item => item.id === id);
            if(index) prev[index] = newItem;
            return prev;
        }),
        setResponse: (id: string, response: string) => update(prev => {
            const item = prev.find(item => item.id === id);
            if(item) item.response = response;
            return prev;
        }),
        clear: () => set([])
    };
}

export const codeListStore = createCodeStore();
export const codeAreaStore = createCodeStore();