<script lang="ts">
	import { requestCompletion, stopCompletion } from '$lib/core/openai/api';
	import Icon from '$lib/components/icon/Icon.svelte';
	let prompt = '';
	let isPending = false;

	const sendPrompt = async () => {
		if(prompt.trim().length > 0) {
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
	}
</script>

<div class="prompt-container">
	<textarea id="prompt-area" bind:value={prompt} placeholder="Provide instructions..."></textarea>
	{#if !isPending}
		<div class='icon-wrapper'>
			<Icon key="arrowRight" action={() => sendPrompt()} round={true} fill={true} size={28} tooltip='Send'/>
		</div>
	{:else}
		<button class='button-cancel' on:click={() => stopStream()}>
			Cancel
		</button>
	{/if}
</div>

<style lang='scss'>
	@import "static/css/variables";

	.prompt-container {
		background: $primary-dark;
		display: flex;
		height: 19%;
		position: relative;

		#prompt-area {
			flex-grow: 1;
			background: $secondary-dark;
			padding: 1rem;
			margin-top: 1rem;
			font-size: 1.1rem;
			::-webkit-scrollbar { cursor: pointer; }
		}

		.icon-wrapper {
			position: absolute;
			right: 1rem;
			bottom: 1rem;
		}

		button {
			padding: 1rem;
			margin-top: 1rem;
		}
	}
</style>