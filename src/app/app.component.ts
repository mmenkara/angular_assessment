import { Component } from '@angular/core';
import {NodeModel} from "./node";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  _nodeList: BehaviorSubject<NodeModel[]> = new BehaviorSubject<NodeModel[]>([]);
  $nodeList = this._nodeList.asObservable();

  addRootFolder() {
    const newNodeList = this._nodeList.value;
    const newNode = new NodeModel();
    newNode.type = 'folder';
    newNodeList.push(newNode);
    this._nodeList.next(newNodeList);
  }

  deleteNode(id: string) {
    const newNodeList = this._nodeList.value.filter(value => value.id !== id);
    this._nodeList.next(newNodeList);
  }

  updateNode(node: NodeModel) {
    const newNodeList = this._nodeList.value.map(value => {
      if (node.id === value.id) {
        return node;
      }
      return value;
    });
    this._nodeList.next(newNodeList);
  }
}
