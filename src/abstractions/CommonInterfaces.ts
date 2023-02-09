export interface IImageObj extends HTMLCanvasElement {
    videoWidth: number;
    width: number;
    videoHeight: number;
    height: number;
    data: Uint8ClampedArray;
  }

export interface TrackerOptions {
  maxImagePatterns: number,
  pattWidth: number;
  pattHeight: number,
  pattSamples: number,
  maxLoadPatterns: number
}