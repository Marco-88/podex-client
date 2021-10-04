<script lang="ts">
	export let text = '';
	export let value = 'plaintext';
	export let saveValue: (value: string) => void;
	export let items = [];

	const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
	const getId = (): string => text.toLowerCase().replace(/ /g, '-')
	const setValue = (): void => saveValue(selected.toLowerCase());

	$: selected = capitalize(value)
</script>

<div class='select-wrapper'>
	<label for={getId()}> {text}: </label>
	<select id={getId()} bind:value={selected} on:change={() => setValue()} >
		{#each items as item}
			<option class='option'>{capitalize(item)}</option>
		{/each}
	</select>
</div>

<style lang='scss'>
	@import 'static/css/variables';
	.select-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: .5rem;

		label {
			cursor: pointer;
			display: none;
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