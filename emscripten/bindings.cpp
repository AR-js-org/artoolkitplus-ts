#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(artoolkitplus) {
  register_vector<int>("vector_int");
  class_<TrackerSM>("TrackerSingleMarker")
      .constructor<int, int, int, int, int, int, int>()
      .function("init", &TrackerSM::init)
      .function("printCameraSettings", &TrackerSM::printCameraSettings)
      .function("setPatternWidth", &TrackerSM::setPatternWidth)
      .function("calc", &TrackerSM::calc, allow_raw_pointer<uint8_t>());
};