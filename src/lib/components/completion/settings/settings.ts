import { defaultValue, settingsStore } from '$lib/components/completion/settings/settingsStore';
import { languages } from '$lib/components/completion/code_panel/languages';
import { indexPaddingStore } from '$lib/components/completion/code_panel/code_area/indexStore';


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
    saveValue: (value: boolean): void => {
        indexPaddingStore.reset();
        if(value) {
            settingsStore.setEngine(defaultValue.engine);
        }
        settingsStore.setSandbox(value);
    }
};

export const language = {
    text: 'Highlight Language',
    items: Object.keys(languages),
    saveValue: settingsStore.setLanguage
}

export const engine = {
    text: 'Engine',
    saveValue: settingsStore.setEngine
}
