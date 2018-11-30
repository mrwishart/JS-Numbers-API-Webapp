const PubSub = require('../helpers/pub_sub.js');

const OutputView = function (element) {
  this.element = element;
}

OutputView.prototype.bindEvents = function () {
  PubSub.subscribe("OutputView:NewInfoToAdd", (event) => {
    const numberInfo = event.detail;
    const numberInfoElement = document.createElement('p');
    numberInfoElement.textContent = numberInfo;

    this.element.appendChild(numberInfoElement);
  });
};

module.exports = OutputView;
