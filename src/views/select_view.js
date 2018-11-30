const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  this.element.addEventListener('submit', this.submitNumber);
};

SelectView.prototype.submitNumber = (event) => {
  event.preventDefault();
  const requestedNumber = event.target[0].value;
  PubSub.publish( "NumberInfo:NeedToQueryAPI" ,requestedNumber)
};

module.exports = SelectView;
