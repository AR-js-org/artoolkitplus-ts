export declare class ARToolkitPlusLoader {
    private instance;
    private cameraCount;
    private version;
    constructor();
    /**
     * Init the class injecting the Wasm Module, link the instanced methods and
     * create a global artoolkitNFT variable.
     * @return {object} the this object
     */
    init(): Promise<this>;
    /**
     * Used internally to link the instance in the ARToolkitPlusLoader to the
     * ARtoolKitPlus internal methods.
     * @return {void}
     */
    private _decorate;
    /**
     * Used internally to convert and inject code.
     * @return {this} the this object
     */
    private converter;
}
