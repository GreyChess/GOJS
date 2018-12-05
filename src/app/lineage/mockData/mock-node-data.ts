import {NodeModel} from '../dataModel/nodeModel';

export const DEMONODES: NodeModel[] = [
  {
    key: '1',
    contentType: 'a',
    text: 'node001_111111111111111111111111111',
    icon: null,
    to: [{type: 'Parent', target: '2'},
      {type: 'Associated', target: '3'},
      {type: 'Synonymous', target: '4'},
      {type: 'Parent', target: '5'},
    ],
    hasList: false,
    isSubject: true
  },
  {
    key: '2',
    contentType: 'b',
    text: 'node002',
    icon: null,
    to: [{type: "Parent", target: "7", toPort: "ColumnGg"}],
    hasList: false,
    isSubject: false
  },
  {
    key: '3',
    contentType: 'c',
    text: 'node003',
    icon: null,
    group: '5',
    hasList: false,
    to: [{type: "Parent", target: "2"}],
    isSubject: false
  },
  {
    key: '4',
    contentType: 'd',
    text: 'Group004_7777777777777777777777',
    icon: null,
    group: '5',
    to: [{type: 'Synonymous', target: '7'}],
    hasList: false,
    isGroup: true,
    groupIsCollapsed: false,
    isSubject: false
  },
  {
    key: '5',
    contentType: 'e',
    text: 'Group005',
    icon: null,
    to: [{type: 'Synonymous', target: '6'}],
    isGroup: true,
    hasList: false,
    groupIsCollapsed: false,
    isSubject: false
  },
  {
    key: '6',
    contentType: 'f',
    text: 'node006',
    icon: null,
    hasList: false,
    isSubject: false
  },
  {
    key: '7',
    contentType: 'g',
    text: 'Table',
    icon: null,
    items:
      [
        { text: "ColumnAa", value: 1 },
        { text: "ColumnBb", value: 2 },
        { text: "ColumnCc", value: 3 },
        { text: "ColumnDd", value: 4 },
        { text: "ColumnEe", value: 5 },
        { text: "ColumnFf", value: 6 },
        { text: "ColumnGg", value: 7 },
        { text: "ColumnHh", value: 8 },
        { text: "ColumnIi", value: 9 },
        { text: "ColumnJj", value: 10 },
        { text: "ColumnKk", value: 11 },
        { text: "ColumnLl", value: 12 },
        { text: "ColumnMm", value: 13 },
        { text: "ColumnNn", value: 14 }
      ],
    isGroup: false,
    group: "10",
    hasList: true,
    isSubject: false
  },
  {
    key: '8',
    contentType: 'f',
    text: 'node008',
    icon: null,
    hasList: false,
    group: "4",
    to: [{type: 'Synonymous', target: '9'}],
    isSubject: false
  },
  {
    key: '9',
    contentType: 'f',
    text: 'node009',
    icon: null,
    hasList: false,
    group: "4",
    isSubject: false
  },
  {
    key: '10',
    contentType: 'f',
    text: 'Group010',
    icon: null,
    hasList: false,
    isGroup: true,
    groupIsCollapsed: false,
    isSubject: false
  }

];
