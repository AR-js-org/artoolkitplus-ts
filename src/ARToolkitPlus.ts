import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import { IImageObj } from "./abstractions/interfaces";
import { ARToolkitPlusLoader } from "./ARToolkitPlusLoader";
export default class ARToolkitPlus implements AbstractARToolkitPlus {
    private cameraUrl: string;
    private useBCH: boolean;
    private width: number;
    private height: number;
    private patternWidth: number;
    private artoolkitplus: any;
    private tracker: any;

    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        this.cameraUrl = cameraUrl;
        this.useBCH = useBCH;
        this.width = width;
        this.height = height;
        this.patternWidth = patternWidth;
    }

    static async initSingleTracker (useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus> {
        const artoolkitPlus = new ARToolkitPlus(useBCH, cameraUrl, width, height, patternWidth);
        return await artoolkitPlus.initSM();
    };

    setup(cameraUrl: string): void {
        this.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
    }

    update(image: IImageObj) {
        this.tracker.calc(image);
     }

    getConfidence() {
        return this.tracker.getConfidence();
    }

    getModelViewMatrix(): number[] {
        return this.tracker.getModelViewMatrix();
    };

    private async initSM() {
       this.artoolkitplus = await new ARToolkitPlusLoader().init();
       this.tracker = this.artoolkitplus.loadCalib(this.cameraUrl, this.useBCH, this.width, this.height, this.patternWidth)
       return this.tracker;
    }
}