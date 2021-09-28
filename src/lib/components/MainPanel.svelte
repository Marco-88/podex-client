<script lang="ts">
	import CodePanel from './completion/code_panel/CodePanel.svelte';
	import MainSection from './MainSection.svelte';
</script>

<div class="main-panel">
	<MainSection/>
	<CodePanel />
</div>

<style lang='scss'>
	@import "static/css/variables";

	.main-panel {
		display: flex;
		flex-direction: row;
		height: 100%;
	}
</style>