<script lang="ts">
 import Navbar from './Navbar.svelte';
 import type { BookmarkGroupItem } from '../models';

 export let groups: BookmarkGroupItem[];
</script>

<div>
 <Navbar {groups} />
</div>
