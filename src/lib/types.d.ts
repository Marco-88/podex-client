import { Readable, Subscriber, Unsubscriber, Updater } from 'svelte/types/runtime/store';

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