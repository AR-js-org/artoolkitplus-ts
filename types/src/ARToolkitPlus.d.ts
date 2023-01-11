import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
export default class ARToolkitPlus extends AbstractARToolkitPlus {
    private artoolkitplus;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    static initAR(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus>;
    arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
    private initARTKP;
}
