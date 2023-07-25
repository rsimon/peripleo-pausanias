import json
import xml.etree.ElementTree as ET

LINKED_PLACES_INPUT = './pleiades-all-places.lp.json'

TEI_INPUT = '../../public/sample.tei.xml'

with open(LINKED_PLACES_INPUT, 'r') as lp:
  print('Loading places')

  fc = json.load(lp)

  print('Loading TEI')

  tree = ET.parse(TEI_INPUT)
  tei = tree.getroot()
  ns = { 'tei': 'http://www.tei-c.org/ns/1.0' }

  referenced_places = set([el.attrib['{http://www.w3.org/XML/1998/namespace}id'] for el in tei.findall('.//tei:listPlace/', ns)])

  print('Filtering')

  filtered_places = [p for p in fc['features'] if p['@id'].replace('https', 'http') in referenced_places]

  print('Keeping ' + str(len(filtered_places)) + ' of ' + str(len(fc['features'])) + ' places')

  with open('pleiades-referenced-places.lp.json', 'w') as outfile:
    json.dump({
      'type': 'FeatureCollection',
      'features': filtered_places
    }, outfile)