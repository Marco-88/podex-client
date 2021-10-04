import { writable } from 'svelte/store';
import type { Writable, HistoryItem, StoreItem } from '$lib/types';
import type { HistoryStore, History } from '$lib/types';

const defaultValue = {
    index: 0,
    current: [],
    states: []
}

function createHistoryStore(): HistoryStore<History> {
    const { subscribe, set, update }: Writable<History> = writable(defaultValue);

    const updateHistory = (index: number, prev: History) => ({
        index,
        current: prev.states[index].state,
        states: prev.states
    });

    return {
        subscribe,
        add: (item: StoreItem[]) => update(prev => ({
            index: prev.index + 1,
            current: item,
            states: [...prev.states, {index: prev.index + 1, state: item }]
        })),
        undo: () => update(prev => {
            const index = prev.index - 1;
            if (index > 0) {
                return updateHistory(index, prev);
            }
            return prev;
        }),
        redo: () => update(prev => {
            const index = prev.index + 1;
            if (index < prev.states.length) {
                return updateHistory(index, prev);
            }
            return prev;
        }),
        clear: () => set(defaultValue)
    };
}

export const historyStore = createHistoryStore();