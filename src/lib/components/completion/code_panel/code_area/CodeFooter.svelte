<script lang="ts">
	import Icon from '../../../icon/Icon.svelte';
	import { historyStore } from '../historyStore';
	import TokenCounter from './TokenCounter.svelte';
	import SendButton from '../../SendButton.svelte';

	export let prompt = '';
	export let tokenCount: number | boolean = false;

	const undo = () => historyStore.undo();
	const redo = () => historyStore.redo();
</script>

<div class='code-footer'>
	<div class='controls'>
		<SendButton {prompt} />
		<Icon key="undo" action={() => undo()} fill={true} size={16} tooltip='Undo'/>
		<Icon key="redo" action={() => redo()} fill={true} size={16} tooltip='Redo'/>
	</div>
	<TokenCounter {tokenCount}/>
</div>

<style lang='scss'>
	.code-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		width: 100%;

		.controls {
			display: flex;
			justify-content: space-around;
		}
	}
</style>