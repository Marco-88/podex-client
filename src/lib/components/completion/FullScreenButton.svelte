<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { settingsStore } from './settings/settingsStore';
	import Hoverable from '../basic/Hoverable.svelte';

	export let size = 24;
	export let round = true;
	// export let left = true;
</script>

{#if !$settingsStore.fullScreen}
	<Hoverable right={false} left={true}>
		<div class='full-screen'>
			<Icon key="fullScreen" action={() => settingsStore.setFullScreen(true)} {round} fill={true} {size} tooltip='Full Screen'/>
		</div>
	</Hoverable>
{/if}

<style lang='scss'>
	@import "static/css/variables";

	.full-screen {
		position: relative;

		//&.left {
		//	position: absolute;
		//	left: 1rem;
		//	bottom: 1rem;
		//}
	}
</style>