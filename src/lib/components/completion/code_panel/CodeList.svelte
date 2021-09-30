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
		position: absolute;
		top: 48px;
		right: 0;
		left: 0;
		bottom: .05rem;
		overflow-y: auto;
	}
</style>
