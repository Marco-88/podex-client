export const byteToString = (bytes: Uint8Array): string => {
	let str = '';
	for (let i = 0; i < bytes.length; i++) {
		str += String.fromCharCode(bytes[i]);
	}
	return str;
}

export const stringToByte = (token: string): Uint8Array => {
	const bytes = new Uint8Array(token.length);
	for (let i = 0; i < token.length; i++) {
		bytes[i] = token.charCodeAt(i);
	}
	return bytes;
}