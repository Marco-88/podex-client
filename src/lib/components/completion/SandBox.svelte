<script lang="ts">
	import { codeStore } from './code_panel/codeStore';
	import { isCompletionFinished } from '../../core/openai/api';

	let iFrame: HTMLIFrameElement;

	const triggerPostMessage = (): void => {
		if($codeStore.length > 0) {
			const data = $codeStore[$codeStore.length - 1].response;
			iFrame.contentWindow.postMessage(data, window.location.origin);
		}
	}

	$: temp = iFrame && $codeStore && $isCompletionFinished && triggerPostMessage();
</script>

<div class='sandbox-container'>
	<iframe id="sandbox-frame" title="Sandbox" src='/sandbox/sandbox.html' bind:this={iFrame}></iframe>
	{#if $codeStore.length === 0}
		<div>Tell Codex what to do below, and it will generate JavaScript that runs here.</div>
	{/if}
</div>

<style lang='scss'>
	@import 'static/css/variables';

	.sandbox-container {
		background: $primary-light;
		height: 72%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: $radius;

		iframe {
			height: 100%;
			width: 100%;
		}

		div {
			position: absolute;
			font-size: 1.5rem;
			color: $active;
			height: 50px;
			width: 35%;
			text-align: center;
		}
	}
</style>