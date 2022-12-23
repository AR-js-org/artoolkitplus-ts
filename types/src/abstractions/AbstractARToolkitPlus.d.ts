import { IImageObj } from './interfaces';
export declare abstract class AbstractARToolkitPlus {
    static initSingleTracker: (cameraUrl: string, width: number, height: number, patternWidth: number) => Promise<AbstractARToolkitPlus>;
    setup: (cameraUrl: string, maxImagePatterns: number, pattWidth: number, pattHeight: number, pattSamples: number, maxLoadPatterns: number) => void;
    update: (image: IImageObj) => void;
    getConfidence: () => number;
    getModelViewMatrix: () => Array<number>;
}
