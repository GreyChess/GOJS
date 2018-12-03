import * as go from 'gojs';

export class ShapeOverFlow {
  static init() {
    go.Shape.defineFigureGenerator('OverflowInVertical', function (shape, width, height) {
      let geo = new go.Geometry();
      let fig = new go.PathFigure(0, 0, false);
      geo.add(fig);

      fig.add(new go.PathSegment(go.PathSegment.Move, 0.5 * width, 2 / 9 * height));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0.5 * width, 3 / 9 * height));
      fig.add(new go.PathSegment(go.PathSegment.Move, 0.5 * width, 4 / 9 * height));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0.5 * width, 5 / 9 * height));
      fig.add(new go.PathSegment(go.PathSegment.Move, 0.5 * width, 6 / 9 * height));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0.5 * width, 7 / 9 * height));
      return geo;
    });
  }
}
