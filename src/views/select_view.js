const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (container) {
  this.container = container;
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

  const switchFlicker = function () {
    const switchObject = {off: 'on', on: 'off'};
    const flicker = document.querySelector('#flicker');

    const oldClass = flicker.classList.value;
    const newClass = switchObject[oldClass];

    flicker.classList.remove(oldClass);
    flicker.classList.add(newClass);

    window.setTimeout(switchFlicker, 500);

  };

  window.setTimeout(switchFlicker, 500);
};

SelectView.prototype.processKey = function (char) {
  if (char === "Enter") {
    PubSub.publish( "NumberInfo:NeedToQueryAPI",this.container.textContent);
    this.container.textContent = '';
  } else if (char === "Backspace") {
    this.container.textContent = this.backspace();
  } else if (!isNaN(char)) {
    this.container.textContent += char;
  } else {
    return;
  }
};

SelectView.prototype.processPaste = function (text) {
  if (this.isAllDigits(text)) {this.container.textContent += text};
};

SelectView.prototype.isAllDigits = function (textArray) {
  return textArray.split('').every(char => !isNaN(char));
};

SelectView.prototype.backspace = function () {
  return this.container.textContent.slice(0, -1);
};

// SelectView.prototype.switchFlicker = function () {
//
//   const switchObject = {off: 'on', on: 'off'};
//
//   const flicker = document.querySelector('#flicker');
//
//   const oldClass = flicker.classList.value;
//   const newClass = switchObject[oldClass];
//
//   flicker.classList.remove(oldClass);
//   flicker.classList.add(newClass);
//
//   console.log(this);
//   window.setTimeout(switchFlicker, 500);
// };

module.exports = SelectView;
