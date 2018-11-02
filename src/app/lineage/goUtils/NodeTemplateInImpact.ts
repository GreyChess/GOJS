import * as go from 'gojs';

const goMaker = go.GraphObject.make;
const goBinding = go.Binding;
let mockIconSvg = 'M 9 6 h 2 V 5 h 3 v 3 h -3 V 7 H 9 v 0.643 L 11.593 10 H 14 v 3 h -3 v -2.188 L 7.907 8 H 6.093 L 3 10.812 V 13 H 0 v -3 h 2.407 L 5 7.643 V 7 H 3 v 1 H 0 V 5 h 3 v 1 h 2 v -0.643 L 2.407 3 H 0 V 0 h 3 v 2.188 L 6.093 5 h 1.814 L 11 2.188 V 0 h 3 v 3 h -2.407 L 9 5.357 V 6 Z';

export class NodeTemplateInImpact {

  constructor() {

  }

  getGroupNodeTemplate() {
    const self = this;
    return goMaker(go.Group,
      'Vertical',
      goMaker(go.Panel, 'Auto',
        goMaker(go.Shape,
          'RoundedRectangle', {
            fill: 'white',
            width: 150,
            height: 90
          }),
        self.getIconContainer(go.Spot.TopLeft),
        self.getTextBlock(go.Spot.TopCenter),
        goMaker(go.Placeholder,
          'Vertical',
          {
            padding: 5,
            alignment: go.Spot.Bottom
          })
      ),
    );
  }

  getNodeTemplate() {
    const self = this;
    return goMaker(go.Node,
      'Auto',
      goMaker(go.Shape,
        'RoundedRectangle', {
          fill: 'yellow',
          height: 39,
          width: 120
        }),
      self.getIconContainer(go.Spot.Left),
      self.getTextBlock(go.Spot.Center)
    );
  }

  private getIconContainer(alignment) {
    return goMaker(go.Shape,
      {
        geometryString: mockIconSvg,
        desiredSize: new go.Size(13, 13),
        fill: 'black',
        alignment: alignment,
        margin: 5,
        strokeWidth: 0.2,
        stroke: 'black'
      }
    );
  }

  private getTextBlock(alignment) {
    return goMaker(go.TextBlock, {
        overflow: go.TextBlock.OverflowEllipsis,
        height: 13,
        alignment: alignment
      },
      new goBinding('text', 'text')
    );
  }
}
