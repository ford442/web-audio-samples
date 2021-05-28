import DemoRunner from '../../../js/DemoRunner.js';

const runDemo = async () => {
  const context = new AudioContext();
  await context.audioWorklet.addModule('one-pole-processor.js');
  const oscillator = new OscillatorNode(context);
  const filter = new AudioWorkletNode(context, 'one-pole-processor');
  const frequencyParam = filter.parameters.get('frequency');

  oscillator.connect(filter).connect(context.destination);
  oscillator.start();

  frequencyParam
      .setValueAtTime(0.01, 0)
      .exponentialRampToValueAtTime(context.sampleRate * 0.5, 4.0)
      .exponentialRampToValueAtTime(0.01, 8.0);
};

new DemoRunner('demo-runner', runDemo);
