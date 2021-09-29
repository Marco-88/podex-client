document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("message", (event) => {
		console.log('Message Received: ', event.data);
		window.eval(event.data);
	});

	window.onerror = function (msg, url, line) {
		window.top.postMessage({ type: "sandbox_error", msg, url, line }, window.location.origin);
	};

	const log = console.log.bind(console);
	console.log = (...args) => {
		window.top.postMessage({ type: "sandbox_log", args }, window.location.origin);
		log(...args);
	};
});