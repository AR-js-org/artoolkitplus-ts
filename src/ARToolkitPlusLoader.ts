import ARtoolKitPlus from "../build/artoolkitplus_em_ES6"
import Utils from "./Utils";
import { AbstractARToolkitPlus } from "./abstractions/AbstractARToolkitPlus";
import packageJson from "../package.json";
const { version } = packageJson;


export class ARToolkitPlusLoader {
    private instance: any;
    private cameraCount: number;
    private version: string;
    constructor() {
        // reference to WASM module
        this.instance;
        this.cameraCount = 0;
        this.version = version;
        console.info("ARToolkitPlus ", this.version);
    }

    // ---------------------------------------------------------------------------

    // initialization
    /**
     * Init the class injecting the Wasm Module, link the instanced methods and
     * create a global artoolkitNFT variable.
     * @return {object} the this object
     */
    public async init() {
        this.instance = await ARtoolKitPlus();

        this._decorate();

        return this;
    }

    // private methods
    /**
     * Used internally to link the instance in the ARToolkitPlusLoader to the
     * ARtoolKitPlus internal methods.
     * @return {void}
     */
    private _decorate(): void {
        // add delegate methods
        [
            "vector_int",
            "PIXEL_FORMAT",
            "UNDIST_MODE",
            "MARKER_MODE",
        ].forEach((method: string) => {
            this.converter()[method] = this.instance[method];
        });
    }

    /**
     * Used internally to convert and inject code.
     * @return {this} the this object
     */
    private converter(): any {
        return this;
    }
}