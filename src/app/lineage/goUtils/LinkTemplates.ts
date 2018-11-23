import * as go from 'gojs';

type Color = string;
const goMaker: Function = go.GraphObject.make;
const GOBinding = go.Binding;

export class LinkTemplates {
  public getLinkTempLate() {
    let self = this;
    let borderColor: Color = 'yellow';
    let textStroke: Color = '#3D4550';
    // let textBorder: Color = "#EAF6FF";
    // let textBlockStroke: Color = "#0378CD";

    return goMaker(
      go.Link,
      {
        // layerName: 'Background',
        toEndSegmentLength: 50,
        fromEndSegmentLength: 50,
        curve: go.Link.Bezier,
        selectionChanged: () => {
        },
        contextMenu: goMaker(go.Adornment),
        mouseHover: () => {
        },
        mouseLeave: () => {
        },
        click: () => {
        },
        selectionAdornmentTemplate: goMaker(
          go.Adornment, {
            mouseHover: () => {
            }
          },
          goMaker(
            go.Shape, {
              isPanelMain: true,
            },
            // new GOBinding("strokeDashArray", "type", self.getLineDash),
            new GOBinding('stroke', 'type', self.getLinkColor)
          ),
          goMaker(
            go.Shape, {
              toArrow: 'Triangle',
              stroke: null,
              scale: 1.4
            },
            // new GOBinding("visible", "type", self.isHasArrow),
            new GOBinding('fill', 'type', self.getLinkColor)
          )
        )
      },
      goMaker(go.Shape,
        new GOBinding('stroke', 'type', self.getLinkColor),
        new GOBinding('strokeWidth', '', function (data) {
          let width = 2;
          if (data.isSelected || data.data.isHighlighted || data.data.isFocus)
            width = 6;
          return width;
        }).ofObject('')
      ),
      goMaker(go.Shape, {
          toArrow: 'Triangle',
          stroke: null,
          scale: 1.4
        },
        new GOBinding('fill', 'type', self.getLinkColor)
      ),
      goMaker(
        go.Panel, 'Auto', {
          segmentOffset: new go.Point(0, 0),
          segmentOrientation: go.Link.OrientUpright
        },
        goMaker(go.Shape,
          'Border',
          {
            stroke: null,
            fill: borderColor,
          }
        ),
        goMaker(go.TextBlock, {
          stroke: textStroke,
          margin: 4,
          visible: false
        })
      ),
      new GOBinding('toShortLength', 'type', self.getLinkShortLength)
    );
  }

  private getLinkShortLength(type: string) {
    return 5;
  }

  private getLinkColor(type: string): any {
    let linkDefaultColor: Color = '#81275c';
    let color: Color = '#0a9e69';
    switch (type) {
      case 'Equivalent':
        color = '#1b1b1b';
        break;
      case 'Contains':
        color = '#d5a51c';
        break;
      case 'Synonymous':
        color = '#d86100';
        break;
      case 'Parent':
        color = '#21408a';
        break;
      case 'Dependent':
        color = '#b4b4b4';
        break;
      case 'Associated':
        color = '#b4b4b4';
        break;
      default:
        color = linkDefaultColor;
        break;
    }
    return color;
  }

}
