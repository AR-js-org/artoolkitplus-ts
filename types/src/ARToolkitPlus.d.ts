import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import { IImageObj } from "./abstractions/interfaces";
export default class ARToolkitPlus extends AbstractARToolkitPlus {
    private artoolkitplus;
    private tracker;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    static initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus>;
    setup: (cameraUrl: string) => void;
    update: (image: IImageObj) => void;
    getConfidence: () => number;
    getModelViewMatrix: () => number[];
    getMarkerPos: () => object;
    getMarkerVertexes: () => Array<number>;
    arglCameraViewRHf(glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number): Float64Array;
    private initTSM;
}
