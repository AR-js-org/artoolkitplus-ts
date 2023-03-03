#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(TrackerMM) {
  register_vector<int>("vector_int");

  enum_<PIXEL_FORMAT>("PIXEL_FORMAT")
      .value("PIXEL_FORMAT_ABGR", PIXEL_FORMAT_ABGR)
      .value("PIXEL_FORMAT_BGRA", PIXEL_FORMAT_BGRA)
      .value("PIXEL_FORMAT_BGR", PIXEL_FORMAT_BGR)
      .value("PIXEL_FORMAT_RGBA", PIXEL_FORMAT_RGBA)
      .value("PIXEL_FORMAT_RGB", PIXEL_FORMAT_RGB)
      .value("PIXEL_FORMAT_RGB565", PIXEL_FORMAT_RGB565)
      .value("PIXEL_FORMAT_LUM", PIXEL_FORMAT_LUM);

 class_<TrackerMM>("TrackerMultiMarker")
      .constructor<bool, int, int, int>()
      .function("setup", &TrackerMM::setup)
      .function("update", &TrackerMM::update)
      .function("getMarkerId", &TrackerMM::getMarkerId)
      .function("getMarkerPos", &TrackerMM::getMarkerPos)
      .function("getMarkerVertexes", &TrackerMM::getMarkerVertexes)
      .function("getModelViewMatrix", &TrackerMM::getMVMatrix)
      .function("getPixelFormat", &TrackerMM::getPixelFormat)
      .function("getProjectionMatrix", &TrackerMM::getProjectionMatrix)
      .function("printCameraSettings", &TrackerMM::printCameraSettings)
      .function("setBorderWidth", &TrackerMM::setBorderWidth)
      .function("setMarkerMode", &TrackerMM::setMarkerMode)
      .function("setPixelFormat", &TrackerMM::setPixelFormat)
      .function("setThreshold", &TrackerMM::setThreshold)
      .function("setUndistortionMode", &TrackerMM::setUndistortionMode);
};