import { IImageObj } from "./CommonInterfaces";
export abstract class AbstractTrackerSingleMarker {
  protected cameraUrl: string;
  protected cameraFileType: string;
  protected useBCH: boolean;
  protected width: number;
  protected height: number;
  protected patternWidth: number;
  constructor(
    useBCH: boolean,
    cameraUrl: string,
    cameraFileType: string,
    width: number,
    height: number,
    patternWidth: number
  ) {
    this.cameraUrl = cameraUrl;
    this.cameraFileType = cameraFileType;
    this.useBCH = useBCH;
    this.width = width;
    this.height = height;
    this.patternWidth = patternWidth;
  }
  abstract setup(cameraUrl: string): void;
  abstract update(image: IImageObj): void;
  abstract getConfidence(): number;
  abstract getModelViewMatrix(): Array<number>;
}
