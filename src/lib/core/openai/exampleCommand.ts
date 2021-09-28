export const addExamplePattern = (prompt: string): string => {
	return `${buildExamples()} \n ${addStopSequence(prompt)}`;
};

export const addStopSequence = (prompt: string): string => {
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
