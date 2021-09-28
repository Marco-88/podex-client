<script>
    import Icon from "./Icon.svelte";

    export let icons = {};
    export let size = 32;
</script>

<ul class="icon-list">
    {#each Object.entries(icons) as [key, value]}
        <li class="icon-item">
            <Icon {size} {key} {...value}/>
        </li>
    {/each}
</ul>

<style>
    .icon-list {
        list-style: none;
        display: flex;
        padding: 0 0.25rem 0 0.5rem;
        margin: 0;
    }

    .icon-item {
        cursor: pointer;
    }

    .icon-item:not(:last-child) {
        margin-right: 3px;
    }
</style>
