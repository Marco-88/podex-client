<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	export let text = '';
	export let value = 'plaintext';
	export let saveValue: (value: string) => void;
	export let items = [];
	export let capitalized = true;
	export let loading = false;

	const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
	const getId = (): string => text.toLowerCase().replace(/ /g, '-')
	const setValue = (): void => saveValue(selected.toLowerCase());
	$: selected = capitalized ? capitalize(value) : value;
</script>

<div class='select-wrapper' class:loading>
	<label for={getId()}> {text}: </label>

	{#if loading}
		<div class='spinner'>
			<Icon key="spinner" fill={true} size={24} tooltip='Loading Engines'/>
		</div>
	{:else}
		<select id={getId()} bind:value={selected} on:change={() => setValue()} >
			{#each items as item}
				<option class='option'>{capitalized ? capitalize(item) : item}</option>
			{/each}
		</select>
	{/if}
</div>

<style lang='scss'>
	@import 'static/css/variables';

	.select-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: .75rem;
		width: 100%;

		&.loading {
			flex-direction: row;
		}

		label {
			cursor: pointer;
			width: 100%;
		}

		.spinner {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		select {
			padding: .5rem;
			background: $primary;
			color: $secondary;
			border: $border solid $primary-light;
			border-radius: $radius;
			outline: none;
			opacity: .7;
			cursor: pointer;
			width: 100%;
			font-size: 1rem;
			margin-top: .3em;

			&:hover {
				opacity: 1;
				border: $border solid $secondary-dark;
			}

			& > .option {
				-webkit-appearance: none;
				background: $primary;
				color: $secondary;
				border: $border solid $primary-light;
				border-radius: $radius;
				outline: none;
				opacity: .7;
				cursor: pointer;
				padding: .5rem;

				&:hover {
					-webkit-appearance: none;
					opacity: 1;
					background: $secondary-light;
					color: $primary-dark;
					box-shadow: 0 0 10px 100px $secondary-light inset;
				}
			}
		}
	}
</style>