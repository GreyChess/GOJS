import {Injectable} from '@angular/core';
import {NodeModel} from '../dataModel/nodeModel';
import {DEMONODES} from '../mockData/mock-node-data';


@Injectable({
  providedIn: 'root'
})

export class RelationshipService {
  getArrayNodeInfo(): NodeModel[] {
    return DEMONODES;
  }
}
