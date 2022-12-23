import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import ARtoolKitPlus from "../build/artoolkitplus_em_ES6"
export default class ARToolkitPlus implements AbstractARToolkitPlus {
    private useBCH: boolean;
    private width: number;
    private height: number;
    private patternWidth: number;
    private static artoolkitplus: any;
    private static tracker: any;

    constructor(useBCH: boolean, width: number, height: number, patternWidth: number) {
        this.useBCH = useBCH;
        this.width = width;
        this.height = height;
        this.patternWidth = patternWidth;
        ARToolkitPlus.artoolkitplus = this.initSM();
    }

    static initSingleTracker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus> {
        this.tracker = this.artoolkitplus.TrackerSingleMarker(useBCH, width, height, patternWidth);
        this.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
        return this.tracker;
    };

    setup(cameraUrl: string): void {
        ARToolkitPlus.tracker.setup(cameraUrl, 8, 6, 6, 6, 0);
    }

    update() { }

    getConfidence() {
        return ARToolkitPlus.tracker.getConfidence();
    }

    getModelViewMatrix(): number[] {
        return ARToolkitPlus.tracker.getModelViewMatrix();
    };

    private async initSM() {
        return await ARtoolKitPlus();
    }
}