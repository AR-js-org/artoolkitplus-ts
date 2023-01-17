var file_count = 0;
import ARtoolKitPlus from '../build/artoolkitplus_em_ES6_debug.js'
import TrackerMultiMarker from '../build/trackerMM_ES6.js'
const trk = await TrackerMultiMarker()
const artoolkitplus = await ARtoolKitPlus()

let t;
export function loadCalib(url, cfg, callback, errorCallback) {
  var count = file_count++;
  var filename = '/load_calib_' + count + '.cal';
  var config = '/load_config_' + count + ".cfg";
  console.log(trk);
  var writeCallback = function () {
    t = new trk.TrackerMultiMarker(false, 320, 240, 80);
    console.log(t);
    if (!t.setup) {
      if (callback) callback(id); setTimeout(writeCallback, 10);
    } else {
      if(t.setup(filename, config,  8, 6, 6, 6, 0)) {
        console.log("Init TrackerMultiMarker");
      };
      if (callback) callback(t);
    }
  };
  if (typeof url === 'object') { // Maybe it's a byte array
    writeByteArrayToFS(filename, url, writeCallback);
  } else if (url.indexOf("\n") > -1) { // Or a string with the .cal path
    writeStringToFS(filename, url, writeCallback);
  } else {

   Promise.all(
      [
        new Promise((resolve, reject)=> { resolve(url)}), 
        new Promise((resolve, reject)=> { resolve(cfg)})
      ]
      ).then( f => {
        console.log(f);
        t = new trk.TrackerMultiMarker(false, 320, 240, 80);
        console.log(filename);
        console.log(config);
        t.setup(url, cfg, 8, 6, 6, 6, 0)
       })
  }
  return t;
}

// transfer image

function writeStringToFS(target, string, callback) {
  var byteArray = new Uint8Array(string.length);
  for (var i = 0; i < byteArray.length; i++) {
    byteArray[i] = string.charCodeAt(i) & 0xff;
  }
  writeByteArrayToFS(target, byteArray, callback);
}

function writeByteArrayToFS(target, byteArray, callback) {
  trk.FS.writeFile(target, byteArray, { encoding: 'binary' });
  callback(byteArray);
}

function writeByteArrayToFS2(target, target2, byteArray, byteArray2, callback) {
  trk.FS.writeFile(target, byteArray, { encoding: 'binary' });
  trk.FS.writeFile(target2, byteArray2, { encoding: 'binary' });
  callback(byteArray);
}