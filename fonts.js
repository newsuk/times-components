/* eslint-disable global-require */
const fonts = {
  "GillSansMTStd-Medium": () =>
    require("./dist/public/fonts/GillSansMTStd-Medium.js").default,
  "TimesDigitalW04-Bold": () =>
    require("./dist/public/fonts/TimesDigitalW04_bold.js").default,
  "TimesDigitalW04-Italic": () =>
    require("./dist/public/fonts/TimesDigitalW04_italic.js").default,
  "TimesModern-Bold": () =>
    require("./dist/public/fonts/TimesModern-Bold.js").default,
  "TimesDigitalW04-Regular": () =>
    require("./dist/public/fonts/TimesDigitalW04-Regular.js").default,
  TimesDigitalW04: () =>
    require("./dist/public/fonts/TimesDigitalW04.js").default,
  "TimesModern-Regular": () =>
    require("./dist/public/fonts/TimesModern-Regular.js").default
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
