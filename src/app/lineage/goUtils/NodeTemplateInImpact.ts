import * as go from 'gojs';
import {ScrollingTableFragment} from '../goComponent/scrollingTableFragment';
import {ParallelLayout} from '../goComponent/parallelLayout';
import {TreeLayout} from 'gojs';

const goMaker = go.GraphObject.make;
const goBinding = go.Binding;
let mockIconSvg = 'M 9 6 h 2 V 5 h 3 v 3 h -3 V 7 H 9 v 0.643 L 11.593 10 H 14 v 3 h -3 v -2.188 L 7.907 8 H 6.093 L 3 10.812 V 13 H 0 v -3 h 2.407 L 5 7.643 V 7 H 3 v 1 H 0 V 5 h 3 v 1 h 2 v -0.643 L 2.407 3 H 0 V 0 h 3 v 2.188 L 6.093 5 h 1.814 L 11 2.188 V 0 h 3 v 3 h -2.407 L 9 5.357 V 6 Z';

export class NodeTemplateInImpact {

  constructor() {
    ScrollingTableFragment.init();
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
          })
      },
      goMaker(go.Panel, 'Auto',
        goMaker(go.Shape,
          'RoundedRectangle', {
            fill: '#565656',
            stroke: 'white'
          }),
        goMaker(go.Panel, 'Horizontal', {
            alignment: go.Spot.TopLeft,
            desiredSize: new go.Size(115, 39),
          },
          self.getIconContainer(go.Spot.Left),
          self.getTextBlock(go.Spot.Center),
          self.getGroupExpandButton(go.Spot.Right),
        ),
        goMaker(go.Placeholder,
          {
            padding: 5,
            margin: new go.Margin(30, 0, 0, 0),
            alignment: go.Spot.Left
          })
      ),
    );
  }

  getNodeTemplate() {
    const self = this;
    return goMaker(go.Node,
      'Auto',
      goMaker(go.Panel,
        'Auto',
        goMaker(go.Shape,
          'RoundedRectangle', {
            fill: '#565656',
            stroke: 'white',
            margin: new go.Margin(0,7,0,0)
          },
          new goBinding('height', 'hasList', function (hasList) {
            return hasList ? 160 : 39;
          }),
          new goBinding('width', 'hasList', function (hasList) {
            return hasList ? 130 : 115;
          })
        ),
        goMaker(go.Panel, 'Vertical',
          goMaker(go.Panel, 'Auto',
            goMaker(go.Shape,
              'RoundedRectangle', {
                // fill: 'yellow',
                fill: '#565656',
                height: 39,
                width: 115,
                strokeWidth: 0
              }),
            self.getIconContainer(go.Spot.Left),
            self.getTextBlock(go.Spot.Center)
          ),
          goMaker(go.Panel, self.getTableContainer())
        )
      ),
      self.getNormalExpandButton(go.Spot.Right)
    );
  }

  private getIconContainer(alignment) {
    return goMaker(go.Shape,
      {
        geometryString: mockIconSvg,
        desiredSize: new go.Size(13, 13),
        fill: 'white',
        alignment: alignment,
        margin: new go.Margin(0,5,0,5),
        strokeWidth: 0.2,
        stroke: 'white'
      }
    );
  }

  private getTextBlock(alignment) {
    return goMaker(go.TextBlock, {
        overflow: go.TextBlock.OverflowEllipsis,
        height: 13,
        alignment: alignment,
        stroke: 'white'
      },
      new goBinding('text', 'text')
    );
  }

  private getGroupExpandButton(alignment) {
    return goMaker(go.Shape, {
        alignment: alignment,
        desiredSize: new go.Size(13, 13),
        stroke: 'white',
        figure: 'LogicAnd',
        click: function (targetEvent) {
          let preIsSubGraphExpanded = targetEvent.targetObject.part.isSubGraphExpanded;
          targetEvent.targetObject.part.isSubGraphExpanded = !preIsSubGraphExpanded;
          targetEvent.targetObject.part.data.groupIsCollapsed = !targetEvent.targetObject.part.data.groupIsCollapsed;
          targetEvent.targetObject.part.updateTargetBindings('groupIsCollapsed');
        }
      },
      new goBinding('figure', 'groupIsCollapsed', function (showContent) {
        return showContent ? 'LogicOr' : 'LogicAnd';
      })
    );
  }

  private getNormalExpandButton(alignment) {
    return goMaker(go.Panel,
      {
        alignment: alignment
      },
      goMaker(go.Shape, {
        figure: 'Circle',
        strokeWidth: 1,
        width: 15,
        height: 15,
        fill: 'white',
        click: function(targetEvent){
          console.log("collapse");
        }
      }),
      goMaker(
        go.Shape, {
          figure: 'PlusLine'
        },
        new go.Binding('figure', 'isExpanded', function (isExp: boolean) {
          return isExp ? 'MinusLine' : 'PlusLine';
        }), {
          desiredSize: new go.Size(11, 11),
          stroke: 'grey',
          strokeWidth: 2,
          position: new go.Point(1.5, 1.5)
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
