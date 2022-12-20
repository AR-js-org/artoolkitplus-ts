#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <emscripten/val.h>
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
  std::vector<int> calc(emscripten::val data_buffer) {
    std::vector<uint8_t> u8 =
        emscripten::convertJSArrayToNumberVector<uint8_t>(data_buffer);
    std::vector<int> marker = TrackerSingleMarker::calc(u8.data());
    std::cout << "Marker is:" << marker[0] << std::endl;
    return marker;
  }
  float getConfidence() { return TrackerSingleMarker::getConfidence(); }
  emscripten::val getModelViewMatrix() {
    emscripten::val arr = emscripten::val::array();
    const ARFloat *ptr = TrackerSingleMarker::getModelViewMatrix();
    for (auto i = 0; i < 16; i++) {
      arr.call<void>("push", ptr[i]);
    }
    return arr;
  }
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