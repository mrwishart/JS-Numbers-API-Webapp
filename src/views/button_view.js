const PubSub = require('../helpers/pub_sub.js');

const ButtonView = function (button) {
  this.button = button;
  this.power = false;
}

ButtonView.prototype.bindEvents = function () {

  this.setButton();

  PubSub.subscribe('ButtonView:DisableButton', (event) => {
    const timing = event.detail;
    this.disableButton(timing);
  })

  PubSub.subscribe('ButtonView:EnableButton', () => {
    this.setButton();
  })

};

ButtonView.prototype.setButton = function () {

  this.button.addEventListener('mousedown', () => {
    this.updateButtonColour();
  });
  this.button.addEventListener('mouseup', () => {
    this.changePower();
  })

  this.button.addEventListener('mouseover', this.systemMessage);
};

ButtonView.prototype.systemMessage = function () {
  PubSub.publish("SystemView:UpdateMessage", 'power-button-hover');
};

ButtonView.prototype.updateButtonColour = function () {
  const switchObject = {
    'power-button-off': 'power-button-on',
    'power-button-on': 'power-button-off'
  };
  const currentClass = this.button.classList;
  this.button.classList.replace(currentClass, switchObject[currentClass]);
};

ButtonView.prototype.disableButton = function (timing) {
  const cloneButton = this.button.cloneNode(true);
  const containerElement = this.button.parentElement;

  containerElement.removeChild(this.button);
  containerElement.appendChild(cloneButton);

  this.button = cloneButton;

  setTimeout(() => PubSub.publish('ButtonView:EnableButton'), timing);
};

ButtonView.prototype.changePower = function () {

  this.playClickSound();

  const currentClass = this.coverClass(this.power);
  const newClass = this.coverClass(!this.power);

  const screenCover = document.getElementsByClassName(currentClass)[0];
  screenCover.classList.replace(currentClass, newClass);

  this.power = !this.power;

  this.powerChangeMessages();
};

ButtonView.prototype.coverClass = function (check) {
  return check ? 'cover-on' : 'cover-off';
};

ButtonView.prototype.playClickSound = function () {
  document.querySelector(this.correctSound()).play();
};

ButtonView.prototype.correctSound = function () {
  return this.power ? '#click-off' : '#click-on';
};

ButtonView.prototype.powerChangeMessages = function () {

  PubSub.publish("SelectView:PowerChange", this.power);
  
  if (this.power) {
    PubSub.publish("SystemView:UpdateMessage", 'loading');
  } else {
    PubSub.publish("OutputView:ResetQueryList");
  }
}

module.exports = ButtonView;
