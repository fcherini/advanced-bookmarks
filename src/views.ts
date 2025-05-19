import { ItemView, WorkspaceLeaf } from "obsidian";
import BookmarkView from "./components/BookmarkView.svelte";
import { mount, unmount } from "svelte";
import { Bookmarks, type BookmarkGroupItem } from "./models";

export const VIEW_TYPE = "advanced-bookmark-view";

export class AdvancedBookmarkView extends ItemView {
	icon: "lucide-bookmark-plus";
	navigation: false;

	bookmarkView: ReturnType<typeof BookmarkView> | undefined;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE;
	}

	getDisplayText() {
		return "Advanced Bookmark";
	}

	async onOpen() {
		const bookmarksModel = new Bookmarks(this.app);

		const groups = bookmarksModel
			.getItems()
			.filter((item): item is BookmarkGroupItem => item.type === "group");

		this.bookmarkView = mount(BookmarkView, {
			target: this.contentEl,
			props: {
				groups,
			},
		});
	}

	async onClose() {
		if (this.bookmarkView) {
			unmount(this.bookmarkView);
		}
	}
}
