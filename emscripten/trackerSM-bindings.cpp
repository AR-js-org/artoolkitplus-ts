#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(trackerSM) {
  register_vector<int>("vector_int");

  enum_<PIXEL_FORMAT>("PIXEL_FORMAT")
      .value("PIXEL_FORMAT_ABGR", PIXEL_FORMAT_ABGR)
      .value("PIXEL_FORMAT_BGRA", PIXEL_FORMAT_BGRA)
      .value("PIXEL_FORMAT_BGR", PIXEL_FORMAT_BGR)
      .value("PIXEL_FORMAT_RGBA", PIXEL_FORMAT_RGBA)
      .value("PIXEL_FORMAT_RGB", PIXEL_FORMAT_RGB)
      .value("PIXEL_FORMAT_RGB565", PIXEL_FORMAT_RGB565)
      .value("PIXEL_FORMAT_LUM", PIXEL_FORMAT_LUM);

 class_<TrackerSM>("TrackerSingleMarker")
      .constructor<bool, int, int, int>()
      .function("setup", &TrackerSM::setup)
      .function("update", &TrackerSM::update)
      .function("addPattern", &TrackerSM::addPattern)
      .function("getConfidence", &TrackerSM::getConfidence)
      .function("getMarkerId", &TrackerSM::getMarkerId)
      .function("getMarkerPos", &TrackerSM::getMarkerPos)
      .function("getMarkerVertexes", &TrackerSM::getMarkerVertexes)
      .function("getModelViewMatrix", &TrackerSM::getMVMatrix)
      .function("getPixelFormat", &TrackerSM::getPixelFormat)
      .function("getProjectionMatrix", &TrackerSM::getProjectionMatrix)
      .function("printCameraSettings", &TrackerSM::printCameraSettings)
      .function("selectBestMarkerByCf", &TrackerSM::selectBestMarkerByCf)
      .function("setBorderWidth", &TrackerSM::setBorderWidth)
      .function("setMarkerMode", &TrackerSM::setMarkerMode)
      .function("setPixelFormat", &TrackerSM::setPixelFormat)
      .function("setPatternWidth", &TrackerSM::setPatternWidth)
      .function("setThreshold", &TrackerSM::setThreshold)
      .function("setUndistortionMode", &TrackerSM::setUndistortionMode);
};