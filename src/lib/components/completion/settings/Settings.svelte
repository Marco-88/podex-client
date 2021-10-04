<script lang="ts">
	import Slider from '../../basic/Slider.svelte';
	import Checkbox from '../../basic/Checkbox.svelte';
	import { maxTokens, temperature, sandbox, language } from './settings';
	import { settingsStore } from './settingsStore';
	import Select from '../../basic/Select.svelte';

	$: off = !$settingsStore.sandbox;
</script>

<div class='settings' class:off>
	<Slider {...maxTokens} value={$settingsStore.maxTokens}/>
	<Slider {...temperature} value={$settingsStore.temperature}/>
	<Checkbox {...sandbox} checked={!off}/>

	{#if off}
		<Select {...language} value={$settingsStore.language}/>
	{/if}
</div>

<style lang='scss'>
	.settings {
		display: flex;
		justify-content: space-around;

		&.off {
			flex-direction: column;
			justify-content: start;
			padding: 0 1rem;
		}
	}
</style>