const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (container, element) {
  this.container = container;
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  document.addEventListener('keydown', (event) => {

    const enteredChar = event.key;
    this.processKey(enteredChar);
  });

  document.addEventListener('paste', (event) => {
    const pastedText = event.clipboardData.getData('text');
    this.processPaste(pastedText);
  })

  this.container.addEventListener('mouseover', () => {
    PubSub.publish("SystemView:UpdateMessage", 'input-hover');
  })

  this.container.addEventListener('click', () => {
    PubSub.publish("SystemView:UpdateMessage", 'input-click');
  })

  PubSub.subscribe("SelectView:FlickerTimer", () => {
    this.switchFlicker();
  });

  this.runFlicker();
};

SelectView.prototype.switchFlicker = function () {

  const switchObject = {off: 'on', on: 'off'};

  const flicker = document.querySelector('#flicker');

  const oldClass = flicker.classList.value;
  const newClass = switchObject[oldClass];

  flicker.classList.remove(oldClass);
  flicker.classList.add(newClass);

  window.setTimeout(this.runFlicker, 500);
};

SelectView.prototype.runFlicker = function () {
  PubSub.publish("SelectView:FlickerTimer");
};


SelectView.prototype.processKey = function (char) {
  if (char === "Enter") {
    PubSub.publish( "NumberInfo:NeedToQueryAPI",this.element.textContent);
    this.playTypeSound('#return');
    this.element.textContent = '';
  } else if (char === "Backspace") {
    this.element.textContent = this.backspace();
    this.playTypeSound('#keystroke');
  } else if (!isNaN(char)) {
    this.element.textContent += char;
    this.playTypeSound('#keystroke');
  } else {
    PubSub.publish("SystemView:UpdateMessage", 'non-number-entered');
  }
};

SelectView.prototype.processPaste = function (text) {
  let result = 'paste-unsuccessful';

  if (this.isAllDigits(text)) {
    this.element.textContent += text;
    result = 'paste-successful';
  }

  PubSub.publish("SystemView:UpdateMessage", result);
};

SelectView.prototype.isAllDigits = function (textArray) {
  return textArray.split('').every(char => !isNaN(char));
};

SelectView.prototype.backspace = function () {
  return this.element.textContent.slice(0, -1);
};

SelectView.prototype.playTypeSound = function (audioID) {
  const keySound = document.querySelector(audioID);
  keySound.volume = 0.5;
  keySound.play();
};


module.exports = SelectView;
