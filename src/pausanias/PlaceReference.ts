import { Item, Trace } from '../peripleo/Types';

interface PlaceReference {

  quote: string;

  tags: string[];

}

export const teiToTrace = (elements: Element[]): Trace<PlaceReference> => ({
  id: 'Pausanias',

  items: elements.map(el => {
    // Anotation ID
    const id = el.getAttribute('xml:id');

    // Place URI
    const ref = el.getAttribute('ref');

    const ana = el.getAttribute('ana');
    const tags = ana ? ana.split(' ') : [];

    return {
      id,
      type: 'Annotation',
      target: {
        type: 'Dataset',
        value: { 
          quote: el.textContent,
          tags
        }
      },
      body: ref ? {
        type: 'Dataset',
        value: [{ 
          id: ref 
        }]
      } : undefined
    }
  }).filter(i => i.body) as Item<PlaceReference>[]

});
