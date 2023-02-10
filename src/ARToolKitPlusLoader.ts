import ARToolKitPlus from "../build/artoolkitplus_em_ES6";
import packageJson from "../package.json";
const { version } = packageJson;

export class ARToolKitPlusLoader {
  private instance: any;
  private version: string;
  /**
   * Default constructor, print in the console the ARToolKitPlus version, example:
   * ```ARToolKitPlus 0.3.1```
   */
  constructor() {
    // reference to WASM module
    this.instance;
    this.version = version;
    console.info("ARToolKitPlus ", this.version);
  }

  // ---------------------------------------------------------------------------

  // initialization
  /**
   * Init the class injecting the Wasm Module and link the instanced method.
   * @return {object} the this object
   */
  public async init() {
    this.instance = await ARToolKitPlus();

    this._decorate();

    return this;
  }

  // private methods
  /**
   * Used internally to link the instance in the ARToolKitPlusLoader to the
   * ARToolKitPlus internal methods.
   * @return {void}
   */
  private _decorate(): void {
    // add delegate methods
    ["PIXEL_FORMAT", "UNDIST_MODE", "MARKER_MODE"].forEach((method: string) => {
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
