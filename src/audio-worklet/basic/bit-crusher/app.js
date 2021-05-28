import DemoRunner from '../../../js/DemoRunner.js';

const runDemo = async () => {
  const context = new AudioContext();
  await context.audioWorklet.addModule('bit-crusher-processor.js');
  const oscillator = new OscillatorNode(context);
  const bitCrusher =
      new AudioWorkletNode(context, 'bit-crusher-processor');
  const paramBitDepth = bitCrusher.parameters.get('bitDepth');
  const paramReduction = bitCrusher.parameters.get('frequencyReduction');

  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 5000;
  paramBitDepth.setValueAtTime(1, 0);

  oscillator.connect(bitCrusher).connect(context.destination);

  // |frequencyReduction| parameters will be automated and changing over
  // time. Thus its parameter array will have 128 values.
  paramReduction.setValueAtTime(0.01, 0);
  paramReduction.linearRampToValueAtTime(0.1, 4);
  paramReduction.exponentialRampToValueAtTime(0.01, 8);

  // Play the tone for 8 seconds.
  oscillator.start();
  oscillator.stop(8);
};

new DemoRunner('demo-runner', runDemo);