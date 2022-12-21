#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <ARToolKitPlus/ar.h>
#include <emscripten/val.h>
#include <iostream>

#include "artoolkitplus_em.h"

TrackerSM::TrackerSM(int imWidth, int imHeight, int maxImagePatterns,
                     int pattWidth, int pattHeight, int pattSamples,
                     int maxLoadPatterns) {
  tracker = new ARToolKitPlus::TrackerSingleMarker(
      imWidth, imHeight, maxImagePatterns, pattWidth, pattHeight, pattSamples,
      maxLoadPatterns);
  tracker->setPixelFormat(ARToolKitPlus::PIXEL_FORMAT_LUM);

  tracker->setImageProcessingMode(ARToolKitPlus::IMAGE_FULL_RES);
  tracker->setMarkerMode(ARToolKitPlus::MARKER_ID_BCH);
}
int TrackerSM::addPattern(string nFileName) {
  return tracker->addPattern(nFileName.c_str());
}

vector<int> TrackerSM::calc(emscripten::val data_buffer) {
  vector<uint8_t> u8 =
      emscripten::convertJSArrayToNumberVector<uint8_t>(data_buffer);
  vector<int> marker = tracker->calc(u8.data());
  cout << "Marker is:" << marker[0] << endl;
  return marker;
}

emscripten::val TrackerSM::getMVMatrix() {
  emscripten::val arr = emscripten::val::array();
  const ARFloat *ptr = tracker->getModelViewMatrix();
  for (auto i = 0; i < 16; i++) {
    arr.call<void>("push", ptr[i]);
  }
  return arr;
}
float TrackerSM::getConfidence() { return tracker->getConfidence(); };
bool TrackerSM::init(string paramFile, ARFloat nearCLip, ARFloat nFarClip) {
  return tracker->init(paramFile.c_str(), nearCLip, nFarClip);
}
bool TrackerSM::setPixelFormat(PIXEL_FORMAT nFormat) {
  return tracker->setPixelFormat(nFormat);
}
PIXEL_FORMAT TrackerSM::getPixelFormat() { return tracker->getPixelFormat(); }
void TrackerSM::printCameraSettings() {
  tracker->getCamera()->printSettings();
};
int TrackerSM::selectBestMarkerByCf() {
  return tracker->selectBestMarkerByCf();
}
void TrackerSM::setBorderWidth(ARFloat nFraction) {
  tracker->setBorderWidth(nFraction);
}
void TrackerSM::setMarkerMode(MARKER_MODE nMarkerMode) {
  tracker->setMarkerMode(nMarkerMode);
};
// MARKER_MODE TrackerSM::getMarkerMode() { return Tracker::markerMode; }
void TrackerSM::setPatternWidth(float width) {
  tracker->setPatternWidth(width);
};
void TrackerSM::setThreshold(int nValue) { tracker->setBorderWidth(nValue); }
void TrackerSM::setUndistortionMode(UNDIST_MODE nMode) {
  tracker->setUndistortionMode(nMode);
};

void TrackerSM2::setup(int w, int h, string camParamFile, int maxImagePatterns,
                       int pattWidth, int pattHeight, int pattSamples,
                       int maxLoadPatterns) {
  int width = w;
  int height = h;
  this->useBCH = false;
  float markerWidth = 40.0;
  float halfMarkerWidth = markerWidth / 2;
  //c[0] = 0;
  //c[1] = 0;

  // ----------------------------------  AR TK+ STUFF - ripped from the single
  // marker demo app

  // create a tracker that does:
  //  - "pattWidth" x "pattHeight" sized marker images (6x6 required for binary
  //  markers)
  //  - samples at a maximum of 6x6
  //  - works with luminance (gray) images
  //  - can load a maximum of "maxLoadPatterns" non-binary pattern
  //  - can detect a maximum of "maxImagePatterns" patterns in one image
  tracker = new ARToolKitPlus::TrackerSingleMarker(
      width, height, maxImagePatterns, pattWidth, pattHeight, pattSamples,
      maxLoadPatterns);
  //	const char* description = tracker->getDescription();
  //	printf("ARToolKitPlus compile-time information:\n%s\n\n", description);

  // set a logger so we can output error messages
  //    tracker->setLogger(&logger);
  //  - works with luminance (gray) images
  tracker->setPixelFormat(ARToolKitPlus::PIXEL_FORMAT_LUM);

  tracker->setImageProcessingMode(ARToolKitPlus::IMAGE_FULL_RES);

  // Initialize a multimarker tracker with
  // Camera and marker files
  // & near and far clipping values for the OpenGL projection matrix
  if (!tracker->init(camParamFile.c_str(), 1.0f, 1000.0f)) {

    printf("ERROR: init() failed\n");
    delete tracker;

    return;
  }
  tracker->getCamera()->printSettings();
  // define size of the marker
  // tracker->setPatternWidth(80);
  // multimarkers since it doesnt seem to have this option.

  // the marker in the BCH test image has a thin border...
  tracker->setBorderWidth(this->useBCH ? 0.125f : 0.250f);
  // tracker->setBorderWidth(0.250f);

  // set a threshold. alternatively we could also activate automatic
  // thresholding
  tracker->setThreshold(85);

  // let's use lookup-table undistortion for high-speed
  // note: LUT only works with images up to 1024x1024
  tracker->setUndistortionMode(ARToolKitPlus::UNDIST_LUT);
  // tracker->setUndistortionMode(ARToolKitPlus::UNDIST_STD);

  // RPP is more robust than ARToolKit's standard pose estimator
  tracker->setPoseEstimator(ARToolKitPlus::POSE_ESTIMATOR_RPP);

  // switch to simple ID based markers
  // use the tool in tools/IdPatGen to generate markers
  tracker->setMarkerMode(useBCH ? ARToolKitPlus::MARKER_ID_BCH
                                : ARToolKitPlus::MARKER_ID_SIMPLE);
  // tracker->activateVignettingCompensation(true);

  // tracker->setUseDetectLite(false);
}

vector<int> TrackerSM2::update(emscripten::val data_buffer) {
  vector<uint8_t> u8 =
      emscripten::convertJSArrayToNumberVector<uint8_t>(data_buffer);
  vector<int> marker = tracker->calc(u8.data());
  cout << "Marker is:" << marker[0] << endl;
  return marker;
}

ARToolKitPlus::TrackerSingleMarker *tracker;
int width, height;
bool useBCH;
float markerWidth, halfMarkerWidth;
float c[2];

void setup(int w, int h, string camParamFile, int maxImagePatterns,
           int pattWidth, int pattHeight, int pattSamples,
           int maxLoadPatterns) {
  width = w;
  height = h;
  useBCH = false;
  markerWidth = 40.0;
  halfMarkerWidth = markerWidth / 2;
  c[0] = 0;
  c[1] = 0;

  // ----------------------------------  AR TK+ STUFF - ripped from the single
  // marker demo app

  // create a tracker that does:
  //  - "pattWidth" x "pattHeight" sized marker images (6x6 required for binary
  //  markers)
  //  - samples at a maximum of 6x6
  //  - works with luminance (gray) images
  //  - can load a maximum of "maxLoadPatterns" non-binary pattern
  //  - can detect a maximum of "maxImagePatterns" patterns in one image
  tracker = new ARToolKitPlus::TrackerSingleMarker(
      width, height, maxImagePatterns, pattWidth, pattHeight, pattSamples,
      maxLoadPatterns);
  //	const char* description = tracker->getDescription();
  //	printf("ARToolKitPlus compile-time information:\n%s\n\n", description);

  // set a logger so we can output error messages
  //    tracker->setLogger(&logger);
  //  - works with luminance (gray) images
  tracker->setPixelFormat(ARToolKitPlus::PIXEL_FORMAT_LUM);

  tracker->setImageProcessingMode(ARToolKitPlus::IMAGE_FULL_RES);

  // Initialize a multimarker tracker with
  // Camera and marker files
  // & near and far clipping values for the OpenGL projection matrix
  if (!tracker->init(camParamFile.c_str(), 1.0f, 1000.0f)) {

    printf("ERROR: init() failed\n");
    delete tracker;

    return;
  }
  tracker->getCamera()->printSettings();
  // define size of the marker
  // tracker->setPatternWidth(80); // I'm not sure how to define the size with
  // multimarkers since it doesnt seem to have this option.

  // the marker in the BCH test image has a thin border...
  tracker->setBorderWidth(useBCH ? 0.125f : 0.250f);
  // tracker->setBorderWidth(0.250f);

  // set a threshold. alternatively we could also activate automatic
  // thresholding
  tracker->setThreshold(85);

  // let's use lookup-table undistortion for high-speed
  // note: LUT only works with images up to 1024x1024
  tracker->setUndistortionMode(ARToolKitPlus::UNDIST_LUT);
  // tracker->setUndistortionMode(ARToolKitPlus::UNDIST_STD);

  // RPP is more robust than ARToolKit's standard pose estimator
  tracker->setPoseEstimator(ARToolKitPlus::POSE_ESTIMATOR_RPP);

  // switch to simple ID based markers
  // use the tool in tools/IdPatGen to generate markers
  tracker->setMarkerMode(useBCH ? ARToolKitPlus::MARKER_ID_BCH
                                : ARToolKitPlus::MARKER_ID_SIMPLE);
  // tracker->setMarkerMode(ARToolKitPlus::MARKER_ID_SIMPLE);

  // tracker->activateVignettingCompensation(true);

  // tracker->setUseDetectLite(false);
}

vector<int> update(emscripten::val data_buffer) {
  vector<uint8_t> u8 =
      emscripten::convertJSArrayToNumberVector<uint8_t>(data_buffer);
  vector<int> marker = tracker->calc(u8.data());
  cout << "Marker is:" << marker[0] << endl;
  return marker;
}

float getConfidence() {
  tracker->selectBestMarkerByCf();
  return tracker->getConfidence();
};

emscripten::val getMVMatrix() {
  emscripten::val arr = emscripten::val::array();
  const ARFloat *ptr = tracker->getModelViewMatrix();
  for (auto i = 0; i < 16; i++) {
    arr.call<void>("push", ptr[i]);
  }
  return arr;
}

#include "bindings.cpp"