import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {}, // eslint-disable-line
      removeListener: function () {}, // eslint-disable-line
    };
  };
