<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import 'svelte-highlight/src/styles/atom-one-dark.css';
	import { settingsStore } from '../../settings/settingsStore';
	import { languages } from '../languages';
	import { codeStore } from '../codeStore';
	import { onMount } from 'svelte';
	import CodeFooter from './CodeFooter.svelte';
	import { requestTokenCount } from '../../../../core/openai/api';
	import { indexPaddingStore } from './indexStore';

	let prompt = '';
	let promptArea: HTMLTextAreaElement;
	let hljsCode: HTMLElement;
	let tokenCount: number | boolean = false;

	$: code = $indexPaddingStore && $codeStore && prompt;

	const encodePrompt = async (): Promise<void> => {
		tokenCount = true;
		tokenCount = await requestTokenCount(code);
	};

	const buildCode = (): void => {
		if ($codeStore.length > 0) {
			const item = $codeStore[$codeStore.length - $indexPaddingStore];
			code = prompt = `${item.request} ${item.response}`;
		}
		encodePrompt();
	};

	const syncScroll = (): void => {
		hljsCode.scrollTop = promptArea.scrollTop;
		hljsCode.scrollLeft = promptArea.scrollLeft;
	};

	$: temp = $indexPaddingStore && $codeStore && buildCode();
	$: language = $settingsStore.sandbox ? languages['typescript'] : languages[$settingsStore.language];

	onMount(() => {
		buildCode();
		hljsCode = document.querySelector('.code-area code');
		code = prompt;
		encodePrompt();
	});
</script>

<pre class="code-area" spellcheck="false">
	<Highlight {language} {code}/>
	<textarea id="prompt-area" bind:value={prompt} bind:this={promptArea} spellcheck="false"
	          on:scroll={() => syncScroll()} on:input={encodePrompt}></textarea>
</pre>
<CodeFooter prompt={code} {tokenCount}/>

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
			padding: 1rem;
			font-size: 1.1rem;
			border-radius: $radius;
			width: 100%;
			height: 100%;
			caret-color: $secondary-light;
		}
	}
</style>