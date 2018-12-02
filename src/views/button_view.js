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
  const click = this.power ? '#click-off' : '#click-on';
  const clickSound = document.querySelector(click);
  clickSound.play();

  const switchCover = {
    'cover-on': 'cover-off',
    'cover-off': 'cover-on'
  };

  const coverClass = this.power ? 'cover-on' : 'cover-off';
  console.log(coverClass);
  const screenCover = document.getElementsByClassName(coverClass)[0];
  screenCover.classList.replace(coverClass, switchCover[coverClass]);

  if (this.power) {
    PubSub.publish("OutputView:ResetQueryList", true);
  } else {
    PubSub.publish("SystemView:UpdateMessage", 'loading');
  }

  this.power = !this.power;
};


module.exports = ButtonView;
