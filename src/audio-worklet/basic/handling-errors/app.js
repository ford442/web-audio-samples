import DemoRunner from '../../../js/DemoRunner.js';

const runDemo = async () => {
  const context = new AudioContext();
  await context.audioWorklet.addModule('error-processor.js');

  const constructorErrorWorkletNode =
      new AudioWorkletNode(context, 'constructor-error');
  constructorErrorWorkletNode.onprocessorerror = (event) => {
    console.log('An error from AudioWorkletProcessor.constructor() was ' +
                'detected.', event);
  };

  const processErrorWorkletNode =
      new AudioWorkletNode(context, 'process-error');
  processErrorWorkletNode.onprocessorerror = (event) => {
    console.log('An error from AudioWorkletProcessor.process() was detected.',
                event);
  };
};

new DemoRunner('demo-runner', runDemo);