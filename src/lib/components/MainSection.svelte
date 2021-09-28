<script lang="ts">
	import PromptArea from './completion/PromptArea.svelte';
	import SandBox from './completion/SandBox.svelte';
	import PanelHeader from './basic/PanelHeader.svelte';
</script>

<section class="main-section">
	<PanelHeader text="Poku17s Codex Sandbox Clone"/>
	<SandBox />
	<PromptArea />
</section>

<style lang='scss'>
	@import "static/css/variables";

	.main-section {
		display: flex;
		flex-direction: column;
		flex-grow: 3;
		height: 100%;
	}
</style>