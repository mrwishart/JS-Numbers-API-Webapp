const PubSub = require('../helpers/pub_sub.js');

const OutputView = function (element) {
  this.element = element;
}

OutputView.prototype.bindEvents = function () {
  PubSub.subscribe("OutputView:NewInfoToAdd", (event) => {

    const numberInfo = event.detail;
    const numberInfoElement = this.createNewQElement(numberInfo);

    const lastQuery = this.element.firstChild;
    this.element.insertBefore(numberInfoElement, lastQuery);

    numberInfoElement.addEventListener('mouseover', () => {
      PubSub.publish("SystemView:UpdateMessage", numberInfoElement.id);
    });

    numberInfoElement.addEventListener('click', () => {
      PubSub.publish("SystemView:UpdateMessage", 'query-click');
    });
  });

  PubSub.subscribe("OutputView:ResetQueryList", () => {
    this.element.innerHTML = '';
    PubSub.publish("NumberInfo:NeedToQueryAPI", 'random');
  })
};

OutputView.prototype.createNewQElement = function (info) {

  const numberInfoElement = document.createElement('p');
  const queryNumber = this.element.childElementCount;
  numberInfoElement.textContent = `[query${queryNumber}]: ${info}`;
  numberInfoElement.id = queryNumber;
  return numberInfoElement;

};

module.exports = OutputView;
