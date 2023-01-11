import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import { IImageObj } from "./abstractions/interfaces";
export default class TrackerSingleMarker extends AbstractTrackerSingleMarker {
    private tracker;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    static initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<any>;
    setup: (cameraUrl: string) => void;
    update: (image: IImageObj) => void;
    getConfidence: () => number;
    getModelViewMatrix: () => number[];
    getMarkerPos: () => object;
    getMarkerVertexes: () => Array<number>;
    private initTSM;
}
