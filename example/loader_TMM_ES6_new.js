import ARtoolKitPlus from '../build/artoolkitplus_em_ES6_debug.js'
import TrackerMultiMarker from '../build/trackerMM_ES6_debug.js'
const trk = await TrackerMultiMarker()
const artoolkitplus = await ARtoolKitPlus()
var multi_marker_count = 0;

function bytesToString(array) {
    return String.fromCharCode.apply(String, array);
}

function parseMultiFile(bytes) {
    var str = bytesToString(bytes);
    console.log(str);

    var lines = str.split('\n');
    console.log(lines);

    var files = [];

    var state = 0; // 0 - read,
    var markers = 0;

    lines.forEach(function (line) {
        line = line.trim();
        console.log(line);
        if (!line || line.startsWith('#')) return; // FIXME: Should probably be `if (line.indexOf('#') === 0) { return; }`

        switch (state) {
            case 0:
                markers = +line;
                console.log(markers);
                state = 1;
                return;
            case 1: // filename or barcode
                if (!line.match(/^\d+$/)) {
                    files.push(line);
                }
            case 2: // width
            case 3: // matrices
            case 4:
                state++;
                return;
            case 5:
                state = 1;
                return;
        }
    });
    console.log(files);

    return files;
}

let t;
export function addMultiMarker(arId, url, callback, onError) {
    var filename = '/multi_marker_' + multi_marker_count++;
    ajax(url, filename, function (bytes) {
        var files = parseMultiFile(bytes);
        t = new trk.TrackerMultiMarker(false, 320, 240, 40);

        function ok() {
            //var markerID = Module._addMultiMarker(arId, filename);
            var markerID = 0;
            t.setup(filename, filename, 8, 6, 6, 6, 0)

            //var markerNum = Module.getMultiMarkerNum(arId, markerID);
            var markerNum = 0;
            if (callback) callback(markerID, markerNum);
        }

        if (!files.length) return ok();

        var path = url.split('/').slice(0, -1).join('/');
        files = files.map(function (file) {
            return [path + '/' + file, file]
        });
        console.log(files);

        ajaxDependencies(files, ok);
    }, function (error) { if (onError) onError(error) });
}

// transfer image
function writeStringToFS(target, string, callback) {
    var byteArray = new Uint8Array(string.length);
    for (var i = 0; i < byteArray.length; i++) {
        byteArray[i] = string.charCodeAt(i) & 0xff;
    }
    writeByteArrayToFS(target, byteArray, callback);
}

function writeByteArrayToFS(target, byteArray, callback, prefix) {
    trk.FS.writeFile(target, byteArray, { encoding: 'binary' });
    // console.log('FS written', target);
    
    callback(byteArray, prefix);
}

function ajax(url, target, callback, errorCallback, prefix) {
    var oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer'; // blob arraybuffer

    oReq.onload = function () {
        if (this.status == 200) {
            // console.log('ajax done for ', url);
            var arrayBuffer = oReq.response;
            var byteArray = new Uint8Array(arrayBuffer);
            writeByteArrayToFS(target, byteArray, callback, prefix);
        }
        else {
            errorCallback(this.status);
        }
    };

    oReq.send();
}

function ajaxDependencies(files, callback) {
    var next = files.pop();
    if (next) {
        console.log('next:', next);
        ajax(next[0], next[1], function () {
            ajaxDependencies(files, callback);
        }, function(error) {
            console.log(error);
        });
    } else {
        callback();
    }
}