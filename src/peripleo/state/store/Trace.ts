export interface Trace<T extends any> {

  items: Item<T>[];

}

export interface Item<T extends any>{

  id: string;

  type: 'Annotation';

  target: {

    value: T;

  }

  body:  {

    type: 'Dataset';

    value: Array<{ id: string }>;
    
  }

}


