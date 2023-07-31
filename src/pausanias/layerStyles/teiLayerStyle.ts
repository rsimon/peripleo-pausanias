export const teiLayerStyle = {
  'type': 'circle',
  'paint': {
    'circle-radius': [
      'interpolate',
      [ 'linear' ],
      ['get', 'occurrences' ],
      1, 5,
      5, 12
    ],
    'circle-stroke-width': 1,
    'circle-color': '#ff623b',
    'circle-stroke-color': '#8d260c'
  }
};