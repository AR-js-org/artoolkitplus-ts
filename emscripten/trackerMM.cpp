#include "trackerMM.h"

void TrackerMM::setup(string camParamFile, string multiFile, int maxImagePatterns, int pattWidth,
                      int pattHeight, int pattSamples, int maxLoadPatterns) {
  // ----------------------------------  AR TK+ STUFF - ripped from the single
  // marker demo app

  // create a tracker that does:
  //  - "pattWidth" x "pattHeight" sized marker images (6x6 required for binary
  //  markers)
  //  - samples at a maximum of 6x6
  //  - works with luminance (gray) images
  //  - can load a maximum of "maxLoadPatterns" non-binary pattern
  //  - can detect a maximum of "maxImagePatterns" patterns in one image
  tracker = make_unique<ARToolKitPlus::TrackerMultiMarker>(
      this->mWidth, this->mHeight, maxImagePatterns, pattWidth, pattHeight,
      pattSamples, maxLoadPatterns);

  // set a logger so we can output error messages
  //    tracker->setLogger(&logger);
  //  - works with luminance (gray) images
  tracker->setPixelFormat(ARToolKitPlus::PIXEL_FORMAT_LUM);

  tracker->setImageProcessingMode(ARToolKitPlus::IMAGE_FULL_RES);

  // Initialize a Single Marker Tracker with
  // Camera and near and far clipping values for the OpenGL projection matrix
  /*if (!tracker->init(camParamFile.c_str(), multiFile.c_str(), 1.0f, 1000.0f)) {

    printf("ERROR: init() failed\n");
    tracker = nullptr;

    return;
  }*/
  if (!tracker->loadCameraFile(camParamFile.c_str(),  1.0f, 1000.0f)) {
    printf("ERROR: loadCameraFile() failed\n");
    tracker = nullptr;

    return;
  }
  tracker->getCamera()->printSettings();
  // define size of the marker
  //tracker->setPatternWidth(this->mPatternWidth);
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

int TrackerMM::getMarkerId() { return marker_info->id; };

emscripten::val TrackerMM::getMarkerPos() {
  emscripten::val obj = emscripten::val::object();
  obj.set("x", marker_info->pos[0]);
  obj.set("y", marker_info->pos[1]);
  return obj;
}

emscripten::val TrackerMM::getMarkerVertexes() {
  emscripten::val vertexes = emscripten::val::array();
  for (auto x = 0; x < 4; x++) {
    for (auto y = 0; y < 2; y++) {
      vertexes.call<void>("push", marker_info->vertex[x][y]);
    }
  }
  return vertexes;
}

int TrackerMM::update(emscripten::val data_buffer) {
  vector<uint8_t> u8 =
      emscripten::convertJSArrayToNumberVector<uint8_t>(data_buffer);
  return tracker->calc(u8.data());
}

emscripten::val TrackerMM::getMVMatrix() {
  emscripten::val arr = emscripten::val::array();
  const ARFloat *ptr = tracker->getModelViewMatrix();
  for (auto i = 0; i < 16; i++) {
    arr.call<void>("push", ptr[i]);
  }
  return arr;
}

bool TrackerMM::setPixelFormat(PIXEL_FORMAT nFormat) {
  return tracker->setPixelFormat(nFormat);
}

PIXEL_FORMAT TrackerMM::getPixelFormat() { return tracker->getPixelFormat(); }

emscripten::val TrackerMM::getProjectionMatrix() {
  emscripten::val arr = emscripten::val::array();
  const ARFloat *ptr = tracker->getProjectionMatrix();
  for (auto i = 0; i < 16; i++) {
    arr.call<void>("push", ptr[i]);
  }
  return arr;
}

void TrackerMM::printCameraSettings() {
  tracker->getCamera()->printSettings();
};

void TrackerMM::setBorderWidth(ARFloat nFraction) {
  tracker->setBorderWidth(nFraction);
}

void TrackerMM::setMarkerMode(MARKER_MODE nMarkerMode) {
  tracker->setMarkerMode(nMarkerMode);
};

void TrackerMM::setThreshold(int nValue) { tracker->setBorderWidth(nValue); }

void TrackerMM::setUndistortionMode(UNDIST_MODE nMode) {
  tracker->setUndistortionMode(nMode);
};

#include "TrackerMM-bindings.cpp"