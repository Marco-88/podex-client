<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import 'svelte-highlight/src/styles/atom-one-dark.css';
	import { settingsStore } from '../../settings/settingsStore';
	import { languages } from '../languages';
	import { codeStore } from '../codeStore';
	import { onMount } from 'svelte';
	import CodeFooter from './CodeFooter.svelte';
	import { requestTokenCount } from '../../../../core/openai/api';

	let prompt = '';
	let promptArea: HTMLTextAreaElement;
	let hljsCode: HTMLElement;
	let tokenCount: number | boolean = false;

	const buildCode = (): string => $codeStore.map(item => `${item.request} ${item.response}`).join();
	const syncScroll = (): void => {
		hljsCode.scrollTop = promptArea.scrollTop;
	};

	const encodePrompt = async (): void => {
		tokenCount = true;
		tokenCount = await requestTokenCount(code);
	}

	onMount(() => prompt = buildCode());

	$: code = prompt;
	$: language = $settingsStore.sandbox ? languages['typescript'] : languages[$settingsStore.language];
</script>

<pre class="code-area" spellcheck="false">
	<Highlight {language} {code} bind:this={hljsCode}/>
	<textarea id="prompt-area" bind:value={prompt} bind:this={promptArea} spellcheck="false" on:scroll={() => syncScroll()} on:input={encodePrompt}></textarea>
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