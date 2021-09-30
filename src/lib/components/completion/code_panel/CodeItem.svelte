<script lang="ts">
	import type { StoreItem } from '$lib/types';
	import CodeHighlight from './CodeHighlight.svelte';
	import { sendResetMessage } from './resetMessage';
	import { codeStore } from './codeStore';
	import Hoverable from '../../basic/Hoverable.svelte';
	import Icon from '../../icon/Icon.svelte';
	import CodeEdit from './CodeEdit.svelte';

	export let item: StoreItem = undefined;
	let editMode = false;

	const buildCode = (): string => `/* ${item.request} */${item.response}`;
	const toggleEditMode = (): boolean => editMode = !editMode;
	const sendReset = (): void => sendResetMessage();
	const sendResetAndRemoveItem = (): void => {
		sendReset();
		codeStore.removeById(item.id);
	};

	$: code = item && buildCode();
	$: editing = item && editMode;
</script>

<div class="code-list-item">
	{#if editing}
		<CodeEdit {code} on:abort={toggleEditMode}/>
	{:else}
		<Hoverable>
			<Icon key="edit" action={() => toggleEditMode()} size={16} tooltip='Edit'/>
			<Icon key="trash" action={() => sendResetAndRemoveItem()} size={16} tooltip='Delete'/>
		</Hoverable>
		<CodeHighlight {code} />
	{/if}
</div>

<style lang='scss'>
	.code-list-item {
		width: 100%;
		position: relative;
	}
</style>