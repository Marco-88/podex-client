<script lang="ts">
	import {Highlight} from "svelte-highlight";
	import "svelte-highlight/src/styles/atom-one-dark.css";
	import typescript from "svelte-highlight/src/languages/typescript";

	export let code = '';
</script>

<Highlight language={typescript} {code} />