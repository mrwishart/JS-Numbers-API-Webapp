const PubSub = require('../helpers/pub_sub.js');

const SystemView = function (element) {
  this.element = element;
  this.messages = {
    'loading': "Program loading...",
    'query-complete': "Query completed",
    'query-failed': "Query processing.....",
    'non-number-entered': "You know what a number is?",
    'input-hover': "Input number here, human",
    'input-click': "Use the keyboard, meatbag",
    'paste-successful': "Foreign data safe for input",
    'paste-unsuccessful': "Unsuitable data destroyed",
    'header-hover': "Like the ASCII art?",
    'header-click': "Yeah. That does nothing",
    'system-hover': "Yes? Can I help you?",
    'system-click': "Oi! Stop that!",
    'power-button-hover': "Please don't. I want to live!",
    'default': "Idle"
  }
};

SystemView.prototype.bindEvents = function () {

  this.updateMessage('default');

  PubSub.subscribe("SystemView:UpdateMessage", (event) => {
    const update = event.detail;
    const message = this.translateMessage(update);
    this.removeOldMessage();
    this.updateMessage(message);
  });

  this.element.addEventListener('mouseover', this.sendHoverMessage);
  this.element.addEventListener('click', this.sendClickMessage);

};

SystemView.prototype.sendHoverMessage = function () {
  PubSub.publish("SystemView:UpdateMessage", 'system-hover');
};

SystemView.prototype.sendClickMessage = function () {
  this.removeEventListener('mouseover', this.sendHoverMessage);
  PubSub.publish("SystemView:UpdateMessage", 'system-click');
};

SystemView.prototype.translateMessage = function (update) {
  return isNaN(update) ? this.messages[update] : `Query ${update}`;
};

SystemView.prototype.updateMessage = function (message) {
  const newElement = document.createElement('p');
  newElement.textContent = message;

  this.element.appendChild(newElement);

  if (message === this.messages['loading']) {this.timeLoading()}
};

SystemView.prototype.removeOldMessage = function () {
  const lastMessage = this.element.lastChild;
  this.element.removeChild(lastMessage);
};

SystemView.prototype.timeLoading = function () {
  const loadTime = 3000;
  window.setTimeout(() => {
    PubSub.publish("SystemView:UpdateMessage", 'default')
  } ,loadTime);

  PubSub.publish('ButtonView:DisableButton', loadTime);
};


module.exports = SystemView;
