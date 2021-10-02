<script lang="ts">
	import { settingsStore } from './settingsStore';
	import Slider from '../../basic/Slider.svelte';

	const maxTokens = {
		text:'Max Tokens',
		min: 64,
		max: 4096,
		value: $settingsStore.maxTokens,
		saveValue: settingsStore.setMaxTokens
	}

	const temperature = {
		text:'Temperature',
		min: 0,
		max: 1,
		step: 0.01,
		value: $settingsStore.temperature,
		saveValue: settingsStore.setTemperature
	}
</script>

<div class='settings'>
	<Slider {...maxTokens}/>
	<Slider {...temperature}/>
</div>

<style>
	.settings {
		display: flex;
		justify-content: space-around;
	}
</style>