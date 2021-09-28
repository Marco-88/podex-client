<script lang="ts">
	import CodeItem from './CodeItem.svelte';
	import { codeStore } from './codeStore';
</script>

<div class="code-list">
	{#each $codeStore as item}
		<CodeItem {item} />
	{/each}
</div>

<style>
	.code-list {
		display: flex;
		flex-direction: column;
		overflow: auto;
		height: 100%;
	}
</style>
