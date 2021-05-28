let isFirstDetection_ = true;
let isAudioWorkletAvailable_ = false;

const detectAudioWorklet = () => {
  if (!isFirstDetection_) {
    return isAudioWorkletAvailable_;
  }
  
  let context = new OfflineAudioContext(1, 1, 44100);
  isAudioWorkletAvailable_ = Boolean(
      context.audioWorklet &&
      typeof context.audioWorklet.addModule === 'function');
  isFirstDetection_ = false;
  return isAudioWorkletAvailable_;
};

export default detectAudioWorklet;
