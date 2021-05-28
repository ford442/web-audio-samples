import DemoRunner from '../../../js/DemoRunner.js';

// Extends AudioWorkletNode to simplify the cross-thread message posting.
class MessengerWorkletNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'messenger-processor');
    this.counter_ = 0;
    this.port.onmessage = this.handleMessage_.bind(this);
  }

  handleMessage_(event) {
    console.log(`[MessengerWorkletNode.handleMessage_] ${event.data.message}` +
                `(${event.data.contextTimestamp})`);
    if (++this.counter_ === 5) {
      this.port.postMessage({
        message: 'MessengerWorkletNode received 5 messages!',
        contextTimestamp: this.context.currentTime,
      });
      this.counter_ = 0;
    }
  }
}

const runDemo = async () => {
  const context = new AudioContext();
  await context.audioWorklet.addModule('messenger-processor.js');
  const messengerWorkletNode = new MessengerWorkletNode(context);
};

new DemoRunner('demo-runner', runDemo);