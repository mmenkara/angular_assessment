import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {NodeModel} from "./node-model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html'
})
export class NodeComponent implements OnChanges{
  iconUrls = {
    file: 'assets/file-regular.svg',
    folder: 'assets/folder-open-regular.svg'
  }

  formModel = '';
  editMode = false;
  chooseTypeMode = false;
  inFocus = false;
  @Input() node!: NodeModel;
  @Output() updateNode = new EventEmitter<NodeModel>();
  @Output() deleteNode = new EventEmitter<string>();

  constructor() {}

  ngOnChanges() {
    this.editMode = (this.node.type === 'folder' || this.node.type === 'file') && this.node.name.length === 0;
    this.chooseTypeMode = this.node.type === 'unset';
  }

  saveNode() {
    if (null == this.formModel || this.formModel.length === 0) {
      this.deleteNode.emit(this.node.id);
    } else {
      this.updateNode.emit(Object.assign({}, this.node, {name: this.formModel}));
    }
  }

  addChildNode() {
    const newNode = this.node;

    newNode.children.push(new NodeModel());
    this.updateNode.emit(newNode);
  }

  handleChildUpdate(childNode: NodeModel) {
    const newNode = this.node;
    const childIndex = newNode.children?.findIndex(value => value.id === childNode.id);
    newNode.children[childIndex] = childNode;
    this.updateNode.emit(newNode);
  }

  handleChildDelete(id: string) {
    this.updateNode.emit(Object.assign({}, this.node, {children: this.node.children.filter(value => value.id !== id)}));
  }

  chooseNodeType(type: string) {
    this.updateNode.emit(Object.assign({}, this.node, {type: type}));
  }
}
