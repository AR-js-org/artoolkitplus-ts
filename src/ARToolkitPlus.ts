import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import { IImageObj } from "./abstractions/interfaces";
import { ARToolkitPlusLoader } from "./ARToolkitPlusLoader";
export default class ARToolkitPlus extends AbstractARToolkitPlus {
    private cameraUrl: string;
    private useBCH: boolean;
    private width: number;
    private height: number;
    private patternWidth: number;
    private artoolkitplus: any;
    private tracker: any;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;

    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        super(useBCH, cameraUrl, width, height, patternWidth)
        this.cameraUrl = cameraUrl;
        this.useBCH = useBCH;
        this.width = width;
        this.height = height;
        this.patternWidth = patternWidth;
    }

    static async initTrackerSingleMarker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus> {
        const artoolkitPlus = new ARToolkitPlus(useBCH, cameraUrl, width, height, patternWidth);
        return await artoolkitPlus.initTSM();
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

    private async initTSM() {
        this.artoolkitplus = await new ARToolkitPlusLoader().init();

        ARToolkitPlus.MARKER_MODE = this.artoolkitplus.MARKER_MODE;
        ARToolkitPlus.PIXEL_FORMAT = this.artoolkitplus.PIXEL_FORMAT;
        ARToolkitPlus.UNDIST_MODE = this.artoolkitplus.UNDIST_MODE;

        this.tracker = await this.artoolkitplus.loadCalib(this.cameraUrl, this.useBCH, this.width, this.height, this.patternWidth)

        return this.tracker;
    }
}