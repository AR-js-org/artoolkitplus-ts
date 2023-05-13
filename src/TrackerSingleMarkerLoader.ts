import TrackerSM from "../build/trackerSM_ES6";
import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import Utils from "./Utils";

export class TrackerSingleMarkerLoader {
  private instance: any;
  private cameraCount: number;
  public FS: any;
  /**
   * Deafult constructor.
   */
  constructor() {
    // reference to WASM module
    this.instance;
    this.cameraCount = 0;
  }

  // ---------------------------------------------------------------------------

  // initialization
  /**
   * Init the class injecting the Wasm Module, link the instanced methods.
   * @return {object} the this object
   */
  public async init() {
    this.instance = await TrackerSM();

    this._decorate();

    return this;
  }

  // private methods
  /**
   * Used internally to link the instance in the ARToolKitPlusLoader to the
   * ARToolKitPlus internal methods.
   * @return {void}
   */
  private _decorate(): void {
    // add delegate methods
    ["TrackerSingleMarker"].forEach((method: string) => {
      this.converter()[method] = this.instance[method];
    });
    this.FS = this.instance.FS;
  }

  /**
   * Used internally to convert and inject code.
   * @return {this} the this object
   */
  private converter(): any {
    return this;
  }

  // ---------------------------------------------------------------------------
  // public accessors
  //----------------------------------------------------------------------------
  /**
   * Load the camera, this is an important and required step. Internally fill
   * the Camera class (old ARToolKit ARParam struct).
   * @param {string} urlOrData: the camera parameter, usually a path to a .cal file
   * @return {Promise} the tracker.
   */
  public async loadCalib(
    urlOrData: Uint8Array | string,
    cameraFileType: string,
    useBCH: boolean,
    width: number,
    height: number,
    patternWidth: number,
    maxImagePatterns: number = 8,
    pattWidth: number = 6,
    pattHeight: number = 6,
    pattSamples: number = 6,
    maxLoadPatterns: number = 0
  ): Promise<AbstractTrackerSingleMarker> {
    var cmt: string;
    if(cameraFileType== 'xml') 
    {
      cmt = '.xml';
    }
    else if(cameraFileType== 'cal')
    {
      cmt = '.cal';
    }
    else throw new Error("Error in loadCalib function: cameraFileType must be either 'xml' or 'cal'");
    const target = "/load_calib_" + this.cameraCount++ + cmt;

    let data: Uint8Array;
    const tracker = new this.instance.TrackerSingleMarker(
      useBCH,
      width,
      height,
      patternWidth
    );

    if (urlOrData instanceof Uint8Array) {
      // assume preloaded camera params
      data = urlOrData;
    } else {
      // fetch data via HTTP
      try {
        data = await Utils.fetchRemoteData(urlOrData);
      } catch (error: any) {
        throw new Error("Error in loadCalib function: ", error);
      }
    }

    this._storeDataFile(data, target);

    // return the internal marker ID
    tracker.setup(
      target,
      maxImagePatterns,
      pattWidth,
      pattHeight,
      pattSamples,
      maxLoadPatterns
    );

    return tracker;
  }

  // ---------------------------------------------------------------------------

  // implementation
  /**
   * Used internally by LoadCamera method
   * @return {void}
   */
  private _storeDataFile(data: Uint8Array, target: string) {
    // FS is provided by emscripten
    // Note: valid data must be in binary format encoded as Uint8Array
    this.instance.FS.writeFile(target, data, {
      encoding: "binary",
    });
  }
}
