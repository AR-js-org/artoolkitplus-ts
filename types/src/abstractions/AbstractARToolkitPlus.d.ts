import { IImageObj } from './interfaces';
export declare abstract class AbstractARToolkitPlus {
    protected cameraUrl: string;
    protected useBCH: boolean;
    protected width: number;
    protected height: number;
    protected patternWidth: number;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    abstract setup: (cameraUrl: string) => void;
    abstract update: (image: IImageObj) => void;
    abstract getConfidence: () => number;
    abstract getModelViewMatrix: () => Array<number>;
}
