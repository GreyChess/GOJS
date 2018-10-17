import {GoJSDiagram} from './IGoJDDiagram';
import * as go from 'gojs';

type Color = string;
let goMaker: Function = go.GraphObject.make;
let mockIconSvg = 'M 9 6 h 2 V 5 h 3 v 3 h -3 V 7 H 9 v 0.643 L 11.593 10 H 14 v 3 h -3 v -2.188 L 7.907 8 H 6.093 L 3 10.812 V 13 H 0 v -3 h 2.407 L 5 7.643 V 7 H 3 v 1 H 0 V 5 h 3 v 1 h 2 v -0.643 L 2.407 3 H 0 V 0 h 3 v 2.188 L 6.093 5 h 1.814 L 11 2.188 V 0 h 3 v 3 h -2.407 L 9 5.357 V 6 Z';

export class NodeTemplates {
  get gojsDiagram(): GoJSDiagram {
    return this._gojsDiagram;
  }

  set gojsDiagram(value: GoJSDiagram) {
    this._gojsDiagram = value;
  }

  private _gojsDiagram: GoJSDiagram;

  private _onClick: Function = ()=>{};
  private _onMouseHoverNode: Function = ()=>{};
  private _onMouseLeave: Function = ()=>{};

  constructor(){

  }

  public getNodeTemplateMap(): go.Map<string, go.Node> {
    let templateMap: go.Map<string, go.Node> = new go.Map<string, go.Node>();
    let normalNodeTemplate = this.getTemplate(this.createDefaultIconContainer(), this.createDefaultSelectionIndicator());
    templateMap.add('', normalNodeTemplate);
    return templateMap;
  }

  private createDefaultIconContainer() {
    let self = this;
    let indicatorCornerRadius: number = 3;
    let props: Map<string, any> = new Map<string, any>();
    props.set('parameter1', indicatorCornerRadius);

    return self.createContainer('RoundedRectangle', props, self.createDefaultIcon());
  }

  private createDefaultSelectionIndicator() {
    let indicatorCornerRadius = 3;
    return goMaker(
      go.Adornment,
      'Auto',
      {
        layerName: 'Background'
      },
      goMaker(go.Shape, 'RoundedRectangle', {
        parameter1: indicatorCornerRadius,
        fill: null,
        stroke: 'rgba(0,0,0,0)'
      }),
      goMaker(go.Placeholder)
    );
  }

  private createDefaultIcon() {
    //need svg icons

    return goMaker(
      go.Shape,
      {
        geometryString: mockIconSvg,
        desiredSize: new go.Size(40, 40),
        scale: 1.75,
        fill: '#fff',
        strokeWidth: 0
      },
      new go.Binding('geometryString', 'contentType', function (type) {
        //need to handle the real type.
        return mockIconSvg;
      })
    );
  }

  private createContainer(shape: string, props: Map<string, any>, iconHolder) {
    let self = this;
    let width = 40;
    let height = 40;
    let panelFill: Color = '#fff';
    let textBlockStroke: Color = '#646464';
    let nodeOutlineInSelect: Color = '#000';
    let nodeOutlineInFocus: Color = '#000';

    let containerProps = {
      name: 'ICON_CONTAINER',
      isPanelMain: true,
      width: width,
      height: height
    };

    let selIndicatorProps = {
      fill: null,
      strokeWidth: 1,
      width: width + 5,
      height: height + 5
    };

    if (props) {
      props.forEach(function (value: any, key: string) {
        containerProps[key] = props[key];
        selIndicatorProps[key] = props[key];
      });
    }

    let textBlockWorkload = {
      overflow: go.TextBlock.OverflowEllipsis,
      height: 12,
      wrap: go.TextBlock.None,
      stroke: textBlockStroke
    };

    let mouseBehavior = {
      click: self._onClick,
      mouseHover: self._onMouseHoverNode,
      mouseLeave: self._onMouseLeave
    };

    let containerOutline = goMaker(go.Shape,
      shape,
      containerProps
      // new go.Binding("stroke", "", jQuery.proxy(self.getStrokeColor, self)),
      // new go.Binding("fill", "", self.getFillColor)
    );

    let selectedOutline = goMaker(go.Shape,
      shape,
      selIndicatorProps
      // new go.Binding("strokeDashArray", "", function(node) {
      //   if (node.isSelected) {
      //     return null;
      //   } else if (node.data.isFocus) {
      //     return [4, 4]
      //   }
      // }).ofObject(""),
      // new go.Binding("stroke", "", function(node) {
      //   if (node.isSelected) {
      //     return nodeOutlineInSelect;
      //   } else if (node.data.isFocus) {
      //     return nodeOutlineInFocus;
      //   } else return "rgba(0,0,0,0)";
      // }).ofObject(""),
      // new go.Binding("strokeWidth", "", function(node){
      //   let result = 1.5;
      //   if(node.isSelected && node.data.isFocus){
      //     result = 3;
      //   }
      //   return result;
      // }).ofObject("")
    );

    let contentOutline = goMaker(go.Shape,
      'Rectangle',
      {
        alignment: go.Spot.Bottom,
        alignmentFocus: go.Spot.Top,
        fill: 'green',
        stroke: null,
        width: 0,
        height: 8
      }
    );

    let textBlock = goMaker(
      go.TextBlock
      // new go.Binding('text', 'text')
    );
    return goMaker(go.Panel,
      'Spot',
      mouseBehavior,
      containerOutline,
      contentOutline,
      selectedOutline,
      textBlock,
      iconHolder
    );
  };

  private getTemplate(iconContainer: any, selectionIndicator: any, smallSize?: any) {
    let self = this;
    let nodeProperties = {
      'selectionChanged': function (obj) {
        // self.onSelectionChange(obj);
      },
      'portId': '',
      // "click": self.onMouseClickObject,
      'contextClick': function (event) {
        if (event.control) {
          event.targetObject.part.isSelected = true;
        }
      },
      'contextMenu': goMaker(go.Adornment),
      'locationSpot': go.Spot.Center,
      'locationObjectName': 'ICON_CONTAINER',
      'selectionObjectName': 'ICON_CONTAINER',
      'selectionAdornmentTemplate': selectionIndicator,
    };

    let iconLabelPanel = goMaker(
      go.Panel,
      'Vertical',
      iconContainer,
      self.createLabel()
    );

    let expandBtn = goMaker(
      go.Panel,
      'Vertical',
      {
        alignment: go.Spot.Top,
        width: 67
      }
    );
    return goMaker(
      go.Node,
      'Spot',
      nodeProperties,
      iconLabelPanel,
      expandBtn
    );
  }

  private createLabel() {
    let labelPanel = goMaker(
      go.Shape,
      'RoundedRectangle',
      {
        parameter1: 1,
        height: 20,
        stroke: null
      }
    );

    let textBlock = goMaker(
      go.TextBlock,
      new go.Binding('text', 'text')
    );

    return goMaker(
      go.Panel,
      'Auto',
      {
        alignment: go.Spot.Bottom,
        alignmentFocus: go.Spot.Top
      },
      labelPanel,
      textBlock
    );
  }
}
