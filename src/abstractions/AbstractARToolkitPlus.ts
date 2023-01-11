import { IImageObj } from './interfaces'
export abstract class AbstractARToolkitPlus {
    protected cameraUrl: string;
    protected useBCH: boolean;
    protected width: number;
    protected height: number;
    protected patternWidth: number;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        this.cameraUrl = cameraUrl;
        this.useBCH = useBCH;
        this.width = width;
        this.height = height;
        this.patternWidth = patternWidth;
    }
    abstract arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
}