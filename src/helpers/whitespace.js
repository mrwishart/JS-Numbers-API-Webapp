const WhitespaceHelper = {
  toHTML: function (text) {
    return text
      .split('')
      .map((char) => {return (char === ' ') ? '&#160;' : char})
      .join('');
  }
}

module.exports = WhitespaceHelper;
