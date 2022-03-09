export type TPagingConfig = {
  index: number;
  size: number;
};

export type TPagingConfigCb = (config: TPagingConfig) => void;
