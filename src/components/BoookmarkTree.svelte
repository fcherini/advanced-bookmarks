<script lang="ts">
 import { onMount } from "svelte";
 import { setIcon } from "obsidian";
 import type { BookmarkItem } from "../models";

 export let items: BookmarkItem[] = [];

 let iconRefs: HTMLElement[] = [];

 onMount(() => {
   iconRefs.forEach((el, i) => {
     const item = items[i];
     if (item.type === "file") {
       setIcon(el, "document");
     } else if (item.type === "folder") {
       setIcon(el, "folder");
     } else if (item.type === "search") {
       setIcon(el, "search");
     }
   });
 });

 function onClick(item: BookmarkItem) {
   console.log("Open bookmark", item);
   // You might call `app.workspace.openLinkText(...)` here for file bookmarks
 }
</script>

<ul class="bookmark-tree">
 {#each items as item, i (item.title)}
   <li
     class="bookmark-item"
     role="button"
     tabindex="0"
     on:click={() => onClick(item)}
     on:keydown={(e) => (e.key === "Enter" || e.key === " ") && onClick(item)}
   >
     <div class="clickable-icon" bind:this={iconRefs[i]}></div>
     <span>{item.title}</span>
   </li>
 {/each}
</ul>

<style>
 .bookmark-tree {
   list-style: none;
   padding: 0;
   margin: 0;
 }

 .bookmark-item {
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 4px 8px;
   cursor: pointer;
 }

 .bookmark-item:hover {
   background-color: var(--interactive-hover);
 }
</style>
