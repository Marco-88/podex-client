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
	removeById: (index: string) => void;
	removeByValue: (item: T) => void;
	appendToken: (id: string, token: string) => void;
	setResponse: (id: string, response: string) => void;
	clear: () => void;
}

export interface HistoryStore<T extends History> {
	subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;
	add: (item: StoreItem[]) => void;
	undo: () => void;
	redo: () => void;
	clear: () => void;
}

export interface History {
	index: number;
	current: StoreItem[];
	states: HistoryItem[]
}

export interface HistoryItem {
	index: number;
	state: StoreItem[]
}

export interface Settings {
	sandbox: boolean;
	maxTokens: number;
	temperature: number;
	language: string;
}

export interface SettingsStore<T extends Settings> {
	subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;
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

export interface Choice {
	text: string
	index: number
	logprobs: unknown
	finish_reason: string
}