import {NodeModel} from '../dataModel/nodeModel';

export const DEMONODES: NodeModel[] = [
  {
    key: '1',
    contentType: 'a',
    text: 'node001',
    icon: null,
    to: [{type: 'Parent', target: '2'},
      {type: 'Associated', target: '3'},
      {type: 'Synonymous', target: '4'},
      {type: 'Parent', target: '5'},
    ]
  },
  {
    key: '2',
    contentType: 'b',
    text: 'node002',
    icon: null
  },
  {
    key: '3',
    contentType: 'c',
    text: 'node003',
    icon: null,
    group: '5'
  },
  {
    key: '4',
    contentType: 'd',
    text: 'node004',
    icon: null,
    group: '5',
    to: [{type: 'Synonymous', target: '7'}]
  },
  {
    key: '5',
    contentType: 'e',
    text: 'node005',
    icon: null,
    to: [{type: 'Synonymous', target: '6'}],
    isGroup: true
  },
  {
    key: '6',
    contentType: 'f',
    text: 'node006',
    icon: null
  },
  {
    key: '7',
    contentType: 'g',
    text: 'node007',
    icon: null
  },

];
