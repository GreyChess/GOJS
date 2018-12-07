import {RelationshipModel} from './relationshipModel';

export class NodeModel {
  key: string;
  text: string;
  contentType: string;
  icon;
  to?: RelationshipModel[];
  group?: string;
  isGroup?: boolean;
  items?: any;
  hasList?: any;
  groupIsCollapsed?: boolean;
  isSubject?: boolean;
  leftExpandable?: boolean;
  rightExpandable?: boolean;
  category: string;
}
