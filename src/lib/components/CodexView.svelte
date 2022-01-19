<script lang="ts">
	import PromptArea from './completion/PromptArea.svelte';
	import SandBox from './completion/SandBox.svelte';
	import PanelHeader from './basic/PanelHeader.svelte';
	import Settings from './completion/settings/Settings.svelte';
	import CodePanel from './completion/code_panel/CodePanel.svelte';
	import InfoPanel from './basic/InfoPanel.svelte';
	import InfoSandbox from './completion/InfoSandbox.svelte';
</script>

<section class='playground'>
	<div class='main'>
		<PanelHeader text="Poku17s JavaScript Sandbox"/>
		<InfoPanel iconKey='info' tooltip='Info'>
			<InfoSandbox/>
		</InfoPanel>
		<SandBox />
		<Settings />
		<PromptArea />
	</div>
	<div class='right'>
		<CodePanel />
	</div>
</section>

<style lang='scss'>
	@import "static/css/variables";

	.playground {
		display: flex;
		height: 100%;
		width: 100%;
		padding: 0;

		.main {
			display: flex;
			flex-direction: column;
			flex-grow: 3;
			height: 100%;
			padding: 0 1rem;
		}

		.right {
			display: flex;
			flex-grow: 2;
			height: 100%;
		}
	}
</style>