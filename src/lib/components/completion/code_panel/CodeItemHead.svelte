<script lang="ts">
	import { codeStore } from './codeStore';
	import Icon from '../../icon/Icon.svelte';
	import Hoverable from '../../basic/Hoverable.svelte';
	import type { StoreItem } from '$lib/types';

	export let item: StoreItem = undefined;
	const remove = async () => codeStore.removeById(item.id);
</script>

<Hoverable>
	<Icon key="trash" action={() => remove()} size={16} tooltip='Delete'/>
</Hoverable>
