<script lang="ts">
	export let text = '';
	export let startValue = 17;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let maxLength = 4;
	export let column = true;
	export let saveValue: (value: number) => void;

	const getId = (): string => text.toLowerCase().replace(/ /g, '-')

	const getValidValue = (uncheckedValue: number): number => {
		return uncheckedValue < min ? min : uncheckedValue > max ? max : uncheckedValue;
	};

	$: value = startValue && max && getValidValue(startValue);

	const validateValue = (): void => {
		saveValue(getValidValue(value));
	};
</script>

<div class="slider-wrapper">
	<div class='label-value' class:column>
		<label for={getId() + '-text'} > {text}: </label>
		<input id={getId() + '-text'} bind:value={value} on:focusout={() => validateValue()} {maxLength}/>
	</div>
	<input id={getId() + '-slider'} class="slider" type="range" {min} {max} {step}
	       bind:value={value} on:input={() => validateValue()}>
</div>

<style lang='scss'>
	@import 'static/css/variables';
	.slider-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: .75rem;

		.label-value {
			display: block;
			padding-bottom: .5rem;

			input {
				width: 40px;
				text-align: center;
			}

			&.column {
				width: 100%;
			}
		}

		.slider {
			-webkit-appearance: none;
			width: 100%;
			height: 3px;
			background: $primary;
			outline: none;
			opacity: 0.7;
			-webkit-transition: .2s;
			transition: opacity .2s;
			border-radius: $radius;
		}

		.slider:hover {
			opacity: 1;
		}

		.slider::-webkit-slider-thumb {
			-webkit-appearance: none;
			width: 15px;
			height: 15px;
			background: $secondary-dark;
			border-radius: $radius-round;
			cursor: pointer;
		}
	}
</style>