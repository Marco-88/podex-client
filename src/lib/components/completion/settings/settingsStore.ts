import { writable } from 'svelte/store';
import type { Writable, Settings, SettingsStore } from '$lib/types';

export const defaultValue = {
    sandbox: true,
    engine: 'davinci-codex',
    fullScreen: false,
    maxTokens: 1000,
    temperature: 0,
    language: 'typescript'
}

function createSettingsStore(): SettingsStore<Settings> {
    const { subscribe, set, update }: Writable<Settings> = writable(defaultValue);

    return {
        subscribe,
        setEngine: (engine: string) => update(prev => ({...prev, engine})),
        setFullScreen: (fullScreen: boolean) => update(prev => ({...prev, fullScreen})),
        setSandbox: (sandbox: boolean) => update(prev => ({...prev, sandbox})),
        setMaxTokens: (maxTokens: number) => update(prev => ({...prev, maxTokens})),
        setTemperature: (temperature: number): void => update(prev => ({...prev, temperature})),
        setLanguage: (language: string): void => update(prev => ({...prev, language})),
        reset: (): void => set(defaultValue),
    };
}

export const settingsStore = createSettingsStore();