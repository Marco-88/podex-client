<script lang="ts">
	import {Highlight} from "svelte-highlight";
	import "svelte-highlight/src/styles/atom-one-dark.css";
	import type { StoreItem } from '../../../../types';
	import { sendResetMessage } from '../../sendMessage';
	import { codeListStore } from '../codeStore';
	import Hoverable from '../../../basic/Hoverable.svelte';
	import Icon from '../../../icon/Icon.svelte';
	import CodeEdit from './CodeEdit.svelte';
	import { settingsStore } from '../../settings/settingsStore';
	import { languages } from '../languages';

	export let item: StoreItem = undefined;
	let editMode = false;

	const toggleEditMode = (): boolean => editMode = !editMode;
	const buildCode = (): string => `/* ${item.request} */${item.response}`;
	const cutRequestOut = (code: string): string => code.replace(`/* ${item.request} */`, '');

	const sendResetAndRemoveItem = (): void => {
		sendResetMessage();
		codeListStore.removeById(item.id);
	};

	const updateItem = (event): void => {
		toggleEditMode();
		sendResetMessage();
		codeListStore.setResponse(item.id, cutRequestOut(event.detail.code));
	}

	$: code = item && buildCode();
	$: editing = item && editMode;
	$: language = $settingsStore.sandbox ? languages['typescript'] : languages[$settingsStore.language];
</script>

<div class='code-item'>
	{#if editing}
		<CodeEdit {code} on:abort={toggleEditMode} on:save={updateItem}/>
	{:else}
		<Hoverable>
			<Icon key="edit" action={() => toggleEditMode()} size={16} tooltip='Edit'/>
			<Icon key="trash" action={() => sendResetAndRemoveItem()} size={16} tooltip='Delete'/>
		</Hoverable>
		<Highlight {language} {code} />
	{/if}
</div>

<style lang='scss'>
	.code-item {
		width: 100%;
		position: relative;
	}
</style>