var file_count = 0;
import ARtoolKitPlus from '../build/artoolkitplus_em_ES6_debug.js'
import TrackerMultiMarker from '../build/trackerMM_ES6.js'
const trk = await TrackerMultiMarker()

let t;
export async function loadCalib(url, cfg, callback, errorCallback) {
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
      if (t.setup(filename, config, 8, 6, 6, 6, 0)) {
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

    const storeCalib = function (url, target) {
      console.log(url);
      fetchData(url, target);
      return target;
    };

    const storeConfig = function (cfg, target) {
      console.log(cfg);
      fetchData(cfg, target);
      return target;
    };

    const promises = [
      new Promise((resolve, reject) => resolve(storeCalib(url, filename))),
      new Promise((resolve, reject) => resolve(storeConfig(cfg, config)))
    ];

    Promise.all(promises).then(
      result => { 
      console.log(result);
      t = new trk.TrackerMultiMarker(false, 320, 240, 80);
      t.setup(result[0], result[1], 8, 6, 6, 6, 0);
    })
    callback(t)
    return t;
  }
}
function fetchData(url, target) {
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.arrayBuffer();
  })
    .then(buff => {
      console.log(buff);
      let data = new Uint8Array(buff)
      console.log(data);
      _storeDataFile(data, target)
    })
}

function _storeDataFile(data, target) {
  // FS is provided by emscripten
  // Note: valid data must be in binary format encoded as Uint8Array
  trk.FS.writeFile(target, data, {
    encoding: 'binary'
  });
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