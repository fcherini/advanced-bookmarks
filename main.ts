import { Plugin, WorkspaceLeaf } from "obsidian";
import { AdvancedBookmarkView, VIEW_TYPE } from "src/views";
export default class AdvancedBookmakrs extends Plugin {
	// private bookmark!: Bookmark;
	async onload() {
		// this.bookmark = new Bookmark(this.app);
		this.registerView(VIEW_TYPE, (leaf) => new AdvancedBookmarkView(leaf));

		console.log(this.app.workspace.getLeavesOfType("bookmarks"));
		const ribbonIconEl = this.addRibbonIcon(
			"bookmark-plus",
			"Open Advanced Bookmarks",
			async (evt: MouseEvent) => {
				await this.activateView();
				// this.getBookmarks();
			}
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getLeftLeaf(false);
			if (!leaf) return;
			await leaf.setViewState({ type: VIEW_TYPE, active: true });
		}

		workspace.revealLeaf(leaf);
	}

	// getBookmarks() {
	// 	const bookmarksPlugin = (
	// 		this.app as any
	// 	).internalPlugins.getEnabledPluginById("bookmarks");
	// 	const rawItems = bookmarksPlugin.items;
	// 	rawItems.forEach((item) => {});
	// 	const folder = this.app.vault.getFolderByPath("03 Reference Notes");
	// 	console.log(folder);

	// 	console.log(rawItems);
	// }
	onunload() {}
}
