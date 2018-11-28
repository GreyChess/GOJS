import * as go from 'gojs';
import {GoJSDiagram} from './IGoJDDiagram';
import {ParallelLayout} from '../goComponent/parallelLayout';
import {TreeLayout} from 'gojs';


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
        layout: goMaker(<any>ParallelLayout,
          {
            layerStyle: TreeLayout.LayerUniform,
            layerSpacing: 50
          }),
        SelectionMoved: function (e) {
          e.diagram.layout.invalidateLayout();
        }
      }
    );
    return netDiagram;
  }
}
