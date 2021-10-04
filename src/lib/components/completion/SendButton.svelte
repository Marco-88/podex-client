<script lang="ts">
	import { requestCompletion, stopCompletion } from '$lib/core/openai/api';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let absolute = false;
	export let prompt = '';
	let isPending = false;

	const sendPrompt = async () => {
		console.log('code: ', prompt);
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

<div class='send-request' class:absolute>
	{#if !isPending}
		<Icon key="submit" action={() => sendPrompt()} round={true} fill={true} size={24} tooltip='Send'/>
	{:else}
		<Icon key="spinner" action={() => stopStream()} round={true} fill={true} size={24} tooltip='Cancel'/>
	{/if}
</div>

<style lang='scss'>
	@import "static/css/variables";

	.send-request {
		position: relative;

		&.absolute {
			position: absolute;
			right: 1rem;
			bottom: 1rem;
		}
	}
</style>