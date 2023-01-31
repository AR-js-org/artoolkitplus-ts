#include <ARToolKitPlus/TrackerMultiMarker.h>
#include <ARToolKitPlus/Tracker.h>
#include <ARToolKitPlus/ar.h>
#include <algorithm>
#include <emscripten/val.h>

using namespace ARToolKitPlus;
using namespace std;

class TrackerMM {
public:
  TrackerMM(bool useBCH, int width, int height, int patternWidth) {
    this->useBCH = useBCH;
    this->mWidth = width;
    this->mHeight = height;
    this->mPatternWidth = patternWidth;
  };
  //~TrackerMM();

  void setup(string camParamFile, string multiFile, int maxImagePatterns, int pattWidth,
             int pattHeight, int pattSamples, int maxLoadPatterns);

  int update(emscripten::val data_buffer);


  emscripten::val getMVMatrix();

  int getMarkerId();

  emscripten::val getMarkerPos();

  emscripten::val getMarkerVertexes();

  bool setPixelFormat(PIXEL_FORMAT nFormat);

  PIXEL_FORMAT getPixelFormat();

  emscripten::val getProjectionMatrix();

  void printCameraSettings();

  void setBorderWidth(ARFloat nFraction);

  void setMarkerMode(MARKER_MODE nMarkerMode);

  void setThreshold(int nValue);

  void setUndistortionMode(UNDIST_MODE nMode);

private:
  bool useBCH;
  int mWidth;
  int mHeight;
  int mPatternWidth;
  ARMultiMarkerInfoT *config;
  vector<int> mMarkers;
  ARMarkerInfo *marker_info;
  int marker_num;
  unique_ptr<ARToolKitPlus::TrackerMultiMarker> tracker;
};