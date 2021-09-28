<script lang="ts">
	import CodeItemHead from './CodeItemHead.svelte';
	import type { StoreItem } from '$lib/types';
	import CodeHighlight from './CodeHighlight.svelte';

	export let item: StoreItem = undefined;

	const buildCode = (): string => `/*${item.request}*/\n\n${item.response}`;

	$: code = item && buildCode();
</script>

<div class="code-list-item">
	<CodeItemHead {item}/>
	<pre class="codex-response">
		<CodeHighlight {code} />
	</pre>
</div>
