#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <emscripten/val.h>
#include <iostream>

using namespace ARToolKitPlus;
using namespace std;

class TrackerSM {
public:
  TrackerSM(int imWidth, int imHeight, int maxImagePatterns = 8,
            int pattWidth = 6, int pattHeight = 6, int pattSamples = 6,
            int maxLoadPatterns = 0);

  int addPattern(std::string nFileName);

  std::vector<int> calc(emscripten::val data_buffer);

  float getConfidence();

  emscripten::val getMVMatrix();

  bool init(std::string paramFile, ARFloat nearCLip, ARFloat nFarClip);

  bool setPixelFormat(PIXEL_FORMAT nFormat);

  PIXEL_FORMAT getPixelFormat();

  void printCameraSettings();

  int selectBestMarkerByCf();

  void setBorderWidth(ARFloat nFraction);

  void setMarkerMode(MARKER_MODE nMarkerMode);

  // MARKER_MODE getMarkerMode();

  void setPatternWidth(float width);

  void setThreshold(int nValue);

  void setUndistortionMode(UNDIST_MODE nMode);

private:
  ARToolKitPlus::TrackerSingleMarker *tracker;
};