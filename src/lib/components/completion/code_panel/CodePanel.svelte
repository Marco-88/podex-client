<script lang="ts">
	import CodeList from './code_list/CodeList.svelte';
	import { settingsStore } from '../settings/settingsStore';
	import CodeArea from './code_area/CodeArea.svelte';

	$: off = !$settingsStore.sandbox;
</script>

<div class="right-section" class:off>
	{#if !$settingsStore.sandbox}
		<CodeArea />
	{:else}
		<CodeList />
	{/if}
</div>

<style lang='scss'>
	@import "static/css/variables";

	.right-section {
		border-left: $border solid $secondary-dark;
		display: flex;
		flex-direction: column;
		flex-grow: 2;
		height: 100%;
		position: relative;

		&.off {
			border-left: 0;
		}
	}
</style>