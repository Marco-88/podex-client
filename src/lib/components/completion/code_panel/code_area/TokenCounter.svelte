<script lang="ts">
	import { tokenCountStore } from './tokenCountStore';
	import Icon from '../../../icon/Icon.svelte';
	import { settingsStore } from '../../settings/settingsStore';

	const charTokenRatio = 2.870;
	$: titleBase = `${$tokenCountStore.tokenCount} token in prompt Up to ${$settingsStore.maxTokens} tokens in response`;
	$: titleInfo = `Submitting would use up to ${$tokenCountStore.tokenCount + $settingsStore.maxTokens} tokens`;
	const titleWarn = 'This engine can only process a maximum of 4,096 tokens in a single request, please reduce your prompt or response length.';
	$: warn = $tokenCountStore.tokenCount + $settingsStore.maxTokens > 4096;
</script>

<div class='token-info'>
	<div class="token-counter" title='Characters'>
		{$tokenCountStore.prompt.length}
	</div>

	<div class="token-counter" title='Characters divided with Ratio: {charTokenRatio}'>
		{Math.round($tokenCountStore.prompt.length / charTokenRatio)}
	</div>

	<div class="token-counter" title={titleBase + (warn ? titleWarn : titleInfo)} class:warn>
		{#if typeof $tokenCountStore.tokenCount === 'number'}
			{$tokenCountStore.tokenCount}
		{:else if $tokenCountStore.tokenCount}
			<Icon key="spinner" fill={true} size={16} tooltip='Encoding Tokens'/>
		{/if}
	</div>
</div>

<style lang='scss'>
	@import "../../../../../../static/css/variables";

	.token-info {
		display: flex;
		justify-content: space-around;
		align-items: center;

		.token-counter {
			padding: .4rem;
			background-color: $primary;
			border-radius: $radius;

			&.warn {
				background: $error-dark;
				color: $secondary-light;
			}
		}
	}
</style>