import { HistogramConfig } from './HistogramConfig';
import { Section } from '../Section';
import { Filter } from 'src/peripleo/state';

const DEFAULT_CONFIG: HistogramConfig = {

  backgroundColor: '#fff',

  gap: 2,

  maxBars: 120,

  rgba: [90, 139, 216],

  cursor: '#fb4040'

}

const fillDefaults = (config?: HistogramConfig) => ({
  ...(config || {}),
  ...DEFAULT_CONFIG
});

const chunkArray = <T extends unknown>(arr: T[], n: number): T[][] => {
  const chunkedArrays = [];

  for (let i = 0; i < arr.length; i += n) {
    chunkedArrays.push(arr.slice(i, i + n));
  }

  return chunkedArrays;
}

export const createRenderer = (canvas: HTMLCanvasElement, sections: Section[], config?: HistogramConfig) => {
  const conf = fillDefaults(config);

  const width = 2 * canvas.offsetWidth;
  const height = 2 * canvas.offsetHeight;

  canvas.width= width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  // console.log(sections);

  // Number of buckets to render as histogram bars
  const maxBuckets = Math.min(sections.length, conf.maxBars);

  // Number of buckets and sections per bucket. (Last bucket will have fewer sections!)
  const sectionsPerBucket = maxBuckets ? Math.ceil(sections.length / maxBuckets) : 0;

  const buckets = chunkArray(sections, sectionsPerBucket);

  // Width of each bar (=one bucket) in pixels
  const barWidth = Math.max(1, Math.round(width / (buckets.length - 1) - conf.gap));

  // Number of placenames in each bucket (1 or more sections!)
  const bucketValues = buckets.map(sections => sections.reduce((val, { placenames }) => val + placenames.length, 0));

  // Highest bucket + Y-scaling factor
  const maxValue = Math.max(...bucketValues);
  const k = height / maxValue;

  // Filters the count for bucket with the given index by tag
  const filterBucketByTag = (idx: number, tag: string) =>
    buckets[idx].reduce((count, section) => {
      const elementsWithTag = section.placenames
        .filter(el => el.getAttribute('ana')?.includes(tag))

      return count + elementsWithTag.length;
    }, 0);

  // console.log(`${sections.length} sections. Drawing ${buckets.length} bars with ${sectionsPerBucket} sections each`);
  // console.log(`Bucket width in pixel: ${barWidth} (${conf.gap} gap)`);
  // console.log(`Maximum bucket value is ${maxValue}`);

  const render = (cursor: number = 0, filters: Filter[] = []) => {
    const filterByTag = filters.find(f => f.name === 'tag')?.value;

    ctx.fillStyle = conf.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  
    // Cursor number refers to the section. Determine
    // which bucket number this correpsonds to
    const cursorPosition = Math.round(cursor / sectionsPerBucket);

    bucketValues.forEach((val, idx) => {
      const height = val * k;

      const [r, g, b] = conf.rgba;

      const createGradient = (h: number) => {
        const gradient = ctx.createLinearGradient(
          idx * (barWidth + conf.gap), canvas.height - h,
          idx * (barWidth + conf.gap), canvas.height
        );

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`); 
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.65)`);

        return gradient;
      };

      if (filterByTag) {
        // Semi-transparent bars with full height
        ctx.fillStyle =`rgba(${r}, ${g}, ${b}, 0.3)`;
        ctx.fillRect(idx * (barWidth + conf.gap), canvas.height - height, barWidth, height);  

        // Full-color bars at filtered height
        const filteredHeight = filterBucketByTag(idx, filterByTag);

        if (filteredHeight > 0 || cursorPosition === idx) {
          ctx.fillStyle = idx === cursorPosition ? conf.cursor : createGradient(filteredHeight);
          const h = idx === cursorPosition ? height : filteredHeight;
          ctx.fillRect(idx * (barWidth + conf.gap), canvas.height - h, barWidth, h);  
        }
      } else {
        ctx.fillStyle = idx === cursorPosition ? conf.cursor : createGradient(height);;
        ctx.fillRect(idx * (barWidth + conf.gap), canvas.height - height, barWidth, height);  
      }      
    });
  }

  return { render };

}