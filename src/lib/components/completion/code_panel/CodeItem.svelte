<script lang="ts">
	import CodeItemHeader from './CodeItemHeader.svelte';
	import type { StoreItem } from '$lib/types';
	import CodeHighlight from './CodeHighlight.svelte';

	export let item: StoreItem = undefined;

	const buildCode = (): string => `/* ${item.request} */${item.response}`;

	$: code = item && buildCode();
</script>

<div class="code-list-item">
	<CodeItemHeader {item}/>
	<CodeHighlight {code} />
</div>

<style lang='scss'>
	.code-list-item {
		width: 100%;
		position: relative;
	}
</style>