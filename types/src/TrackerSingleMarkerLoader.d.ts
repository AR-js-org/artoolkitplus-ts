import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
export declare class TrackerSingleMarkerLoader {
    private instance;
    private cameraCount;
    constructor();
    /**
     * Init the class injecting the Wasm Module, link the instanced methods and
     * create a global artoolkitNFT variable.
     * @return {object} the this object
     */
    init(): Promise<this>;
    /**
     * Used internally to link the instance in the ARToolkitPlusLoader to the
     * ARtoolKitPlus internal methods.
     * @return {void}
     */
    private _decorate;
    /**
     * Used internally to convert and inject code.
     * @return {this} the this object
     */
    private converter;
    /**
     * Load the camera, this is an important and required step, Internally fill
     * the ARParam struct.
     * @param {string} urlOrData: the camera parameter, usually a path to a .dat file
     * @return {number} a number, the internal id.
     */
    loadCalib(urlOrData: Uint8Array | string, useBCH: boolean, width: number, height: number, patternWidth: number): Promise<AbstractTrackerSingleMarker>;
    /**
     * Used internally by LoadCamera method
     * @return {void}
     */
    private _storeDataFile;
}
