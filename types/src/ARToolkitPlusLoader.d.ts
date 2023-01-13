export declare class ARToolKitPlusLoader {
    private instance;
    private version;
    /**
     * Default constructor, print in the console the ARToolKitPlus version, example:
     * ```ARToolKitPlus 0.2.0```
     */
    constructor();
    /**
     * Init the class injecting the Wasm Module and link the instanced method.
     * @return {object} the this object
     */
    init(): Promise<this>;
    /**
     * Used internally to link the instance in the ARToolKitPlusLoader to the
     * ARToolKitPlus internal methods.
     * @return {void}
     */
    private _decorate;
    /**
     * Used internally to convert and inject code.
     * @return {this} the this object
     */
    private converter;
}
