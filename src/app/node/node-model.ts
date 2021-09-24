export class NodeModel {
  type: 'folder' | 'file' | 'unset' = 'unset';
  name: string = '';
  children: NodeModel[] = [];
  id: string;

  constructor() {
    this.id = Math.floor(Math.random() * Date.now()).toLocaleString();
  }
}
