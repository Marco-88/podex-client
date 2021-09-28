<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowRight from './svg/arrow-right.svg?component';
	import Toilet from './svg/toilet.svg?component';
	import Trash from './svg/trash-alt.svg?component';

	export let width = 32;
	export let height = 32;
	export let key: string;
	let SvgIcon;

	onMount(() => {
		if (key === 'arrowRight') SvgIcon = ArrowRight;
		if (key === 'trash') SvgIcon = Trash;
		if (key === 'toilet') SvgIcon = Toilet;
	});
</script>

<svelte:component this={SvgIcon} {width} {height}/>

<style global>
	.fill svg {
		position: absolute;
		left: 0;
		padding: .45em;
		top: -.1em;
	}
</style>