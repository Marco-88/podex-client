import { writable } from 'svelte/store';
import type { Writable, Settings, SettingsStore } from '$lib/types';

const defaultValue = {
    sandbox: true,
    maxTokens: 1000,
    temperature: 0,
    language: 'plaintext'
}

function createSettingsStore(): SettingsStore<Settings> {
    const { subscribe, set, update }: Writable<Settings> = writable(defaultValue);

    return {
        subscribe,
        setSandbox: (sandbox: boolean) => update(prev => ({...prev, sandbox})),
        setMaxTokens: (maxTokens: number) => update(prev => ({...prev, maxTokens})),
        setTemperature: (temperature: number): void => update(prev => ({...prev, temperature})),
        setLanguage: (language: string): void => update(prev => ({...prev, language})),
        reset: (): void => set(defaultValue),
    };
}

export const settingsStore = createSettingsStore();