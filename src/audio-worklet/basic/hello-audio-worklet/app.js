import DemoRunner from '../../../js/DemoRunner.js';

const runDemo = async () => {
  const context = new AudioContext();
  await context.audioWorklet.addModule('bypass-processor.js');
  const oscillator = new OscillatorNode(context);
  const bypasser = new AudioWorkletNode(context, 'bypass-processor');
  oscillator.connect(bypasser).connect(context.destination);
  oscillator.start();
};

new DemoRunner('demo-runner', runDemo);