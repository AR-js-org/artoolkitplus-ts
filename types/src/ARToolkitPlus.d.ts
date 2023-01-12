import { AbstractARToolKitPlus } from "./abstractions/AbstractARToolKitPlus";
export default class ARToolKitPlus extends AbstractARToolKitPlus {
    private artoolkitplus;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    constructor();
    static initAR(): Promise<AbstractARToolKitPlus>;
    arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
    private initARTKP;
}
