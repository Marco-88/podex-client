<script lang="ts">
	import Slider from '../../basic/Slider.svelte';
	import Checkbox from '../../basic/Checkbox.svelte';
	import { maxTokens, temperature, sandbox, language, engine } from './settings';
	import { defaultValue, settingsStore } from './settingsStore';
	import Select from '../../basic/Select.svelte';
	import { getEngines } from '../../../core/openai/api';

	const requestEngines = async (): Promise<string[]> => {
		const engines = await getEngines();
		return engines.filter(engine => engine.ready).map(engine => engine.id);
	};

	$: tokenMax = $settingsStore.engine === defaultValue.engine ? 4096 : 2048;

	$: off = !$settingsStore.sandbox;
</script>

<div class='settings' class:off>
	{#if off}
		{#await requestEngines() }
			<Select {...engine} items={[]} value={$settingsStore.engine} loading={true}/>
		{:then engines}
			<Select {...engine} items={engines} value={$settingsStore.engine} capitalized={false}/>
		{/await}
	{/if}

	<Slider {...maxTokens} max={tokenMax} startValue={$settingsStore.maxTokens} column={off}/>
	<Slider {...temperature} startValue={$settingsStore.temperature} column={off}/>

	{#if off}
		<Select {...language} value={$settingsStore.language}/>
	{/if}

	<Checkbox {...sandbox} checked={!off} column={off}/>
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