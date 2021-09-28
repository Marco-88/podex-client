<script lang="ts">
	import { codeStore } from './code_panel/codeStore';
	import { isCompletionFinished } from '../../core/openai/api';
	let iframe: HTMLIFrameElement;

	const buildCode = (): string => {
		let js = '';

		$codeStore.forEach(item => js += item.response);
		const html = `<head><style>body {padding: 0; margin: 0;}</style>
                      </head><body><script>${js}<\/script></body>`
		iframe.contentDocument.open();
		iframe.contentDocument.write(html);
		iframe.contentDocument.close();

		return js;
	}

	$: code = iframe && $codeStore && $isCompletionFinished && buildCode();
</script>

<div class='frame-wrapper'>
	<iframe title="Sandbox" bind:this={iframe}></iframe>
</div>

<style lang='scss'>
	@import 'static/css/variables';

	.frame-wrapper {
		background: $primary-light;
		height: 70%;

		iframe {
			height: 100%;
			width: 100%;
		}
	}
</style>