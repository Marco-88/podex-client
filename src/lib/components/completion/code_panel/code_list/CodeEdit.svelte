<script lang="ts">
	import Hoverable from '../../../basic/Hoverable.svelte';
	import Icon from '../../../icon/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	import {Highlight} from "svelte-highlight";
	import "svelte-highlight/src/styles/atom-one-dark.css";
	import { settingsStore } from '../../settings/settingsStore';
	import { languages } from '../languages';

	export let code = '';

	let codeEditPre: HTMLPreElement;
	const dispatch = createEventDispatcher();
	const checkCodeIn = (): void => dispatch('save', {code: codeEditPre.textContent});
	const abortEditing = (): void => dispatch('abort');

	$: language = $settingsStore.sandbox ? languages['typescript'] : languages[$settingsStore.language];
</script>

<div class='code-item-edit'>
	<Hoverable>
		<Icon key="check" action={() => checkCodeIn()} size={18} tooltip='Save'/>
		<Icon key="close" action={() => abortEditing()} size={16} tooltip='Abort'/>
	</Hoverable>
	<pre class='code-edit' contenteditable='true' spellcheck="false" bind:this={codeEditPre}>
		<Highlight {language} {code} />
	</pre>
</div>

<style lang='scss'>
	.code-item-edit {
		width: 100%;
		position: relative;
		padding: 1rem;
	}
</style>