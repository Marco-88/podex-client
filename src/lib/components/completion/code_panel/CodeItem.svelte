<script lang="ts">
	import CodeItemHead from './CodeItemHead.svelte';
	import type { StoreItem } from '$lib/types';
	import CodeHighlight from './CodeHighlight.svelte';

	export let item: StoreItem = undefined;

	$: code = item && `/*${item.request}*/\n\n${item.response}`;
</script>

<div class="code-list-item">
	<CodeItemHead {item}/>
	<pre class="codex-response">
		<CodeHighlight {code} />
	</pre>
</div>
