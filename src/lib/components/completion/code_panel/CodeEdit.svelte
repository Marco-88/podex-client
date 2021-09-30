<script lang="ts">
	import Hoverable from '../../basic/Hoverable.svelte';
	import Icon from '../../icon/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let code: string = undefined;

	const dispatch = createEventDispatcher();
	const checkCodeIn = (): void => console.log('Implement check code in!');
	const abortEditing = (): void => dispatch('abort');

	dispatch
</script>

<div class="code-list-item">
	<Hoverable>
		<Icon key="check" action={() => checkCodeIn()} size={16} tooltip='Save'/>
		<Icon key="close" action={() => abortEditing()} size={16} tooltip='Abort'/>
	</Hoverable>
	<pre class='code-edit'>
		{code}
	</pre>
</div>

<style lang='scss'>
	.code-list-item {
		width: 100%;
		position: relative;
	}
</style>