<script lang="ts">
	import CodeList from './code_list/CodeList.svelte';
	import PanelHeader from '../../basic/PanelHeader.svelte';
	import Icon from '../../icon/Icon.svelte';
	import { codeStore } from './codeStore';
	import { sendResetMessage } from '../resetMessage';
	import { settingsStore } from '../settings/settingsStore';
	import CodeArea from './code_area/CodeArea.svelte';

	const clear = async () => codeStore.clear() && sendResetMessage();

	$: code = $codeStore.length > 0;
	$: off = !$settingsStore.sandbox;
</script>

<div class="right-section" class:off>
	{#if !$settingsStore.sandbox}
		<CodeArea />
	{:else}
		<div class='header' class:code>
			<PanelHeader>
				<Icon key="toilet" action={() => clear()} size={24} tooltip='Clear ALL'/>
			</PanelHeader>
		</div>
		<CodeList />
	{/if}
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

		&.off {
			border-left: 0;
		}

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