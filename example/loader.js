var file_count = 0;

function loadCalib(url, callback, errorCallback) {
  var filename = '/load_calib_' + file_count++ + '.cal';
  let t;
  var writeCallback = function () {
    t = new Module.TrackerSingleMarker(false, 320, 240, 80);
    if (!t.setup) {
      if (callback) callback(id); setTimeout(writeCallback, 10);
    } else {
      if(t.setup(filename,  8, 6, 6, 6, 0)) {
        console.log("Init TrackerSingleMarker");
      };
      if (callback) callback(t);
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
  Module.FS.writeFile(target, byteArray, { encoding: 'binary' });
  callback(byteArray);
}