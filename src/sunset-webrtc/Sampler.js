
import EventEmitter from './EventEmitter';

function Sampler() {
    this.audioContext = new AudioContext();
    this.context = {};
}
Sampler.prototype = Object.assign(new EventEmitter(), {
    sampling(stream, options) {
        var context = this.context[stream.id] = {};
        var audioContext = this.audioContext;
        var audioInput = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser();
        audioInput.connect(analyser);
        this.reSampling(analyser, options);
    },
    reSampling(analyser, options) {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var result = this._sampling(array, options);
        this.emit('sampling', result);
        requestAnimationFrame(() => {
            this.reSampling(analyser, options);
        });
    },
    _sampling(array, options) {
        options = options || {};
        var step = options.step || 10,
            start = options.start || 0,
            end = options.end || array.length;
        var result = [];
        for (var i = start, l = array.length; i < l && i < end; i += step) {
            result.push(array[i]);
        }
        return result;
    }
});
Sampler.prototype.constructor = Sampler;

module.exports = Sampler;