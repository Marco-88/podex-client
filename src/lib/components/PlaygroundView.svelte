<script lang="ts">
	import PanelHeader from './basic/PanelHeader.svelte';
	import Settings from './completion/settings/Settings.svelte';
	import CodePanel from './completion/code_panel/CodePanel.svelte';
</script>

<section class='playground'>
	<PanelHeader text="Poku17s Playground"/>
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
		padding: 0 1rem;

		.main {
			display: flex;
			flex-direction: row;
			height: 100%;
		}
	}
</style>