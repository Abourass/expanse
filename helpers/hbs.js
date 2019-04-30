module.exports = {
  truncate: function(a, c) {
    if (a.length > c && 0 < a.length) {
      let b = a.substr(0, c);
      b = a.substr(0, b.lastIndexOf(' '));
      b = (0 < b.length) ? b : a.substr(0, c);
      return `${b} ...`;
    }
    return a;
  }};
