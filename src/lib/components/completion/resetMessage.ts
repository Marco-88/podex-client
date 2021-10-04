import { settingsStore } from '$lib/components/completion/settings/settingsStore';
import { get } from 'svelte/store';

export const sendResetMessage = (): void => {
	if(get(settingsStore).sandbox) {
		const iFrame = document.getElementById('sandbox-frame') as HTMLIFrameElement;
		iFrame.contentWindow.postMessage(resetMessage, window.location.origin);
	}
}

const resetMessage = `
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