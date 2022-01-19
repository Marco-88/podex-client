<script lang="ts">
	import CodeItem from './CodeBlock.svelte';
	import { codeListStore } from '../codeStore';
	import PanelHeader from '../../../basic/PanelHeader.svelte';
	import Icon from '../../../icon/Icon.svelte';
	import { sendResetMessage } from '../../sendMessage';

	const clear = () => {
		sendResetMessage();
		codeListStore.clear();
	};

	$: code = $codeListStore.length > 0;
</script>

<div class='header' class:code>
	<PanelHeader>
		<Icon key="toilet" action={() => clear()} size={32} tooltip='Clear ALL'/>
	</PanelHeader>
</div>
<div class="code-list">
	{#each $codeListStore as item}
		<CodeItem {item} />
	{/each}
</div>

<style lang='scss'>
	@import "static/css/variables";

	.header {
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 17;

		&.code {
			 background: $monokai-bg;
		 }
	}

	.code-list {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 48px;
		right: 0;
		left: 0;
		bottom: .05rem;
		overflow-y: auto;
	}
</style>
