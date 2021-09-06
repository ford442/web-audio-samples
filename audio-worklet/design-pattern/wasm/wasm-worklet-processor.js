import Module from './simple-kernel.wasmmodule.js';
import {RENDER_QUANTUM_FRAMES,MAX_CHANNEL_COUNT,HeapAudioBuffer} from '../lib/wasm-audio-helper.js';
/**
 * A simple demonstration of WASM-powered AudioWorkletProcessor.
 *
 * @class WASMWorkletProcessor
 * @extends AudioWorkletProcessor
 */
class WASMWorkletProcessor extends AudioWorkletProcessor{
/**
 * @constructor
 */
constructor(){
super();
this._heapInputBuffer=new HeapAudioBuffer(Module,RENDER_QUANTUM_FRAMES,2,MAX_CHANNEL_COUNT);
this._heapOutputBuffer=new HeapAudioBuffer(Module,RENDER_QUANTUM_FRAMES,2,MAX_CHANNEL_COUNT);
this._kernel=new Module.SimpleKernel();
}
/**
 * System-invoked process callback function.
 * @param  {Array} inputs Incoming audio stream.
 * @param  {Array} outputs Outgoing audio stream.
 * @param  {Object} parameters AudioParam data.
 * @return {Boolean} Active source flag.
 */
process(inputs,outputs,parameters){
let input=inputs[0];
let output=outputs[0];
let channelCount=input.length;
this._heapInputBuffer.adaptChannel(channelCount);
this._heapOutputBuffer.adaptChannel(channelCount);
for(let channel=0; channel<channelCount; ++channel){
this._heapInputBuffer.getChannelData(channel).set(input[channel]);
}
this._kernel.process(this._heapInputBuffer.getHeapAddress(),this._heapOutputBuffer.getHeapAddress(),channelCount);
for(let channel=0; channel<channelCount; ++channel){
output[channel].set(this._heapOutputBuffer.getChannelData(channel));
}
return true;
}}
registerProcessor('wasm-worklet-processor',WASMWorkletProcessor);
