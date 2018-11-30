const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js')

const NumberInfo = function () {

}

NumberInfo.prototype.bindEvents = function () {
  this.getInfo({detail:'random'});
  PubSub.subscribe("NumberInfo:NeedToQueryAPI", this.getInfo)
};

NumberInfo.prototype.getInfo = (event) => {
  let numberRequest = event.detail;

  if (numberRequest === '') {numberRequest = 'random'};

  const url = `http://numbersapi.com/${numberRequest}/math`
  const request = new RequestHelper(url);
  request.get().then((numberInfo) => {
    PubSub.publish("OutputView:NewInfoToAdd",numberInfo);
  });
}

module.exports = NumberInfo;
