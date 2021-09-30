<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowRight from './svg/arrow-right.svg?component';
	import Check from './svg/check.svg?component';
	import Close from './svg/times.svg?component';
	import Edit from './svg/pen.svg?component';
	import Trash from './svg/trash-alt.svg?component';
	import Toilet from './svg/toilet.svg?component';

	export let width = 32;
	export let height = 32;
	export let key: string;
	let SvgIcon;

	onMount(() => {
		if (key === 'arrowRight') SvgIcon = ArrowRight;
		else if (key === 'check') SvgIcon = Check;
		else if (key === 'close') SvgIcon = Close;
		else if (key === 'edit') SvgIcon = Edit;
		else if (key === 'trash') SvgIcon = Trash;
		else SvgIcon = Toilet;
	});
</script>

<svelte:component this={SvgIcon} {width} {height}/>
