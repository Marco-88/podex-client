<script lang="ts">
	export let text: string;
</script>

<div class="panel-header">
	{#if text}
		<h1>{text}</h1>
	{/if}
	<slot></slot>
</div>


<style>
	.panel-header {
		display: flex;
		align-content: center;
		justify-content: space-around;
		padding: 8px 0;
		height: 32px;
	}
</style>