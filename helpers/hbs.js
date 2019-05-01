module.exports = {
  truncate: function(a, c) {
    if (a.length > c && 0 < a.length) {
      let b = a.substr(0, c);
      b = a.substr(0, b.lastIndexOf(' '));
      b = (0 < b.length) ? b : a.substr(0, c);
      return `${b} ...`;
    }
    return a;
  },
  openForm: function (action, autocomplete, preferredMethod, methodInval) {
    if (methodInval === true) { return `<form action="${action}" autocomplete="${autocomplete}" method="${preferredMethod}"> <input type="hidden" name="_method" value="PUT">`; }
    return `<form action="${action}" autocomplete="${autocomplete}" method="${preferredMethod}">`;
  },
  closeForm: function () { return '</form>'; }
};
