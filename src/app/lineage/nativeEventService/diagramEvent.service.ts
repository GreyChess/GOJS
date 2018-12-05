import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NodeModel} from '../dataModel/nodeModel';

@Injectable({
  providedIn: 'root'
})
export class DiagramEventService {
  private nodeOnSelect: Subject<any>;
  nodeOnSelectStatus$: Observable<any>;

  constructor() {
    const self = this;
    self.nodeOnSelect = new Subject();
    self.nodeOnSelectStatus$ = self.nodeOnSelect.asObservable();
  }

  handleNodeOnSelect(arraySelectedNode: NodeModel[]) {
    if (arraySelectedNode.length == 1) {
      this.nodeOnSelect.next(arraySelectedNode[0]);
    } else {

    }
  }
}
