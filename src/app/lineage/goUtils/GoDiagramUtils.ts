import * as go from 'gojs';
import {GoJSDiagram} from './IGoJDDiagram';


export class GoDiagramUtils {
  public static createDiagram(placeHolderId: string, initScale: number = 1) {
    let goMaker = go.GraphObject.make;
    let netDiagram: GoJSDiagram = <GoJSDiagram> goMaker(
      go.Diagram,
      placeHolderId,
      {
        allowCopy: false,
        allowDelete: false,
        allowDrop: false,
        allowInsert: false,
        // initialAutoScale: isAutoScale ? go.Diagram.None : go.Diagram.Uniform,
        initialScale: initScale,
        initialContentAlignment: go.Spot.Center,
        // initialPosition: initPosition,
        mouseWheelBehavior: go.ToolManager.WheelNone,
        maxScale: 2,
        minScale: 0.25,
        scrollMode: go.Diagram.InfiniteScroll,
        autoScrollRegion: 10,
        SelectionMoved: function (e) {
          e.diagram.layout.invalidateLayout();
        }
      }
    );
    return netDiagram;
  }
}
