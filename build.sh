cd build
echo "Preparing Release libs.........."
echo "Configuring with cmake"
emcmake cmake ..  -DARTK_USE_BOOST=true -DCMAKE_BUILD_TYPE="Release"
echo "Building the libs"
emmake make
echo "Preparing Debug libs..........."
echo "Configuring with cmake"
emcmake cmake ..  -DARTK_USE_BOOST=true -DCMAKE_BUILD_TYPE="Debug"
echo "Building the libs"
emmake make
