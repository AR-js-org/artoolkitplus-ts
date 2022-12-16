cd build
emcmake cmake .. -DCMAKE_BUILD_TYPE="Release" -DCMAKE_EXE_LINKER_FLAGS="-fno-inline-functions"
emmake make
emcmake cmake .. -DCMAKE_BUILD_TYPE="Debug" -DCMAKE_EXE_LINKER_FLAGS="-fno-inline-functions"
emmake make
