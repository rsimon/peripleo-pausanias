import { HistogramConfig } from './HistogramConfig';
import { Section } from './Section';

const DEFAULT_CONFIG: HistogramConfig = {

  backgroundColor: '#fff',

  maxBars: 100

}

const fillDefaults = (config: HistogramConfig) => ({

  backgroundColor: config.backgroundColor || DEFAULT_CONFIG.backgroundColor,

  maxBars: config.maxBars || DEFAULT_CONFIG.maxBars

});

const chunkArray = <T extends unknown>(arr: T[], n: number): T[][] => {
  const chunkedArrays = [];

  for (let i = 0; i < arr.length; i += n) {
    chunkedArrays.push(arr.slice(i, i + n));
  }

  return chunkedArrays;
}

export const renderHistogram = (canvas: HTMLCanvasElement, sections: Section[], config?: HistogramConfig) => {
  const conf = fillDefaults(config || {});

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = conf.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // console.log(sections);

  // Number of buckets to render as histogram bars
  const maxBuckets = Math.min(sections.length, conf.maxBars);

  // Number of buckets and sections per bucket. (Last bucket will have fewer sections!)
  const sectionsPerBucket = maxBuckets ? Math.ceil(sections.length / maxBuckets) : 0;

  const buckets = chunkArray(sections, sectionsPerBucket);

  // Number of placenames in each bucket (1 or more sections!)
  const bucketValues = buckets.map(sections => sections.reduce((val, { placenames }) => val + placenames.length, 0));

  // Highest bucket
  const maxValue = Math.max(...bucketValues);

  console.log(`${sections.length} sections. Drawing ${buckets.length} bars with ${sectionsPerBucket} sections each`);
  console.log(`Maximum bucket value is ${maxValue}`);


  /*
  const bars = annotationsBySection.reduce((resampled, obj) => {
    ctr += 1;
    if (ctr < RESAMPLE) {
      return [...resampled, obj ];
    } else {
      ctr = 0;

      const head = [...resampled.slice(0, resampled.length - 1)];
      const last = resampled[resampled.length - 1];
      
      const agg = {
        section: last.section,
        annotations: [...last.annotations, ...obj.annotations ]
      };

      return [ ...head, agg ];
    }
  }, []);

  // Draw bars
  bars.forEach((obj, idx) => {
    const { annotations } = obj;
    const count = annotations.length;

    // Selection could be Feature or Annotation - get linked Feature, latter
    const selectedFeature = props.selected?.asFeature();

    if (props.filter || selectedFeature) {
      let filteredCount;

      if (props.filter && selectedFeature)
        filteredCount = annotations
          .filter(props.filter)
          .filter(annotation => linksTo(annotation, selectedFeature.id))
          .length;
      else if (props.filter)
        filteredCount = annotations.filter(props.filter).length;
      else if (selectedFeature)
        filteredCount = annotations
          .filter(annotation => linksTo(annotation, selectedFeature.id))
          .length;
      else 
        filteredCount = annotations.length;

      // Transparent bars at full count
      ctx.fillStyle = idx === currentIdx ? '#ffc0c0' : '#e4e4ff';    
      ctx.fillRect(idx * (BAR_WIDTH + BAR_SPACING) + PADDING, HEIGHT - count * 1.8, BAR_WIDTH, count * 1.8);

      // Full-color bars at filtered count
      ctx.fillStyle = idx === currentIdx ? '#ff0000' : '#9999ff';    
      ctx.fillRect(idx * (BAR_WIDTH + BAR_SPACING) + PADDING, HEIGHT - filteredCount * 1.8, BAR_WIDTH, filteredCount * 1.8);
    } else {
      ctx.fillStyle = idx === currentIdx ? '#ff0000' : '#aaaaff';    
      ctx.fillRect(idx * (BAR_WIDTH + BAR_SPACING) + PADDING, HEIGHT - count * 1.8, BAR_WIDTH, count * 1.8);
    }

  });
  */

}