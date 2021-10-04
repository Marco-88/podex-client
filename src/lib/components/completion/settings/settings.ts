import { settingsStore } from '$lib/components/completion/settings/settingsStore';
import { languages } from '$lib/components/completion/code_panel/languages';


export const maxTokens = {
    text: 'Max Tokens',
    min: 64,
    max: 4096,
    saveValue: settingsStore.setMaxTokens
};

export const temperature = {
    text: 'Temperature',
    min: 0,
    max: 1,
    step: 0.01,
    saveValue: settingsStore.setTemperature
};

export const sandbox = {
    text: 'Sandbox',
    saveValue: settingsStore.setSandbox
};

export const language = {
    text: 'Language',
    items: Object.keys(languages),
    saveValue: settingsStore.setLanguage
}
