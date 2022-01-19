<script lang="ts">
	import { tokenCountStore } from './tokenCountStore';
	import Icon from '../../../icon/Icon.svelte';
	import { settingsStore } from '../../settings/settingsStore';

	const charTokenRatio = 2.870;
	$: warn = $tokenCountStore.tokenCount + $settingsStore.maxTokens > 4096;
	$: tokenCount = $tokenCountStore.tokenCount;
	$: maxTokens = $settingsStore.maxTokens;

	$: titleBase = `${tokenCount} tokens in prompt Up to ${maxTokens} tokens in response`;
	$: titleInfo = `Submitting would use up to ${tokenCount + maxTokens} tokens`;
	const titleWarn =
		'This engine can only process a maximum of 4,096 tokens in a single request, ' +
		'please reduce your prompt or response length.';
</script>

<div class='token-info'>
	<div class="token-counter" title='Characters'>
		{$tokenCountStore.prompt.length}
	</div>

	<div class="token-counter" title='Characters divided with Ratio: {charTokenRatio}'>
		{Math.round($tokenCountStore.prompt.length / charTokenRatio)}
	</div>

	<div class="token-counter" class:warn>
		<div class='token-counter-title'>
			<span class='title-base'>{titleBase}</span>
			<span class='title-info'>{titleInfo}</span>
			<span class='title-warn'>{titleWarn}</span>
		</div>

		{#if typeof tokenCount === 'number'}
			{tokenCount}
		{:else if tokenCount}
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

			.token-counter-title {display: none;}
			.title-info {color: $info-dark;}
			.title-warn {color: $error;}
		}

		.token-counter:hover {
			padding: .4rem;
			background-color: $primary;
			border-radius: $radius;
			position: relative;

			.token-counter-title {
				display:flex;
				flex-direction: column;
				background-color: $primary-dark;
				border: $border solid $secondary;
				border-radius: $radius;
				position: absolute;
				top: -320%;
				left: -36px;
				width: 250px;
				padding:.5rem;
			}

			&.warn {
				background: $error-dark;
				color: $secondary-light;
				.token-counter-title {top: -440%;}
				.title-info {display: none;}
			}

			&:not(.warn) {
				.title-warn {display: none;}
			}
		}
	}
</style>