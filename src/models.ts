import { App, Notice } from "obsidian";

export class Bookmarks {
	private bookmarks = this.getItems();

	constructor(private readonly app: App) {}

	getItems(): BookmarkItem[] {
		const bookmarksPlugin = (
			this.app as any
		).internalPlugins.getEnabledPluginById("bookmarks");
		if (!bookmarksPlugin) {
			new Notice("The core bookmark plugin must be enabled");
			return [];
		}
		return bookmarksPlugin.items as BookmarkItem[];
	}

	getNonGroupBookmarks(): BookmarkItem[] {
		return this.getItems().filter((item) => item.type !== "group");
	}
}

export type BookmarkItem =
	| BookmarkVaultItem
	| BookmarkSearchItem
	| BookmarkGroupItem;

export interface BookmarkItemBase {
	ctime: number;
	type: "file" | "group" | "search" | "folder";
	title: string;
}

export interface BookmarkVaultItem extends BookmarkItemBase {
	path: string;
}
export interface BookmarkSearchItem extends BookmarkItemBase {
	query: string;
}
export interface BookmarkGroupItem extends BookmarkItemBase {
	items: BookmarkItem[];
}
