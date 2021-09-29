<script lang="ts">
	import { codeStore } from './codeStore';
	import Icon from '../../icon/Icon.svelte';
	import Hoverable from '../../basic/Hoverable.svelte';
	import type { StoreItem } from '$lib/types';

	export let item: StoreItem = undefined;

	const sendReset = (): void => {
		const iFrame = document.getElementById('sandbox-frame') as HTMLIFrameElement;
		const data = `
			document.body.innerHTML = "";
			document.body.style = "";
			var id = window.requestAnimationFrame(function(){});
			while(id--){
				window.cancelAnimationFrame(id);
			}
			var highestTimeoutId = setTimeout(";");
			for (var i = 0 ; i < highestTimeoutId ; i++) {
				clearTimeout(i);
			}
		`
		iFrame.contentWindow.postMessage(data, window.location.origin);
	}

	const sendResetAndRemoveItem = (): void => {sendReset(); codeStore.removeById(item.id)}
</script>

<Hoverable>
	<Icon key="trash" action={() => sendResetAndRemoveItem()} size={16} tooltip='Delete'/>
</Hoverable>
