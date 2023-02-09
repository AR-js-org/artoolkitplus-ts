import { AbstractTrackerSingleMarker } from "./abstractions/AbstractTrackerSingleMarker";
import { IImageObj } from "./abstractions/CommonInterfaces";
import { TrackerSingleMarkerLoader } from "./TrackerSingleMarkerLoader";
import Utils from "./Utils"

export default class TrackerSingleMarker extends AbstractTrackerSingleMarker {
    private tracker: any;
    private marker_count: number
    private FS: any;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        super(useBCH, cameraUrl, width, height, patternWidth)
        this.marker_count = 0;
    }
    static async initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<any> {
        const tracker = new TrackerSingleMarker(useBCH, cameraUrl, width, height, patternWidth);
        return await tracker.initTSM();
    };

    public setup = (cameraUrl: string): void => {
        this.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
    }

    public update = (image: IImageObj) => {
        this.tracker.update(image);
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

    public setMarkerMode = (markerMode: any) => {
        this.tracker.setMarkerMode(markerMode)
    }

    public async addPattern(urlOrData: any) {
        const target = '/marker_' + this.marker_count++;

        let data;

        if (urlOrData.indexOf("\n") !== -1) {
            // assume text from a .patt file

            data = Utils.string2Uint8Data(urlOrData as string);
        } else {
            // fetch data via HTTP

            try {
                data = await Utils.fetchRemoteData(urlOrData); console.log(data);
            }
            catch (error) { throw error; }
        }

        this._storeDataFile(data, target);

        return this.tracker.addPattern(target);
    }

    private async initTSM() {
        const tsm = await new TrackerSingleMarkerLoader().init();

        this.FS = tsm.FS

        this.tracker = await tsm.loadCalib(this.cameraUrl, this.useBCH, this.width, this.height, this.patternWidth)

        return this;
    }

    private _storeDataFile(data: Uint8Array, target: string) {
        // FS is provided by emscripten
        // Note: valid data must be in binary format encoded as Uint8Array
        this.FS.writeFile(target, data, {
            encoding: "binary"
        });
    }
}