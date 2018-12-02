const NumberInfo = require('./models/number_info.js');
const OutputView = require('./views/output_view.js');
const SelectView = require('./views/select_view.js');
const HeaderView = require('./views/header_view.js');
const ButtonView = require('./views/button_view.js');
const SystemView = require('./views/system_view.js');

const startApp = () => {
  console.log("Javascript Loaded!");

  const systemElement = document.querySelector('#system-view')
  const systemView = new SystemView(systemElement);
  systemView.bindEvents();

  const powerButton = document.querySelector('.power-button-off');
  const buttonView = new ButtonView(powerButton);
  buttonView.bindEvents();

  const headerElement = document.querySelector('#header-view');
  const headerView = new HeaderView(headerElement);
  headerView.bindEvents();

  const selectTextContainer = document.querySelector('#select-view')
  const selectTextElement = document.querySelector('#select-text');
  const selectView = new SelectView(selectTextContainer, selectTextElement);
  selectView.bindEvents();

  const outputElement = document.querySelector('#output-view')
  const outputView = new OutputView(outputElement);
  outputView.bindEvents();

  const numberInfo = new NumberInfo;
  numberInfo.bindEvents();

};

document.addEventListener("DOMContentLoaded", startApp);
