import { useEffect, useState } from "react";

export interface Config {

  map: string;
  
  gazetteer: string;

  tei: {

    name: string;

    url: string;

  };

  layers?: {

    name: string;

    url: string;

  }[];

}

export const useConfig = () => {

  const [config, setConfig] = useState<Config | undefined>();

  useEffect(() => {
    fetch('config.json')
      .then(res => res.json())
      .then(setConfig);
  }, []);

  return config;

}