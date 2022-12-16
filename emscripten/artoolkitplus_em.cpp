#include <ARToolKitPlus/TrackerSingleMarker.h>
#include <iostream>

using namespace ARToolKitPlus;
using namespace std;

class TrackerSM : public TrackerSingleMarker {
public:
  TrackerSM(int imWidth, int imHeight, int maxImagePatterns = 8,
            int pattWidth = 6, int pattHeight = 6, int pattSamples = 6,
            int maxLoadPatterns = 0)
      : TrackerSingleMarker(imWidth, imHeight, maxImagePatterns, pattWidth,
                            pattHeight, pattSamples, maxLoadPatterns) {}

  bool init(std::string paramFile, ARFloat nearCLip, ARFloat nFarClip) {
    return this->init(paramFile.c_str(), nearCLip, nFarClip);
  }
};

#include "bindings.cpp"