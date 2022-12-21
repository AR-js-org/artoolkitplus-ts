#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(artoolkitplus) {
  register_vector<int>("vector_int");

  emscripten::function("setup", &setup);
  emscripten::function("update", &update);
  emscripten::function("getConfidence", &getConfidence);
  emscripten::function("getModelViewMatrix", &getMVMatrix);

  enum_<PIXEL_FORMAT>("PIXEL_FORMAT")
      .value("PIXEL_FORMAT_ABGR", PIXEL_FORMAT_ABGR)
      .value("PIXEL_FORMAT_BGRA", PIXEL_FORMAT_BGRA)
      .value("PIXEL_FORMAT_BGR", PIXEL_FORMAT_BGR)
      .value("PIXEL_FORMAT_RGBA", PIXEL_FORMAT_RGBA)
      .value("PIXEL_FORMAT_RGB", PIXEL_FORMAT_RGB)
      .value("PIXEL_FORMAT_RGB565", PIXEL_FORMAT_RGB565)
      .value("PIXEL_FORMAT_LUM", PIXEL_FORMAT_LUM);

  enum_<UNDIST_MODE>("UNDIST_MODE")
      .value("UNDIST_NONE", UNDIST_NONE)
      .value("UNDIST_STD", UNDIST_STD)
      .value("UNDIST_LUT", UNDIST_LUT);

  enum_<MARKER_MODE>("MARKER_MODE")
      .value("MARKER_TEMPLATE", MARKER_TEMPLATE)
      .value("MARKER_ID_SIMPLE", MARKER_ID_SIMPLE)
      .value("MARKER_ID_BCH", MARKER_ID_BCH);

 class_<TrackerSM2>("TrackerSingleMarker2")
      .constructor<bool>()
      .function("setup", &TrackerSM2::setup)
      .function("update", &TrackerSM2::update);
      //.function("addPattern", &TrackerSM::addPattern)
      //.function("calc", &TrackerSM::calc)
      //.function("getConfidence", &TrackerSM::getConfidence)
      //.function("getMarkerMode", &TrackerSM::getMarkerMode)
      //.function("getModelViewMatrix", &TrackerSM::getMVMatrix)
      //.function("getPixelFormat", &TrackerSM::getPixelFormat)
      //.function("init", &TrackerSM::init)
      //.function("printCameraSettings", &TrackerSM::printCameraSettings)
      //.function("selectBestMarkerByCf", &TrackerSM::selectBestMarkerByCf)
      //.function("setBorderWidth", &TrackerSM::setBorderWidth)
      //.function("setMarkerMode", &TrackerSM::setMarkerMode)
      //.function("setPixelFormat", &TrackerSM::setPixelFormat)
      //.function("setPatternWidth", &TrackerSM::setPatternWidth)
      //.function("setThreshold", &TrackerSM::setThreshold)
      //.function("setUndistortionMode", &TrackerSM::setUndistortionMode);

  class_<TrackerSM>("TrackerSingleMarker")
      .constructor<int, int, int, int, int, int, int>()
      .function("addPattern", &TrackerSM::addPattern)
      .function("calc", &TrackerSM::calc)
      .function("getConfidence", &TrackerSM::getConfidence)
      //.function("getMarkerMode", &TrackerSM::getMarkerMode)
      .function("getModelViewMatrix", &TrackerSM::getMVMatrix)
      .function("getPixelFormat", &TrackerSM::getPixelFormat)
      .function("init", &TrackerSM::init)
      .function("printCameraSettings", &TrackerSM::printCameraSettings)
      .function("selectBestMarkerByCf", &TrackerSM::selectBestMarkerByCf)
      .function("setBorderWidth", &TrackerSM::setBorderWidth)
      .function("setMarkerMode", &TrackerSM::setMarkerMode)
      .function("setPixelFormat", &TrackerSM::setPixelFormat)
      .function("setPatternWidth", &TrackerSM::setPatternWidth)
      .function("setThreshold", &TrackerSM::setThreshold)
      .function("setUndistortionMode", &TrackerSM::setUndistortionMode);
};