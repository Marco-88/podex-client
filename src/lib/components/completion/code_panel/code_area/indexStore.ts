import type { IndexStore, Writable } from '$lib/types';
import { writable, get } from 'svelte/store';
import { codeStore } from '../codeStore';


function createIndexStore(): IndexStore {
    const { subscribe, set, update }: Writable<number> = writable(1);

    return {
        subscribe,
        increment: () => update(prev => get(codeStore).length > prev ? ++prev : prev),
        decrement: () => update(prev => prev > 1 ? --prev : prev),
        reset: () => set(1)
    };
}

export const indexPaddingStore = createIndexStore();