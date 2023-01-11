import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
export default class ARToolkitPlus extends AbstractARToolkitPlus {
    private artoolkitplus;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    constructor();
    static initAR(): Promise<AbstractARToolkitPlus>;
    arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
    private initARTKP;
}
