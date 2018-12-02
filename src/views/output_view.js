const PubSub = require('../helpers/pub_sub.js');

const OutputView = function (element) {
  this.element = element;
}

OutputView.prototype.bindEvents = function () {
  PubSub.subscribe("OutputView:NewInfoToAdd", (event) => {
    const numberInfo = event.detail;
    const numberInfoElement = document.createElement('p');
    const queryNumber = this.element.childElementCount;
    numberInfoElement.textContent = `[query${queryNumber}]: ${numberInfo}`;
    numberInfoElement.id = queryNumber;

    if (this.element.firstChild){
      const lastQuery = this.element.firstChild;
      this.element.insertBefore(numberInfoElement, lastQuery);}
    else {
      this.element.appendChild(numberInfoElement);
    }

    numberInfoElement.addEventListener('mouseover', () => {
      PubSub.publish("SystemView:UpdateMessage", queryNumber);
    })
  });

  PubSub.subscribe("OutputView:ResetQueryList", () => {
    this.element.innerHTML = '';
    PubSub.publish("NumberInfo:NeedToQueryAPI", 'random');
  })
};

module.exports = OutputView;
