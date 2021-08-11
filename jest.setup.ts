import "@testing-library/jest-dom";

// js-dom in node can't simulate some browser functionalities
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {}, // eslint-disable-line
      removeListener: function () {}, // eslint-disable-line
    };
  };
