import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import { IImageObj } from "./abstractions/interfaces";
export default class ARToolkitPlus implements AbstractARToolkitPlus {
    private cameraUrl;
    private useBCH;
    private width;
    private height;
    private patternWidth;
    private artoolkitplus;
    private tracker;
    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number);
    static initSingleTracker(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus>;
    setup(cameraUrl: string): void;
    update(image: IImageObj): void;
    getConfidence(): any;
    getModelViewMatrix(): number[];
    private initSM;
}
