const HeaderText = require('../db/header_text');
const WhitespaceHelper = require('../helpers/whitespace.js');

const HeaderView = function (container) {
  this.container = container;
}

HeaderView.prototype.bindEvents = function () {
  HeaderText.forEach((line) => {
    const lineElement = document.createElement('h1');
    lineElement.textContent = line;
    lineElement.innerHTML = WhitespaceHelper.toHTML(line);
    this.container.appendChild(lineElement);
  })
};

module.exports = HeaderView;
