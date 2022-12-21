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

#include "bindings.cpp"