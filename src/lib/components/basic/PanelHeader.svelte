<script lang="ts">
	export let text = '';
</script>

<div class="panel-header">
	{#if text}
		<h1>{text}</h1>
	{/if}
	<slot></slot>
</div>


<style lang='scss'>
	.panel-header {
		display: flex;
		align-content: center;
		justify-content: space-around;
		height: 48px;

		h1 {
			padding: .5rem 0;
		}
	}
</style>