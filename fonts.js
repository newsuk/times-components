/* eslint-disable global-require */
const fonts = {
  "CenturyGothic-Bold": () =>
    require("./dist/public/fonts/CenturyGothic-Bold-metrics.js").default,
  "Flama-Bold": () => require("./dist/public/fonts/Flama-Bold-metrics.js").default,
  "GillSansMTStd-Medium": () =>
    require("./dist/public/fonts/GillSansMTStd-Medium-metrics.js").default,
  "Tiempos-Headline-Bold": () =>
    require("./dist/public/fonts/Tiempos-Headline-Bold-metrics.js").default,
  "TimesDigitalW04-Bold": () =>
    require("./dist/public/fonts/TimesDigitalW04_bold-metrics.js").default,
  "TimesDigitalW04-Italic": () =>
    require("./dist/public/fonts/TimesDigitalW04_italic-metrics.js").default,
  "TimesModern-Bold": () =>
    require("./dist/public/fonts/TimesModern-Bold-metrics.js").default,
  "TimesDigitalW04-Regular": () =>
    require("./dist/public/fonts/TimesDigitalW04-Regular-metrics.js").default,
  "TimesDigitalW04-Normal": () =>
    require("./dist/public/fonts/TimesDigitalW04-metrics.js").default,
  "TimesModern-Regular": () =>
    require("./dist/public/fonts/TimesModern-Regular-metrics.js").default
};

const ttf = {};
Object.keys(fonts).forEach(name => {
  ttf[name] = () => {
    const opentype = require("opentype.js");
    return opentype.parse(new Int32Array(fonts[name]()).buffer, {
      lowMemory: true
    });
  };
});

module.exports = ttf;
