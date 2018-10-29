import {RelationshipModel} from './relationshipModel';

export class NodeModel {
  key: string;
  text: string;
  contentType: string;
  icon;
  to?: RelationshipModel[];
}
