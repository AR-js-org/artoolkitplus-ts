#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(artoolkitplus) {
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
      .constructor<int, int, int, int, int, int, int>()
      .function("init", &TrackerSM::init)
      .function("printCameraSettings", &TrackerSM::printCameraSettings)
      .function("setPixelFormat", &TrackerSM::setPixelFormat)
      .function("setPatternWidth", &TrackerSM::setPatternWidth)
      .function("calc", &TrackerSM::calc, allow_raw_pointer<uint8_t>());
};