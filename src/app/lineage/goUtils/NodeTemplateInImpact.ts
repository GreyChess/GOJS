import * as go from 'gojs';
import {ScrollingTableFragment} from '../goComponent/scrollingTableFragment';
import {ParallelLayout} from '../goComponent/parallelLayout';
import {TreeLayout} from 'gojs';
import {CustomShape} from '../goComponent/customShape';

const goMaker = go.GraphObject.make;
const goBinding = go.Binding;
let mockIconSvg = 'M 9 6 h 2 V 5 h 3 v 3 h -3 V 7 H 9 v 0.643 L 11.593 10 H 14 v 3 h -3 v -2.188 L 7.907 8 H 6.093 L 3 10.812 V 13 H 0 v -3 h 2.407 L 5 7.643 V 7 H 3 v 1 H 0 V 5 h 3 v 1 h 2 v -0.643 L 2.407 3 H 0 V 0 h 3 v 2.188 L 6.093 5 h 1.814 L 11 2.188 V 0 h 3 v 3 h -2.407 L 9 5.357 V 6 Z';

enum NormalNode {
  WITH_LEFT_EXPANDBTN = 1,
  WITH_RIGHT_EXPANDBTN = 2,
  WITH_LEFT_RIGHT_EXPANDBTN = 3,
}

export class NodeTemplateInImpact {

  constructor() {
    ScrollingTableFragment.init();
    CustomShape.init();
  }

  getGroupNodeTemplate() {
    const self = this;
    return goMaker(go.Group,
      'Vertical',
      {
        layout: goMaker(<any>ParallelLayout,
          {
            layerStyle: TreeLayout.LayerUniform,
            layerSpacing: 50,
            alignment: TreeLayout.AlignmentStart
          }),
        selectionAdornmentTemplate: goMaker(go.Adornment, 'Auto', {
          layerName: 'Background'
        })
      },
      goMaker(go.Panel, 'Auto',
        {defaultRowSeparatorStroke: 'green'},
        goMaker(go.Shape, 'ImpactGroupNode', {
            strokeWidth: 2,
            stroke: '#DBDBDB',
            fill: 'white'
          }
          // new goBinding('fill', 'groupIsCollapsed', function (groupIsCollapsed) {
          //   return !groupIsCollapsed ? "red" : "#565656";
          // })
        ),
        goMaker(go.Panel, "Auto", {
            alignment: go.Spot.TopLeft,
            background: 'rgba(0,0,0,0)',
            portId: ''
          },
          goMaker(go.Shape,
            {
              desiredSize: new go.Size(140, 29),
              fill:"rgba(0,0,0,0)",
              strokeWidth: 0
            }
          ),
          self.getIconContainer(go.Spot.Left, new go.Margin(0, 0, 0, 10)),
          self.getTextBlock(go.Spot.Left, new go.Margin(0, 0, 0, 30)),
          self.getGroupExpandButton(go.Spot.Right, new go.Margin(0,5,0,0))
        ),
        goMaker(go.Placeholder,
          {
            padding: 5,
            margin: new go.Margin(28, 0, 0, 0),
            alignment: go.Spot.Left,
            areaBackground: 'rgba(0,0,0,0)'
          }
          // new goBinding('visible', 'groupIsCollapsed', function (groupIsCollapsed) {
          //   return !groupIsCollapsed;
          // })
        )
      )
    );
  }

  getNodeTemplateMap(): go.Map<string, go.Node> {
    let templateMap: go.Map<string, go.Node> = new go.Map<string, go.Node>();
    templateMap.add('SubjectNode', this.getNodeTemplate(NormalNode.WITH_LEFT_RIGHT_EXPANDBTN));
    templateMap.add('RightSideNode', this.getNodeTemplate(NormalNode.WITH_RIGHT_EXPANDBTN));
    templateMap.add('LeftSideNode', this.getNodeTemplate(NormalNode.WITH_LEFT_EXPANDBTN));
    return templateMap;
  }

  getNodeTemplate(normalNodeType: NormalNode) {
    const self = this;
    let extendButtonGroup = [];
    let leftMargin = 0,
      rightMargin = 0;
    switch (normalNodeType) {
      case NormalNode.WITH_LEFT_EXPANDBTN :
        extendButtonGroup = [self.getNormalExpandButton(go.Spot.Left)];
        leftMargin = 7;
        break;
      case NormalNode.WITH_RIGHT_EXPANDBTN :
        extendButtonGroup = [self.getNormalExpandButton(go.Spot.Right)];
        rightMargin = 7;
        break;
      case NormalNode.WITH_LEFT_RIGHT_EXPANDBTN :
        extendButtonGroup = [self.getNormalExpandButton(go.Spot.Left), self.getNormalExpandButton(go.Spot.Right)];
        leftMargin = rightMargin = 7;
        break;
    }

    return goMaker(go.Node,
      'Auto', {
        // selectionAdornmentTemplate: goMaker(go.Adornment, 'Auto', {
        //     layerName: 'Background'
        //   },
        //   goMaker(go.Shape, 'Rectangle', {
        //     fill: null,
        //     stroke: 'rgba(0,0,0,0)'
        //   }))
      },
      goMaker(go.Panel,
        'Auto',
        goMaker(go.Shape,
          'Rectangle', {
            stroke: '#005961',
            strokeWidth: 5,
            margin: new go.Margin(0, rightMargin, 0, leftMargin)
          },
          new goBinding('stroke', 'isSubject', function (isSubject) {
            return isSubject ? '#565656' : '#AEAA95';
          }),
          new goBinding('height', 'hasList', function (hasList) {
            return hasList ? 160 : 29;
          }),
          new goBinding('width', 'hasList', function (hasList) {
            return hasList ? 160 : 140;
          })
        ),
        goMaker(go.Panel, 'Vertical',
          goMaker(go.Panel, 'Auto',
            goMaker(go.Shape,
              'Rectangle', {
                height: 29,
                width: 140,
                strokeWidth: 0
              },
              new goBinding('fill', 'isSubject', function (isSubject) {
                return isSubject ? '#def1f3' : '#ECE9DF';
              })),
            self.getIconContainer(go.Spot.Left, new go.Margin(0, 0, 0, 10)),
            self.getTextBlock(go.Spot.Left, new go.Margin(0, 0, 0, 30)),
            self.getOverflowButton(go.Spot.Right)
          ),
          goMaker(go.Panel, self.getTableContainer())
        )
      ),
      extendButtonGroup
    );
  }

  private getIconContainer(alignment, margin: go.Margin = new go.Margin(0, 0, 0, 0)) {
    return goMaker(go.Shape,
      {
        geometryString: mockIconSvg,
        desiredSize: new go.Size(13, 13),
        // fill: '#45888f',
        alignment: alignment,
        margin: margin
      },
      new goBinding('stroke', 'isSubject', function (isSubject) {
        return isSubject ? '#45888f' : '#AAA48C';
      }),
      new goBinding('fill', 'isSubject', function (isSubject) {
        return isSubject ? '#45888f' : '#AAA48C';
      })
    );
  }

  private getTextBlock(alignment: go.Spot, margin: go.Margin = new go.Margin(0, 0, 0, 0)) {
    return goMaker(go.TextBlock, {
        overflow: go.TextBlock.OverflowEllipsis,
        height: 13,
        margin: margin,
        alignment: alignment,
        maxSize: new go.Size(90, 20)
      },
      new goBinding('text', 'text'),
      new goBinding('stroke', 'isSubject', function (isSubject) {
        return isSubject ? '#45888f' : '#AAA48C';
      })
    );
  }

  private getGroupExpandButton(alignment, margin: go.Margin = new go.Margin(0, 0, 0, 0)) {
    let desiredWidth = 6;
    let desiredHeight = 8;
    return goMaker(go.Panel, {alignment: alignment},
      goMaker(go.Shape, {
          alignment: alignment,
          desiredSize: new go.Size(desiredWidth, desiredHeight),
          stroke: 'black',
          margin: margin
        },
        new goBinding('figure', 'groupIsCollapsed', function (showContent) {
          return showContent ? 'ImpactGroupNodeExpandBtnUp' : 'ImpactGroupNodeExpandBtnDown';
        }),
        new goBinding('stroke', 'isSubject', function (isSubject) {
          return isSubject ? '#45888f' : '#AAA48C';
        })
      ),
      goMaker(go.Shape, {
        figure: 'Rectangle',
        desiredSize: new go.Size(desiredWidth + 1, desiredHeight + 1),
        fill: 'rgba(0,0,0,0)',
        strokeWidth: 0,
        click: function (targetEvent) {
          let preIsSubGraphExpanded = targetEvent.targetObject.part.isSubGraphExpanded;
          targetEvent.targetObject.part.isSubGraphExpanded = !preIsSubGraphExpanded;
          targetEvent.targetObject.part.data.groupIsCollapsed = !targetEvent.targetObject.part.data.groupIsCollapsed;
          targetEvent.targetObject.part.updateTargetBindings('groupIsCollapsed');
        }
      })
    );
  }

  private getOverflowButton(alignment) {
    return goMaker(go.Panel,
      {
        alignment: alignment,
        margin: new go.Margin(0, 8, 0, 0)
      },
      goMaker(go.Shape, {
        figure: 'OverflowInVertical',
        desiredSize: new go.Size(18, 18),
        stroke: '#257379',
        strokeWidth: 1.5,
      }),
      goMaker(go.Shape, {
        figure: 'Rectangle',
        desiredSize: new go.Size(10, 15),
        fill: 'rgba(0,0,0,0)',
        strokeWidth: 0,
        position: new go.Point(4, 2),
        click: function (targetEvent) {
          console.log('overflowbtn----------pressed');
        }
      })
    );

  }

  private getNormalExpandButton(alignment) {
    let expandable = alignment == go.Spot.Right ? 'rightExpandable' : 'leftExpandable';
    return goMaker(go.Panel,
      {
        alignment: alignment
      },
      new goBinding('visible', expandable),
      goMaker(go.Shape, {
        figure: 'Circle',
        strokeWidth: 1,
        width: 15,
        height: 15,
        fill: 'white',
        stroke: '#4e4e4d',
        click: function (targetEvent) {
          console.log('collapse');
        }
      }),
      goMaker(
        go.Shape, {
          figure: 'PlusLine',
        },
        new go.Binding('figure', 'isExpanded', function (isExp: boolean) {
          return isExp ? 'MinusLine' : 'PlusLine';
        }), {
          desiredSize: new go.Size(9.2, 9.2),
          stroke: '#4e4e4d',
          strokeWidth: 2.2,
          position: new go.Point(2.1, 2.1)
        }
      )
    );
  }

  private getTableContainer() {
    let self = this;
    let content = goMaker(go.Panel, 'Auto',
      new goBinding('visible', 'hasList', function (hasList) {
        return hasList == true;
      }),
      goMaker('ScrollingTable',
        {
          name: 'SCROLLER',
          desiredSize: new go.Size(NaN, 100),  // fixed width
          stretch: go.GraphObject.Fill,       // but stretches vertically
          defaultColumnSeparatorStrokeWidth: 0.5,
        },
        new goBinding('TABLE.itemArray', 'items'),
        {
          'TABLE.itemTemplate':
            goMaker(
              go.Panel, 'TableRow', {
                defaultStretch: go.GraphObject.Horizontal,
                fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides,
                fromLinkable: true, toLinkable: true
              },
              new goBinding('portId', 'text'),
              goMaker(go.Panel, 'Horizontal',
                {
                  column: 0,
                  height: 20,
                  width: 80
                },
                self.getIconContainer(go.Spot.Left),
                self.getTextBlock(go.Spot.Center)),
            ),
          'TABLE.defaultColumnSeparatorStroke': 'gray',
          'TABLE.defaultColumnSeparatorStrokeWidth': 0.5,
          // "TABLE.defaultRowSeparatorStroke": "gray",
          // "TABLE.defaultRowSeparatorStrokeWidth": 0.5,
          'TABLE.defaultSeparatorPadding': new go.Margin(1, 3, 0, 3)
        }
      )
    );
    return content;
  }
}
