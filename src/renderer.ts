import { IRenderMime, IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { CompletionHandler, Completer } from '@jupyterlab/completer';
import { JupyterFrontEnd } from '@jupyterlab/application';

export class BBCompletionRenderer
  extends Completer.Renderer
  implements Completer.IRenderer
{
  private app: JupyterFrontEnd;
  private renderMimeRegistry: IRenderMimeRegistry;
  private namespaces: Map<string, string>;

  constructor(app: JupyterFrontEnd, renderMimeRegistry: IRenderMimeRegistry) {
    super();
    this.app = app;
    this.renderMimeRegistry = renderMimeRegistry;
    this.namespaces = new Map<string, string>();
  }
  // constructor() {
  //   super();
  // }

  createCompletionItemNode(
    item: CompletionHandler.ICompletionItem,
    orderedTypes: string[]
  ): HTMLLIElement {
    const label = item.label;
    console.log('In createCompletionItemNode:  ' + label);
    if (label.includes('.')) {
      const tempLabel = item.label;
      item.label = label.substring(label.lastIndexOf('.') + 1);
      this.namespaces.set(item.label, tempLabel);
    }
    const li = super.createCompletionItemNode(item, orderedTypes);
    return li;
  }

  createDocumentationNode(
    item: CompletionHandler.ICompletionItem
  ): HTMLElement {
    const node = document.createElement('div');
    // need to add namespace back for inspect request
    node.innerHTML = '<h1>Hi</h1>';

    return node;
  }
}