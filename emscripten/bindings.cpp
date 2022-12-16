#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(artoolkitplus) {
  class_<TrackerSM>("TrackerSingleMarker")
      .constructor<int, int, int, int, int, int, int>()
      .function("init", &TrackerSM::init);
};