class DemoConsole {
  constructor(maximumLines) {
    this.maximumLines_ = maximumLines || 5;
    this.containerEl_ = document.createElement('div');
    this.containerEl_.style.cssText = `
        margin-top: 1rem; font-family: monospace; font-size: 0.75em;
        color: #999;
    `;
  }

  getContainer() {
    return this.containerEl_;
  }

  log(message) {
    const newLine = document.createElement('div');
    newLine.textContent = `[${performance.now().toFixed(2)}] ${message}`;
    this.containerEl_.appendChild(newLine);
    if (this.containerEl_.children.length > this.maximumLines_) {
      this.containerEl_.removeChild(this.containerEl_.firstChild);
    }
  }

  clear() {
    this.containerEl_.innerHTML = '';
  }
}

class DemoRunner {
  constructor(targetElementId, demoCallback) {
    this.targetElementId_ = targetElementId;
    this.demoCallback_ = demoCallback;
    this.containerEl_ = null;
    this.buttonEl_ = null;
    this.demoConsole_ = new DemoConsole(8);
    this.isStarted_ = false;
    window.addEventListener('load', this.onload_.bind(this));
  }

  onload_() {
    this.buttonEl_ = document.createElement('button');
    this.buttonEl_.style.cssText = 'width: 8em;';
    this.buttonEl_.disabled = true;
    this.buttonEl_.textContent = '⏳';

    this.demoConsole_.log('Initializing...');
    
    this.containerEl_ = document.getElementById(this.targetElementId_);
    this.containerEl_.appendChild(this.buttonEl_);
    this.containerEl_.appendChild(this.demoConsole_.getContainer());

    this.buttonEl_.addEventListener('click', this.onButtonClick_.bind(this));
    
    this.buttonEl_.textContent = 'START';
    this.buttonEl_.disabled = false;
    this.demoConsole_.log('Ready.');
  }

  onButtonClick_(event) {
    if (this.isStarted_) 
      return;
    
    this.demoCallback_();
    this.buttonEl_.disabled = true;
    this.buttonEl_.textContent = 'Playing...';
    this.demoConsole_.log('Executed demo function.');
  }
}

export default DemoRunner;
