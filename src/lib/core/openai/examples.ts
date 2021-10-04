import { get } from 'svelte/store';
import { codeStore } from '$lib/components/completion/code_panel/codeStore';
import type { StoreItem } from '$lib/types';

export const preparePrompt = (prompt: string): string => {
	const items = get(codeStore);

	if(items.length === 0)
		return addExamplePattern(prompt);

	return addPreviousCode(items) + addStopSequence(prompt);
}

const addPreviousCode = (items: StoreItem[]): string => {
	let prompts = addExamplePattern(items[0].request) + items[0].response + '\n';

	for(let i = 1; i < items.length; i++) {
		prompts += addStopSequence(items[i].request) + items[i].response + '\n';
	}

	return prompts;
}



const addExamplePattern = (prompt: string): string => {
	return `${buildExamples()} \n ${addStopSequence(prompt)}`;
};

const addStopSequence = (prompt: string): string => {
	return `/* Command: ${prompt} */`;
}

const exampleHeader = '<|endoftext|>/* I start with a blank HTML page, ' +
	'and incrementally modify it via <script> injection. Written for Chrome. */\n'

const exampleCommandHelloWorld = 'Add Hello World, by adding an HTML DOM node';
const exampleCodeHelloWorld = `
var helloWorld = document.createElement('div');
helloWorld.innerHTML = 'Hello World';
document.body.appendChild(helloWorld);`

const exampleCommandClearPage = 'Clear the page.';
const exampleCodeClearPage = `
while (document.body.firstChild) {
  document.body.removeChild(document.body.firstChild);
}`

const addExample = (command: string, code: string): string => addStopSequence(command) + code;

const buildExamples = (): string => exampleHeader +
	addExample(exampleCommandHelloWorld, exampleCodeHelloWorld) +
	addExample(exampleCommandClearPage, exampleCodeClearPage);
