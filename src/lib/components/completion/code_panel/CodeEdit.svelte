<script lang="ts">
	import Hoverable from '../../basic/Hoverable.svelte';
	import Icon from '../../icon/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let code = '';

	let codeEditPre: HTMLPreElement;
	const dispatch = createEventDispatcher();
	const checkCodeIn = (): void => dispatch('save', {code: codeEditPre.textContent});
	const abortEditing = (): void => dispatch('abort');

	dispatch
</script>

<div class='code-item-edit'>
	<Hoverable>
		<Icon key="check" action={() => checkCodeIn()} size={18} tooltip='Save'/>
		<Icon key="close" action={() => abortEditing()} size={16} tooltip='Abort'/>
	</Hoverable>
	<pre class='code-edit' contenteditable='true' bind:this={codeEditPre}>
		{code}
	</pre>
</div>

<style lang='scss'>
	.code-item-edit {
		width: 100%;
		position: relative;
		padding: 1rem;
	}
</style>