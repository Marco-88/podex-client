<script lang="ts">
	import CodexView from './CodexView.svelte';
	import { settingsStore } from './completion/settings/settingsStore';
	import PlaygroundView from './PlaygroundView.svelte';
	import Icon from './icon/Icon.svelte';
	import { afterUpdate } from 'svelte';

	let loading = true;

	afterUpdate(() => {
		loading = false;
	});
</script>

<div class="main-panel">
	{#if loading}
		<div class='spinner'>
			<Icon key="spinner" fill={true} size={64} tooltip='Loading App'/>
		</div>
	{:else}
		{#if $settingsStore.sandbox}
			<CodexView/>
		{:else}
			<PlaygroundView />
		{/if}
	{/if}

</div>

<style lang='scss'>
	@import "static/css/variables";

	.main-panel {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 0;

		.spinner {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}
	}
</style>