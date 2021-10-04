<script lang="ts">
	import { requestCompletion, stopCompletion } from '$lib/core/openai/api';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let size = 24;
	export let right = false;
	export let prompt = '';
	let isPending = false;

	const sendPrompt = async () => {
		if (prompt && prompt.trim().length > 0) {
			setPending(true);
			await requestCompletion(prompt.trim());
			setPending(false);
		}
	};

	const stopStream = async () => {
		await stopCompletion();
		setPending(false);
	};

	const setPending = (pending: boolean) => {
		isPending = pending;
	};
</script>

<div class='send-request' class:right>
	{#if !isPending}
		<Icon key="submit" action={() => sendPrompt()} round={true} fill={true} {size} tooltip='Send'/>
	{:else}
		<Icon key="spinner" action={() => stopStream()} round={true} fill={true} {size} tooltip='Cancel'/>
	{/if}
</div>

<style lang='scss'>
	@import "static/css/variables";

	.send-request {
		position: relative;

		&.right {
			position: absolute;
			right: 1rem;
			bottom: 1rem;
		}
	}
</style>