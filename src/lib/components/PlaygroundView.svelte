<script lang="ts">
	import PanelHeader from './basic/PanelHeader.svelte';
	import Settings from './completion/settings/Settings.svelte';
	import CodePanel from './completion/code_panel/CodePanel.svelte';
	import InfoPanel from './basic/InfoPanel.svelte';
	import InfoPlayground from './completion/InfoPlayground.svelte';
</script>

<section class='playground'>
	<PanelHeader text="Poku17s Playground">
		<InfoPanel iconKey='info' tooltip='Info'>
			<InfoPlayground/>
		</InfoPanel>
	</PanelHeader>
	<div class='main'>
		<CodePanel />
		<Settings />
	</div>
</section>

<style lang='scss'>
	@import "static/css/variables";

	.playground {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding-left: 1rem;

		.main {
			display: flex;
			flex-direction: row;
			height: 100%;
		}
	}
</style>