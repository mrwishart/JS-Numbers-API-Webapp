const HeaderText = require('../db/header_text');
const WhitespaceHelper = require('../helpers/whitespace.js');
const PubSub = require('../helpers/pub_sub.js');

const HeaderView = function (container) {
  this.container = container;
}

HeaderView.prototype.bindEvents = function () {
  HeaderText.forEach((line) => {
    const lineElement = document.createElement('h1');
    lineElement.textContent = line;
    lineElement.innerHTML = WhitespaceHelper.toHTML(line);
    this.container.appendChild(lineElement);
  });

  this.container.addEventListener('mouseover', () => {
    PubSub.publish("SystemView:UpdateMessage", 'header-hover');
  })

  this.container.addEventListener('click', () => {
    PubSub.publish("SystemView:UpdateMessage", 'header-click');
  })
};

module.exports = HeaderView;
