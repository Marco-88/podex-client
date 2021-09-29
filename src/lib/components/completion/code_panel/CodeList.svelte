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
		padding: 0 .5rem;
		position: absolute;
		top: 48px;
		right: 0;
		left: 0;
		bottom: 1rem;
	}
</style>
