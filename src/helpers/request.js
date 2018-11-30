const RequestHelper = function (url) {
  this.url = url;
}

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then(res => res.text());
};

module.exports = RequestHelper;
