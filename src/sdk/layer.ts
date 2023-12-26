export interface ILayerOption {
  // LngLat?: Array<number>;
  content?: string | Element
  // class?: string;
  // closeBtn?: boolean;
}

export interface ILayer {
  _original: unknown // Original map layer object
  readonly _id: string // Unique layer id
  on?(eventName: string, handler: Function): void // AddEventListener function，not required
  off?(eventName: string, handler: Function): void // Remove a previously added listener funciton
}
