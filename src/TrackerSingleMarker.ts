import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import { IImageObj } from "./abstractions/CommonInterfaces";
import { TrackerSingleMarkerLoader } from "./TrackerSingleMarkerLoader";

export default class TrackerSingleMarker extends AbstractTrackerSingleMarker {
    private tracker: any;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        super(useBCH, cameraUrl, width, height, patternWidth)
    }
    static async initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<any> {
        const tracker = new TrackerSingleMarker(useBCH, cameraUrl, width, height, patternWidth);
        return await tracker.initTSM();
    };

    public setup = (cameraUrl: string): void => {
        this.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
    }

    public update = (image: IImageObj) => {
        this.tracker.calc(image);
    }

    public getConfidence = (): number => {
        return this.tracker.getConfidence();
    }

    public getModelViewMatrix = (): number[] => {
        return this.tracker.getModelViewMatrix();
    };

    public getMarkerPos = (): object => {
        return this.tracker.getMarkerPos();
    }

    public getMarkerVertexes = (): Array<number> => {
        return this.tracker.getMarkerVertexes();
    }

    private async initTSM() {
        const tsm = await new TrackerSingleMarkerLoader().init();

        this.tracker = await tsm.loadCalib(this.cameraUrl, this.useBCH, this.width, this.height, this.patternWidth)

        return this.tracker;
    }
}