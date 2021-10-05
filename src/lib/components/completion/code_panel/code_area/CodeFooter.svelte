<script lang="ts">
	import Icon from '../../../icon/Icon.svelte';
	import TokenCounter from './TokenCounter.svelte';
	import CompletionIconButton from '../../CompletionIconButton.svelte';
	import { indexPaddingStore } from './indexStore';

	export let prompt = '';
	export let tokenCount: number | boolean = false;

	const undo = () => indexPaddingStore.increment();
	const redo = () => indexPaddingStore.decrement();
</script>

<div class='code-footer'>
	<div class='controls'>
		<CompletionIconButton {prompt} size={20}/>
		<Icon key="undo" action={() => undo()} fill={true} size={20} tooltip='Undo'/>
		<Icon key="redo" action={() => redo()} fill={true} size={20} tooltip='Redo'/>
	</div>
	<TokenCounter {tokenCount}/>
</div>

<style lang='scss'>
	.code-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .5rem 0;
		width: 100%;

		.controls {
			display: flex;
			justify-content: space-around;
		}
	}
</style>