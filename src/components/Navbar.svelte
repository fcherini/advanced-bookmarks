<script lang="ts">
  import { onMount } from "svelte";
  import { setIcon } from "obsidian";
  import type { BookmarkGroupItem } from "../models";

  export let groups: BookmarkGroupItem[] = [];

  function onGroupClick(group: BookmarkGroupItem) {
    console.log("Clicked group:", group);
  }

  // Assign refs and set icons
  let iconRefs: HTMLElement[] = [];

  onMount(() => {
    iconRefs.forEach((el) => {
      setIcon(el, "bookmark"); // You can customize this per group later
    });
  });
</script>

<div class="nav-buttons-container">
  <div
  class="clickable-icon nav-action-button"
  aria-label="All bookmarks"
  role="button"
  tabindex="0"></div>
  <!-- bind:this={iconRefs[i]} -->
  <!-- on:click={() => onGroupClick(group)} -->
  <!-- on:keydown={(e) => (e.key === "Enter" || e.key === " ") && onGroupClick(group)} -->
  {#each groups as group, i}
    <div
      class="clickable-icon nav-action-button"
      aria-label={group.title}
      role="button"
      tabindex="0"
      bind:this={iconRefs[i]}
      on:click={() => onGroupClick(group)}
      on:keydown={(e) => (e.key === "Enter" || e.key === " ") && onGroupClick(group)}
    ></div>
  {/each}
</div>


<style>
  /* .nav-buttons-container {
    display: flex;
    gap: 8px;
    padding: 8px;
    align-items: center;
  }

  .clickable-icon {
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .clickable-icon:hover {
    background: var(--interactive-hover);
  }

  .nav-action-button {
    color: var(--text-normal);
  } */
</style>
