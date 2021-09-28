<script lang="ts">
	import { codeStore } from './code_panel/codeStore';
	import { isCompletionFinished } from '../../core/openai/api';
	let iframe: HTMLIFrameElement;

	const buildCode = (): string => {
		let html = `<head><style>
				body {padding: 0; margin: 0; display: flex; justify-content: center; align-items: center; height: 100%;}
				p {font-size: 1.5rem; color: #777; height: 50px; width: 50%; text-align: center;}
			</style></head><body>`

		if ($codeStore.length > 0)  {
			let js = '';
			$codeStore.forEach(item => js += item.response);
			html += `<script>${js}<\/script></body>`;
		} else {
			html += `<p>Tell Codex what to do below, and it will generate JavaScript that runs here.</p></body>`;
		}

		iframe.contentDocument.open();
		iframe.contentDocument.write(html);
		iframe.contentDocument.close();

		return html;
	}

	$: temp = iframe && $codeStore && $isCompletionFinished && buildCode();
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