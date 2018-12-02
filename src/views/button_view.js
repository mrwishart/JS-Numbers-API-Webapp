const ButtonView = function (button) {
  this.button = button;
  this.power = false;
}

ButtonView.prototype.bindEvents = function () {
  this.button.addEventListener('mousedown', () => {
    this.updateButtonColour();
  });
  this.button.addEventListener('mouseup', () => {
    this.changePower();
  })
};

ButtonView.prototype.updateButtonColour = function () {
  const switchObject = {
    'power-button-off': 'power-button-on',
    'power-button-on': 'power-button-off'
  };
  const currentClass = this.button.classList;
  this.button.classList.replace(currentClass, switchObject[currentClass]);
};

ButtonView.prototype.disableButton = function () {
  const cloneButton = this.button.cloneNode(true);
  const containerElement = this.button.parentElement;

  containerElement.removeChild(this.button);
  containerElement.appendChild(cloneButton);
};

ButtonView.prototype.changePower = function () {
  this.power ? this.powerDown() : this.powerUp();
};

ButtonView.prototype.powerUp = function () {
  this.power = true;
  const clickSound = document.querySelector('#click-on');
  clickSound.play();
};

ButtonView.prototype.powerDown = function () {
  this.power = false;
  const clickSound = document.querySelector('#click-off');
  clickSound.play();
};


module.exports = ButtonView;
