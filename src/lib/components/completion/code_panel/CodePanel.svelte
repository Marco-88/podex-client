<script lang="ts">
	import CodeList from './CodeList.svelte';
	import { codeStore } from './codeStore';
	import PanelHeader from '../../basic/PanelHeader.svelte';
	import Icon from '../../icon/Icon.svelte';

	const clear = async () => codeStore.clear();
</script>

<div class="right-section">
	<PanelHeader>
		<Icon key="toilet" action={() => clear()} size={24} tooltip='Clear ALL'/>
	</PanelHeader>
	<CodeList />
</div>

<style lang='scss'>
	@import "static/css/variables";

	.right-section {
		border-left: $thin solid $secondary-dark;
		display: flex;
		flex-direction: column;
		flex-grow: 2;
		height: 100%;
		padding: 0 .5rem;
		position: relative;
	}
</style>