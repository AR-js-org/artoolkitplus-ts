export abstract class AbstractARToolKitPlus {
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    constructor() {}
    abstract arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
}
