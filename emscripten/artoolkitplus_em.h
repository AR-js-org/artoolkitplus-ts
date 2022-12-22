#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <algorithm>
#include <emscripten/val.h>
#include <iostream>

using namespace ARToolKitPlus;
using namespace std;

class TrackerSM {
public:
  TrackerSM(bool useBCH, int width, int height, int patternWidth) { 
    this->useBCH = useBCH; 
    this->mWidth = width;
    this->mHeight = height;
    this->mPatternWidth = patternWidth;
    };
  //~TrackerSM();

  void setup(string camParamFile, int maxImagePatterns,
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
  int mWidth;
  int mHeight;
  int mPatternWidth;
  unique_ptr<ARToolKitPlus::TrackerSingleMarker> tracker;
};