#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <emscripten/val.h>
#include <iostream>

using namespace ARToolKitPlus;
using namespace std;

class TrackerSM {
public:
  TrackerSM(bool useBCH) { this->useBCH = useBCH; }
  //~TrackerSM();

  void setup(int w, int h, string camParamFile, int maxImagePatterns,
             int pattWidth, int pattHeight, int pattSamples,
             int maxLoadPatterns);

  int addPattern(std::string nFileName);

  vector<int> update(emscripten::val data_buffer);

  float getConfidence();

  emscripten::val getMVMatrix();

  bool setPixelFormat(PIXEL_FORMAT nFormat);

  PIXEL_FORMAT getPixelFormat();

  void printCameraSettings();

  int selectBestMarkerByCf();

  void setBorderWidth(ARFloat nFraction);

  void setMarkerMode(MARKER_MODE nMarkerMode);

  void setPatternWidth(float width);

  void setThreshold(int nValue);

  void setUndistortionMode(UNDIST_MODE nMode);

private:
  bool useBCH;
  ARToolKitPlus::TrackerSingleMarker *tracker;
};