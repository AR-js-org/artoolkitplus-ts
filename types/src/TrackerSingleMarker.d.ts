import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import { IImageObj } from "./abstractions/CommonInterfaces";
export default class TrackerSingleMarker extends AbstractTrackerSingleMarker {
    private tracker;
    private marker_count;
    private FS;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    static initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<any>;
    setup: (cameraUrl: string) => void;
    update: (image: IImageObj) => void;
    getConfidence: () => number;
    getModelViewMatrix: () => number[];
    getMarkerPos: () => object;
    getMarkerVertexes: () => Array<number>;
    setMarkerMode: (markerMode: any) => void;
    addPattern(urlOrData: any): Promise<any>;
    private initTSM;
    private _storeDataFile;
}
