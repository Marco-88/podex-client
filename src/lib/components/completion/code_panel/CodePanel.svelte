<script lang="ts">
	import CodeList from './CodeList.svelte';
	import { codeStore } from './codeStore';
	import PanelHeader from '../../basic/PanelHeader.svelte';
	import Icon from '../../icon/Icon.svelte';
	import { sendResetMessage } from './resetMessage';

	const clear = async () => codeStore.clear() && sendResetMessage();
	$: code = $codeStore.length > 0;
</script>

<div class="right-section">
	<div class='header' class:code>
		<PanelHeader>
			<Icon key="toilet" action={() => clear()} size={24} tooltip='Clear ALL'/>
		</PanelHeader>
	</div>
	<CodeList />
</div>

<style lang='scss'>
	@import "static/css/variables";

	.right-section {
		border-left: $border solid $secondary-dark;
		display: flex;
		flex-direction: column;
		flex-grow: 2;
		height: 100%;
		position: relative;

		.header {
			width: 100%;
			position: absolute;
			top: 0;
			z-index: 17;

			&.code {
				background: $monokai-bg;
			}
		}
	}
</style>