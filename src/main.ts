import {App, WorkspaceLeaf, MarkdownView, Notice, Plugin} from 'obsidian';

// Remember to rename these classes and interfaces!

export default class EnhanceWebViewerPlugin extends Plugin {
	
	async onload() {
		// Befehl hinzufügen, um Text und Fragment-Link in die aktive Notiz einzufügen
	    this.addCommand({
	      id: "copy-with-fragment",
	      name: "Copy Selected Text with Fragment Link",
	      checkCallback: (checking: boolean) => {
	        if (!checking) {
	          this.copySelectedTextWithFragment();
	        }
	        return true;
	      },
	    });
	};
 
	// Text auswählen und Fragment generieren
	async copySelectedTextWithFragment(): Promise<void> {
	    const webViewLeaf = this.getActiveWebViewerLeaf();
	    if (!webViewLeaf) {
	      new Notice("No active Web Viewer found!");
	      return;
	    }

		// Interaktion mit dem Web Viewer (z. B. um die URL zu erhalten)
	    const webviewComponent = webViewLeaf.view;
	    const currentURL = webviewComponent?.state?.url;

	    // Text aus dem Web Viewer holen
	    const selectedText = await this.getWebViewerSelection(webViewLeaf);
	    if (!selectedText || !currentURL) {
	      new Notice("No text selected or URL missing.");
	      return;
	    }

	    // Fragment-Link generieren
	    const textFragmentURL = `${currentURL}#:~:text=${encodeURIComponent(selectedText)}`;

	    // Zu aktiver Notiz hinzufügen
	    const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
	    if (!activeLeaf) {
	      new Notice("No active Markdown note.");
	      return;
	    }

	    activeLeaf.editor.replaceSelection(`[${selectedText}](${textFragmentURL})`);
	    new Notice("Copied text and link to your note!");
	}

	  // Helferfunktion: Aktive Web Viewer Leaf holen
	  getActiveWebViewerLeaf(): WorkspaceLeaf | null {
		const leaves = this.app.workspace.getLeavesOfType("web-view");
		return leaves.length > 0 ? leaves[0] : null;
	  }

	  // Helferfunktion: Auswahl von Text aus dem Web Viewer abrufen
	  async getWebViewerSelection(leaf: WorkspaceLeaf): Promise<string | null> {
		// Dies erfordert eine spezifische Implementierung der Web Viewer API
		// Placeholder: Annahme, dass eine Methode wie "getSelectedText" existiert.
		const webviewComponent = leaf.view;
		if (webviewComponent?.getSelectedText) {
		  return await webviewComponent.getSelectedText();
		}
		return null;
	  }
	
	onunload() {
	}
}
	



