import { Readable, Subscriber, Unsubscriber, Updater } from 'svelte/types/runtime/store';

export interface ChangeEvent extends Event {
	target: HTMLInputElement;
}

// *** Svelte Store Stuff *** \\

type Invalidator<T> = (value?: T) => void;

export interface Writable<T> extends Readable<T> {
	set(this: void, value: T): void;
	update(this: void, updater: Updater<T>): void;
}

export interface StoreItem {
	id: string;
	request: string;
	response: string;
}

export interface ItemStore<T extends StoreItem> {
	subscribe: (this: void, run: Subscriber<T[]>, invalidate?: Invalidator<T[]>) => Unsubscriber;
	add: (item: T) => void;
	appendToken: (id: string, token: string) => void;
	removeById: (index: string) => void;
	removeByValue: (item: T) => void;
	setItem: (id: string, newItem: StoreItem) => void;
	setResponse: (id: string, response: string) => void;
	clear: () => void;
}

export interface IndexStore {
	subscribe: (this: void, run: Subscriber<number>, invalidate?: Invalidator<number>) => Unsubscriber;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
}

export interface PromptTokenCount {
	prompt: string;
	tokenCount: number | boolean;
}

export interface TokenCountStore<T extends PromptTokenCount> {
	subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;
	setPrompt: (prompt: string) => void;
	setTokenCount: (tokenCount: number | boolean) => void;
	reset: () => void;
}

export interface Settings {
	sandbox: boolean;
	engine: string;
	fullScreen: boolean;
	maxTokens: number;
	temperature: number;
	language: string;
}

export interface SettingsStore<T extends Settings> {
	subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;
	setEngine: (engine: string) => void;
	setFullScreen: (fullScreen: boolean) => void;
	setSandbox: (sandbox: boolean) => void;
	setMaxTokens: (maxTokens: number) => void;
	setTemperature: (temperature: number) => void;
	setLanguage: (language: string) => void;
	reset: () => void;
}

// *** OpenAI API *** \\

export interface CompletionOpts {
	prompt?: string;
	max_tokens?: number;
	temperature?: number;
	stream?: boolean;
	stop?: string | string[];
}

export interface Completion {
	id: string
	object: string
	created: number
	model: string
	choices: Choice[]
}

export interface Engine {
	id: string
	object: string
	owner: string
	ready: boolean
}

export interface Choice {
	text: string
	index: number
	logprobs: unknown
	finish_reason: string
}

// *** Window Tokenizer *** \\

export interface Win extends Window {
	tokenizer: {
		encode: (prompt: string) => Uint8Array
	}
}