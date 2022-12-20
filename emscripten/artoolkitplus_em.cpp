#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <iostream>

using namespace ARToolKitPlus;
using namespace std;

class TrackerSM : public TrackerSingleMarker {
public:
  TrackerSM(int imWidth, int imHeight, int maxImagePatterns = 8,
            int pattWidth = 6, int pattHeight = 6, int pattSamples = 6,
            int maxLoadPatterns = 0)
      : TrackerSingleMarker(imWidth, imHeight, maxImagePatterns, pattWidth,
                            pattHeight, pattSamples, maxLoadPatterns) {}
  std::vector<int> calc(uintptr_t nImage) {
    auto ptrImg = reinterpret_cast<uint8_t *>(nImage);
    return TrackerSingleMarker::calc(ptrImg);
  }
  float getConfidence() { return TrackerSingleMarker::getConfidence(); }
  bool init(std::string paramFile, ARFloat nearCLip, ARFloat nFarClip) {
    return TrackerSingleMarker::init(paramFile.c_str(), nearCLip, nFarClip);
  }
  bool setPixelFormat(PIXEL_FORMAT nFormat) {
    return TrackerSingleMarker::setPixelFormat(nFormat);
  }
  void printCameraSettings() {
    TrackerSingleMarker::getCamera()->printSettings();
  };
  int selectBestMarkerByCf() {
    return TrackerSingleMarker::selectBestMarkerByCf();
  }
  void setBorderWidth(ARFloat nFraction) {
    TrackerSingleMarker::setBorderWidth(nFraction);
  }
  void setMarkerMode(MARKER_MODE nMarkerMode) {
    TrackerSingleMarker::setMarkerMode(nMarkerMode);
  };
  void setPatternWidth(float width) {
    TrackerSingleMarker::setPatternWidth(width);
  };
  void setThreshold(int nValue) { TrackerSingleMarker::setBorderWidth(nValue); }
  void setUndistortionMode(UNDIST_MODE nMode) {
    TrackerSingleMarker::setUndistortionMode(nMode);
  };
};

#include "bindings.cpp"