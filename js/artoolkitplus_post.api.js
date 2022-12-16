Module["onRuntimeInitialized"] = function() {
    var event = new Event('artoolkitplus-loaded');
    window.dispatchEvent(event);
}