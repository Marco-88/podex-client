export const sendResetMessage = (): void => {
	const iFrame = document.getElementById('sandbox-frame') as HTMLIFrameElement;
	iFrame.contentWindow.postMessage(resetMessage, window.location.origin);
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