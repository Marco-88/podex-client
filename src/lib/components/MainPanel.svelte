<script lang="ts">
	import CodePanel from './completion/code_panel/CodePanel.svelte';
	import CodexView from './CodexView.svelte';
	import { settingsStore } from './completion/settings/settingsStore';
	import PlaygroundView from './PlaygroundView.svelte';
</script>

<div class="main-panel">
	{#if $settingsStore.sandbox}
		<CodexView/>
	{:else}
		<PlaygroundView />
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
	}
</style>