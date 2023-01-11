import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import { IImageObj } from "./abstractions/interfaces";
import { ARToolkitPlusLoader } from "./ARToolkitPlusLoader";
export default class ARToolkitPlus extends AbstractARToolkitPlus {
    private artoolkitplus: any;
    //private tracker: any;
    static PIXEL_FORMAT: any;
    static MARKER_MODE: any;
    static UNDIST_MODE: any;

    constructor(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number) {
        super(useBCH, cameraUrl, width, height, patternWidth)
    }

    static async initAR(useBCH: boolean, cameraUrl: string, width: number, height: number, patternWidth: number): Promise<AbstractARToolkitPlus> {
        const artoolkitPlus = new ARToolkitPlus(useBCH, cameraUrl, width, height, patternWidth);
        return await artoolkitPlus.initARTKP();
    };

    arglCameraViewRHf(
        glMatrix: Float64Array,
        glRhMatrix?: Float64Array,
        scale?: number
    ): Float64Array {
        let m_modelview;
        if (glRhMatrix == undefined) {
            m_modelview = new Float64Array(16);
        } else {
            m_modelview = glRhMatrix;
        }

        // x
        m_modelview[0] = glMatrix[0];
        m_modelview[4] = glMatrix[4];
        m_modelview[8] = glMatrix[8];
        m_modelview[12] = glMatrix[12];
        // y
        m_modelview[1] = -glMatrix[1];
        m_modelview[5] = -glMatrix[5];
        m_modelview[9] = -glMatrix[9];
        m_modelview[13] = -glMatrix[13];
        // z
        m_modelview[2] = -glMatrix[2];
        m_modelview[6] = -glMatrix[6];
        m_modelview[10] = -glMatrix[10];
        m_modelview[14] = -glMatrix[14];

        // 0 0 0 1
        m_modelview[3] = 0;
        m_modelview[7] = 0;
        m_modelview[11] = 0;
        m_modelview[15] = 1;

        if (scale != undefined && scale !== 0.0) {
            m_modelview[12] *= scale;
            m_modelview[13] *= scale;
            m_modelview[14] *= scale;
        }

        glRhMatrix = m_modelview;

        return glRhMatrix;
    }

    private async initARTKP() {
        this.artoolkitplus = await new ARToolkitPlusLoader().init();

        ARToolkitPlus.MARKER_MODE = this.artoolkitplus.MARKER_MODE;
        ARToolkitPlus.PIXEL_FORMAT = this.artoolkitplus.PIXEL_FORMAT;
        ARToolkitPlus.UNDIST_MODE = this.artoolkitplus.UNDIST_MODE;

        return this;
    }
}