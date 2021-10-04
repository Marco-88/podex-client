<script lang="ts">
	import CompletionIconButton from './CompletionIconButton.svelte';
	let prompt = '';
</script>

<div class="prompt-container">
	<textarea id="prompt-area" bind:value={prompt} placeholder="Provide instructions..."></textarea>
	<CompletionIconButton {prompt} right={true} />
</div>

<style lang='scss'>
	@import "static/css/variables";

	.prompt-container {
		background: $primary-dark;
		display: flex;
		height: 15%;
		position: relative;
		border-radius: $radius;

		#prompt-area {
			flex-grow: 1;
			background: $secondary-dark;
			padding: 1rem;
			font-size: 1.1rem;
			font-weight: bold;
			border-radius: $radius;
		}
	}
</style>