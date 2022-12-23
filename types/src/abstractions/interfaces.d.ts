export interface IImageObj extends HTMLCanvasElement {
    videoWidth: number;
    width: number;
    videoHeight: number;
    height: number;
    data: Uint8ClampedArray;
}
export interface IARToolkitplus {
    setup: (cameraUrl: string, maxImagePatterns: number, pattWidth: number, pattHeight: number, pattSamples: number, maxLoadPatterns: number) => void;
    update: (image: IImageObj) => void;
    getConfidence: () => number;
    getModelViewMatrix: () => Array<number>;
}
