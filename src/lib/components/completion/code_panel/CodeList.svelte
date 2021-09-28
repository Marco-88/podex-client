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
		height: 100%;
		padding: 0 .5rem;
		overflow-y: auto;
		position: absolute;
		top: 48px;
		right: 0;
		left: 0;
	}
</style>
