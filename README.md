# artoolkitplus-ts

[ARToolKitPlus](https://github.com/paroj/artoolkitplus) library ported to the web thanks to Emscripten compiler. Things are evolving faster and code can change frequently, infact is a WIP.

## Build libs

Emscripten libs are exported as ES6 modules, yopu can find two libs at the moment:

- `artoolkitplus_em_ES6.js` load the basic artoolkitplus enums and other functions.
- `trackerSM_ES6.js` load the TrackerSingleMarker class

For every libs there is the debug version, useful when you are developing.

## Typescript feature

The project also support the Typescript language. Typescript source code is in the `/src` folder, and is bundled in the dist lib thanks to webpack. You can find type definitions in the `/types` folder.

## Future features

- npm package
- Multi Marker support
- more examples

## Examples

You can find a simple Single Marker example in the example folder. It load a static image and it detect the marker in it. Check in the browser console for the messages.
If you want you can also test the video example ( stream from webcam ), check the output in the console, and a threejs example.

### List of examples:

- example_ES6.html
- example-ts-module.html
- example-ts.html
- example-video-hiro-ts.html
- example-video-ts.html
- threejs-video-ts.html
