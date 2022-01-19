<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	export let iconKey = '';
	export let tooltip = '';

	let hidden = true;
	const toggle = () => (hidden = !hidden);
</script>

<div class='info-wrapper'>
	<div class={'info-icon ' + (!hidden ? 'hidden' : '')}>
		<Icon key={iconKey} action={() => toggle()} size={24} round={true} {tooltip}/>
	</div>
	<div class="info-panel" class:hidden >
		<div class='icon-close'>
			<Icon key='close' action={() => toggle()} dark={true} size={20} scale={1.2} tooltip='Close'/>
		</div>
		<div class='info-content-wrapper'>
			<slot>
				<h4>No info is given, sorry.</h4>
			</slot>
		</div>
	</div>
</div>

<style lang='scss'>
	@import 'static/css/variables';

	.info-wrapper {
		position: fixed;
		right: 1rem;
		top: .5rem;
		z-index: 23;

		.info-panel {
			position: relative;
			display: flex;
			width: 33vw;
			margin: auto -.5rem auto 0;
			border-radius: $radius;

			.icon-close {
				position: absolute;
				right: 1rem;
				top: .75rem;
			}

			.info-content-wrapper {
				padding: .75rem 1rem .75rem .75rem;
				width: 100%;
				height: 100%;
				border-radius: $radius;
			}
		}

		.hidden {
			display: none;
		}
	}
</style>