import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
export declare class TrackerSingleMarkerLoader {
    private instance;
    private cameraCount;
    /**
     * Deafult constructor.
     */
    constructor();
    /**
     * Init the class injecting the Wasm Module, link the instanced methods.
     * @return {object} the this object
     */
    init(): Promise<this>;
    /**
     * Used internally to link the instance in the ARToolKitPlusLoader to the
     * ARToolKitPlus internal methods.
     * @return {void}
     */
    private _decorate;
    /**
     * Used internally to convert and inject code.
     * @return {this} the this object
     */
    private converter;
    /**
     * Load the camera, this is an important and required step. Internally fill
     * the Camera class (old ARToolKit ARParam struct).
     * @param {string} urlOrData: the camera parameter, usually a path to a .cal file
     * @return {Promise} the tracker.
     */
    loadCalib(urlOrData: Uint8Array | string, useBCH: boolean, width: number, height: number, patternWidth: number): Promise<AbstractTrackerSingleMarker>;
    /**
     * Used internally by LoadCamera method
     * @return {void}
     */
    private _storeDataFile;
}
