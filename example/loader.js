var file_count = 0;
function loadCalib(url, callback, errorCallback) {
  var filename = '/load_calib_' + file_count++ + '.cal';
  var writeCallback = function () {
    const t = new Module.TrackerSingleMarker(640, 480, 8, 6, 6, 6, 0)
    if (!t.init) {
      if (callback) callback(id); setTimeout(writeCallback, 10);
    } else {
      var id = t.init(filename,  1.0, 1000.0);
      console.log(id);
      /* printVameraSettings will print the loaded camera settings something like:

        ARToolKitPlus: CamSize 640 , 480
        ARToolKitPlus: cc = [259.38  213.46]  fc = [492.37  493.26]
        ARToolKitPlus: kc = [-0.4186 0.1791 -0.0002 0.0026 0.0000 0.0000]
        ARToolKitPlus: undist_iterations = 10

      */
      t.printCameraSettings();
      t.setPatternWidth(2.0);
      var vec = new Module.vector_int()
      vec = t.calc(01257)// = t.calc(0)
      console.log(vec.size());
      if (callback) callback(id);
    }
  };
  if (typeof url === 'object') { // Maybe it's a byte array
    writeByteArrayToFS(filename, url, writeCallback);
  } else if (url.indexOf("\n") > -1) { // Or a string with the .cal path
    writeStringToFS(filename, url, writeCallback);
  } else {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.arrayBuffer();
      })
      .then(buff => {
        let buffer = new Uint8Array(buff)
        writeByteArrayToFS(filename, buffer, writeCallback);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
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
  Module.FS.writeFile(target, byteArray, { encoding: 'binary' });
  callback(byteArray);
}