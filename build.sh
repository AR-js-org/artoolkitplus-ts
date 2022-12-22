cd build
emcmake cmake .. -DCMAKE_BUILD_TYPE="Release"
emmake make
emcmake cmake .. -DCMAKE_BUILD_TYPE="Debug"
emmake make
