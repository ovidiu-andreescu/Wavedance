var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var source = audioCtx.createBufferSource();

var analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

var request = new XMLHttpRequest();
request.open('GET', '/public/uploads/file.mp3', true);
request.responseType = 'arraybuffer';

request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        
        source.start();
    });
};

request.send();

var dataArray = new Uint8Array(analyser.frequencyBinCount);

function updateVisualization() {
    analyser.getByteFrequencyData(dataArray);

    requestAnimationFrame(updateVisualization);
}

updateVisualization();
