import csv
import json
import pandas as pd

INPUT_FILE = './pleiades-gis-places.csv.gz'

df = pd.read_csv(INPUT_FILE, compression='gzip', quoting=csv.QUOTE_MINIMAL)

def to_feature(row):
  feature = {
    '@id': row['uri'],
    'type': 'Feature',
    'properties': {
      'title': row['title']
    }
  }

  if not pd.isna(row['description']):
    feature['properties']['description'] = row['description']

  if not pd.isna(row['representative_longitude']):
    feature['geometry'] = {
      'type': 'Point',
      'coordinates': [row['representative_longitude'], row['representative_latitude']]
    }

  return feature

geojson = {
  'type': 'FeatureCollection',
  'features': list([ to_feature(row) for idx, row in df.iterrows() ])
}

with open('pleiades-all-places.json', 'w') as outfile:
  json.dump(geojson, outfile)