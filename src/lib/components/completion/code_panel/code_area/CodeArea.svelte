<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import 'svelte-highlight/src/styles/atom-one-dark.css';
	import { settingsStore } from '../../settings/settingsStore';
	import { languages } from '../languages';
	import { codeStore } from '../codeStore';
	import { onMount } from 'svelte';
	import CodeFooter from './CodeFooter.svelte';
	import { indexPaddingStore } from './indexStore';
	import { tokenCountStore } from './tokenCountStore';
	import type { Win } from '../../../../types';

	let prompt = '';
	let promptArea: HTMLTextAreaElement;
	let hljsCode: HTMLElement;
	let tokenCount: number | boolean = false;
	const win = window as Win;
	$: code = $indexPaddingStore && $codeStore && prompt;

	const updateTokenCount = async (): Promise<void> => {
		tokenCount = true;
		tokenCount = win.tokenizer.encode(prompt).length
		tokenCountStore.setTokenCount(tokenCount);
		tokenCountStore.setPrompt(prompt);
	}

	const buildCode = (): void => {
		if ($codeStore.length > 0) {
			const item = $codeStore[$codeStore.length - $indexPaddingStore];
			prompt = `${item.request} ${item.response}`;
		}

		code = prompt
		updateTokenCount();
	};

	const syncScroll = (): void => {
		hljsCode.scrollTop = promptArea.scrollTop;
	};

	$: temp = $indexPaddingStore && $codeStore && buildCode();
	$: language = $settingsStore.sandbox ? languages['typescript'] : languages[$settingsStore.language];

	onMount(() => {
		hljsCode = document.querySelector('.code-area code');
		buildCode();
	});
</script>

<pre class="code-area" spellcheck="false">
	<Highlight {language} {code}/>
	<textarea id="prompt-area" bind:value={prompt} bind:this={promptArea} spellcheck="false"
	          on:scroll={() => syncScroll()} on:input={() => updateTokenCount()}></textarea>
</pre>
<CodeFooter prompt={code} />

<style lang='scss'>
	@import "static/css/variables";

	.code-area {
		background: $primary-dark;
		display: flex;
		position: relative;
		border-radius: $radius;
		height: 100%;
		width: 100%;

		#prompt-area {
			position: absolute;
			top: 0;
			left: 0;
			background: transparent;
			color: transparent;
			padding: 1rem 1.1rem 1rem 1rem;
			font-size: 1.1rem;
			border-radius: $radius;
			width: 100%;
			height: 100%;
			caret-color: $secondary-light;
		}
	}
</style>