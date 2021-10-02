import { writable } from 'svelte/store';
import type { Writable, Settings, SettingsStore } from '$lib/types';

function createSettingsStore(): SettingsStore<Settings> {
    const { subscribe, set, update }: Writable<Settings> = writable({
        maxTokens: 1000,
        temperature: 0
    });

    return {
        subscribe,
        setMaxTokens: (maxTokens: number) => update(prev => ({...prev, maxTokens})),
        setTemperature: (temperature: number): void => update(prev => ({...prev, temperature})),
        reset: (): void => set({maxTokens: 1000, temperature: 0}),
    };
}

export const settingsStore = createSettingsStore();