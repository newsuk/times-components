const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const mkdirp = promisify(require("mkdirp"));
const fetch = require("node-fetch");

const fontCdn = "https://www.thetimes.co.uk/d/fonts";
const fontDir = `${__dirname}/../dist/public/fonts`;

const fonts = [
  {
    source: `${fontCdn}/TimesModern/TimesModern-Bold-62eb027e67.woff2`,
    dest: `${fontDir}/TimesModern-Bold.woff2`
  },
  {
    source: `${fontCdn}/TimesModern/TimesModern-Bold-828aec4ccd.woff`,
    dest: `${fontDir}/TimesModern-Bold.woff`
  },
  {
    // hosted TimesModern-Bold.ttf isnt valid enough for ios
    isDirty: true,
    source: `${fontCdn}/TimesModern/TimesModern-Bold-e960fb2b2c.ttf`,
    dest: `${fontDir}/TimesModern-Bold.ttf`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-5fc97c82cd.woff2`,
    dest: `${fontDir}/TimesDigitalW04-RegularSC.woff2`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-a06bfa24de.woff`,
    dest: `${fontDir}/TimesDigitalW04-RegularSC.woff`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-b3f19b6c56.ttf`,
    dest: `${fontDir}/TimesDigitalW04-RegularSC.ttf`
  },
  {
    source: `${fontCdn}/GillSans/GillSansMTStd-Medium-ff809aff43.woff2`,
    dest: `${fontDir}/GillSansMTStd-Medium.woff2`
  },
  {
    source: `${fontCdn}/GillSans/GillSansMTStd-Medium-f147e4bbf2.woff`,
    dest: `${fontDir}/GillSansMTStd-Medium.woff`
  },
  {
    source: `${fontCdn}/GillSans/GillSansMTStd-Medium-45ad758029.ttf`,
    dest: `${fontDir}/GillSansMTStd-Medium.ttf`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-dca82eac02.woff2`,
    dest: `${fontDir}/TimesDigitalW04-Regular.woff2`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-c93f4e13dd.woff`,
    dest: `${fontDir}/TimesDigitalW04-Regular.woff`
  },
  {
    source: `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-bf4b850ffb.ttf`,
    dest: `${fontDir}/TimesDigitalW04-Regular.ttf`
  }
];

const download = (source, dest) =>
  fetch(source).then(
    res =>
      new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(dest);

        stream.on("finish", resolve);
        stream.on("error", reject);

        res.body.pipe(stream);
      })
  );

const clean = file =>
  exec(
    `fontforge -lang=ff -c 'Open($1); Generate("${file}");' ${file}`
  ).catch(e => console.error(e)); // eslint-disable-line no-console

mkdirp(fontDir).then(() => {
  const missingFonts = fonts.filter(({ dest }) => !fs.existsSync(dest));
  return Promise.all(
    missingFonts.map(({ isDirty, source, dest }) =>
      download(source, dest).then(() => (isDirty ? clean(dest) : null))
    )
  );
});
