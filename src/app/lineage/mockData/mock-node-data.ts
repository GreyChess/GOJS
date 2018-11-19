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
    isGroup: true,
    hasList: false
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
    icon: null,
    items:
      [
        { text: "Aa", value: 1 },
        { text: "Bb", value: 2 },
        { text: "Cc", value: 3 },
        { text: "Dd", value: 4 },
        { text: "Ee", value: 5 },
        { text: "Ff", value: 6 },
        { text: "Gg", value: 7 },
        { text: "Hh", value: 8 },
        { text: "Ii", value: 9 },
        { text: "Jj", value: 10 },
        { text: "Kk", value: 11 },
        { text: "Ll", value: 12 },
        { text: "Mm", value: 13 },
        { text: "Nn", value: 14 }
      ],
    isGroup: true
  },

];
