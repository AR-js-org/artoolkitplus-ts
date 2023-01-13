import { AbstractARToolKitPlus } from "./abstractions/AbstractARToolKitPlus";
export default class ARToolKitPlus extends AbstractARToolKitPlus {
    private artoolkitplus;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    /**
     * Default constructor used internally in the **initAR** static method.
     */
    constructor();
    /**
     * Main static method to init the ARToolKitPlus instance.
     * Start from this method your main app, example:
     * ```js
     * import ARToolKitPlus from '../dist/ARToolKitPlus.js'
     *
     * ARToolKitPlus.initAR().then((ar) => {
     *  // your code here...
     * })
     * ```
     * @returns {this}
     */
    static initAR(): Promise<AbstractARToolKitPlus>;
    /**
     * Convert Model View Matrix to Right Hand Matrix.
     * @param glMatrix {Float64Array}
     * @param glRhMatrix {Float64Array}
     * @param scale {number}
     * @returns {Float64Array} glRhMatrix.
     */
    arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
    private initARTKP;
}
