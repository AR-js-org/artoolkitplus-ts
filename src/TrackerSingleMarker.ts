import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import { IImageObj, TrackerOptions } from "./abstractions/CommonInterfaces";
import { TrackerSingleMarkerLoader } from "./TrackerSingleMarkerLoader";
import Utils from "./Utils";

export default class TrackerSingleMarker extends AbstractTrackerSingleMarker {
  private tracker: any;
  private marker_count: number;
  private FS: any;
  private maxImagePatterns: number;
  private pattWidth: number;
  private pattHeight: number;
  private pattSamples: number;
  private maxLoadPatterns: number;
  constructor(
    useBCH: boolean,
    cameraUrl: string,
    width: number,
    height: number,
    patternWidth: number,
    options: TrackerOptions
  ) {
    super(useBCH, cameraUrl, width, height, patternWidth);
    this.marker_count = 0;
    if (!options) {
      this.maxImagePatterns = 8;
      this.pattWidth = 6;
      this.pattHeight = 6;
      this.pattSamples = 6;
      this.maxLoadPatterns = 0;
    } else {
      this.maxImagePatterns = options.maxImagePatterns;
      this.pattWidth = options.pattWidth;
      this.pattHeight = options.pattHeight;
      this.pattSamples = options.pattSamples;
      this.maxLoadPatterns = options.maxLoadPatterns;
    }
  }
  static async initTrackerSingleMarker(
    useBCH: boolean,
    cameraUrl: string,
    width: number,
    height: number,
    patternWidth: number,
    options: TrackerOptions
  ): Promise<any> {
    const tracker = new TrackerSingleMarker(
      useBCH,
      cameraUrl,
      width,
      height,
      patternWidth,
      options
    );
    return await tracker.initTSM();
  }

  public setup = (cameraUrl: string): void => {
    this.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
  };

  public update = (image: IImageObj) => {
    this.tracker.update(image);
  };

  public getConfidence = (): number => {
    return this.tracker.getConfidence();
  };

  public getModelViewMatrix = (): number[] => {
    return this.tracker.getModelViewMatrix();
  };

  public getMarkerPos = (): object => {
    return this.tracker.getMarkerPos();
  };

  public getMarkerVertexes = (): Array<number> => {
    return this.tracker.getMarkerVertexes();
  };

  public setMarkerMode = (markerMode: any) => {
    this.tracker.setMarkerMode(markerMode);
  };

  public async addPattern(urlOrData: any) {
    const target = "/marker_" + this.marker_count++;

    let data: Uint8Array;

    if (urlOrData instanceof Uint8Array) {
      // assume data from a .patt file
      data = urlOrData;
    } else {
      // fetch data via HTTP

      try {
        data = await Utils.fetchRemoteData(urlOrData);
      } catch (error: any) {
        throw new Error("Error in addPattern function: ", error);
      }
    }

    this._storeDataFile(data, target);

    return this.tracker.addPattern(target);
  }

  private async initTSM() {
    const tsm = await new TrackerSingleMarkerLoader().init();

    this.FS = tsm.FS;

    this.tracker = await tsm.loadCalib(
      this.cameraUrl,
      this.useBCH,
      this.width,
      this.height,
      this.patternWidth,
      this.pattSamples,
      this.pattWidth,
      this.pattHeight,
      this.pattSamples,
      this.maxLoadPatterns
    );

    return this;
  }

  private _storeDataFile(data: Uint8Array, target: string) {
    // FS is provided by emscripten
    // Note: valid data must be in binary format encoded as Uint8Array
    this.FS.writeFile(target, data, {
      encoding: "binary",
    });
  }
}
