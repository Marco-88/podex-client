<script lang="ts">
	import type { ChangeEvent } from '$lib/types';

	export let text = '';
	export let checked = true;
	export let saveValue: (checked: boolean) => void;
	export let column = false;

	const getId = (): string => text.toLowerCase().replace(/ /g, '-')
	const setChecked = (event: ChangeEvent): void => saveValue(event.target.checked);
</script>

<div class='checkbox-wrapper' class:column>
	<label for={getId()}> {text}: </label>
	<input id={getId()} type='checkbox' bind:checked on:change={(event) => setChecked(event)}/>
</div>

<style lang='scss'>
	@import 'static/css/variables';
	.checkbox-wrapper {
		position: relative;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: .75rem;

		&.column {
			width: 100%;
			align-items: center;
			justify-content: start;
		}
		label {
			cursor: pointer;
		}

		input {
			-webkit-appearance: none;
			background: $primary;
			color: $secondary;
			border: $border solid $primary-light;
			border-radius: $radius;
			outline: none;
			opacity: .7;
			width: 20px;
			height: 20px;
			cursor: pointer;
			margin-left: .5rem;

			&:checked {
				background-color: $primary;
			}

			&:checked:after {
				position: absolute;
				top: 22px;
				font-size: 1.1rem;
				content: '\2713';
				color: $secondary-light;
			}

			&:hover {
				opacity: 1;
			}
		}
	}
</style>