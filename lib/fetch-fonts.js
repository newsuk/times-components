const fs = require("fs");
const mkdirp = require("util").promisify(require("mkdirp"));
const fetch = require("node-fetch");

const fontCdn = "https://www.thetimes.co.uk/d/fonts";
const fontDir = `${__dirname}/../dist/public/fonts`;

const fonts = [
  {
    from: `${fontCdn}/TimesModern/TimesModern-Bold-62eb027e67.woff2`,
    to: `${fontDir}/TimesModern-Bold.woff2`
  },
  {
    from: `${fontCdn}/TimesModern/TimesModern-Bold-828aec4ccd.woff`,
    to: `${fontDir}/TimesModern-Bold.woff`
  },
  {
    from: `${fontCdn}/TimesModern/TimesModern-Bold-e960fb2b2c.ttf`,
    to: `${fontDir}/TimesModern-Bold.ttf`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-5fc97c82cd.woff2`,
    to: `${fontDir}/TimesDigitalW04-RegularSC.woff2`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-a06bfa24de.woff`,
    to: `${fontDir}/TimesDigitalW04-RegularSC.woff`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-b3f19b6c56.ttf`,
    to: `${fontDir}/TimesDigitalW04-RegularSC.ttf`
  },
  {
    from: `${fontCdn}/GillSans/GillSansMTStd-Medium-ff809aff43.woff2`,
    to: `${fontDir}/GillSansMTStd-Medium.woff2`
  },
  {
    from: `${fontCdn}/GillSans/GillSansMTStd-Medium-f147e4bbf2.woff`,
    to: `${fontDir}/GillSansMTStd-Medium.woff`
  },
  {
    from: `${fontCdn}/GillSans/GillSansMTStd-Medium-45ad758029.ttf`,
    to: `${fontDir}/GillSansMTStd-Medium.ttf`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-dca82eac02.woff2`,
    to: `${fontDir}/TimesDigitalW04-Regular.woff2`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-c93f4e13dd.woff`,
    to: `${fontDir}/TimesDigitalW04-Regular.woff`
  },
  {
    from: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-bf4b850ffb.ttf`,
    to: `${fontDir}/TimesDigitalW04-Regular.ttf`
  }
];

const download = (from, to) =>
  fetch(from).then(res => res.body.pipe(fs.createWriteStream(to)));

mkdirp(fontDir).then(() => {
  const missingFonts = fonts.filter(({ out }) => !fs.existsSync(out));
  return Promise.all(missingFonts.map(font => download(font.from, font.to)));
});
