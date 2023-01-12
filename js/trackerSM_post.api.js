Module["onRuntimeInitialized"] = function() {
    var event = new Event('trackerSM-loaded');
    window.dispatchEvent(event);
}