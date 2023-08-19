export interface PointStyle {

  radius?: number;

  color?: string;

}

export const circle = (style: PointStyle) => ({
  'type': 'circle',
  'paint': {
    'circle-radius': style?.radius || 4,
    'circle-color': style?.color || '#fff',
    'circle-stroke-color': '#000',
    'circle-stroke-width': 1
  }
});

export interface ShapeStyle {

  fill?: string;

  opacity?: number;

}

export const colorFill = (style: ShapeStyle) => ({
  'type': 'fill',
  'paint': {
    'fill-color': style?.fill || '#ff623b',
    'fill-opacity': style?.opacity || 0.15
  }
});