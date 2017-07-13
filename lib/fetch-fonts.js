const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const mkdirp = promisify(require("mkdirp"));
const fetch = require("node-fetch");

const fontCdn = "https://www.thetimes.co.uk/d/fonts";
const fontDir = `${__dirname}/../dist/public/fonts`;

const fonts = [
  {
    family: "TimesModern-Bold",
    sources: [
      `${fontCdn}/TimesModern/TimesModern-Bold-62eb027e67.woff2`,
      `${fontCdn}/TimesModern/TimesModern-Bold-828aec4ccd.woff`,
      `${fontCdn}/TimesModern/TimesModern-Bold-e960fb2b2c.ttf`
    ]
  },
  {
    family: "TimesDigital-RegularSC",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-5fc97c82cd.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-a06bfa24de.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-b3f19b6c56.ttf`
    ]
  },
  {
    family: "GillSansMTStd-Medium",
    sources: [
      `${fontCdn}/GillSans/GillSansMTStd-Medium-ff809aff43.woff2`,
      `${fontCdn}/GillSans/GillSansMTStd-Medium-f147e4bbf2.woff`,
      `${fontCdn}/GillSans/GillSansMTStd-Medium-45ad758029.ttf`
    ]
  },
  {
    family: "TimesDigital-Regular",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-dca82eac02.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-c93f4e13dd.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-bf4b850ffb.ttf`
    ]
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

const generate = (file, family) =>
  exec(
    `fontforge -lang=ff -c 'Open($1); SetFondName("${family}"); SetFontNames("${family}", "${family}"); Generate("${file}");' ${file}`
  ).catch(e => console.error(e)); // eslint-disable-line no-console

mkdirp(fontDir).then(() =>
  Promise.all(
    ...fonts.map(({ family, sources }) =>
      sources.map(source => {
        const extension = path.extname(source);
        const dest = `${fontDir}/${family}${extension}`;

        if (!fs.existsSync(dest)) {
          return download(source, dest).then(
            () => (extension === ".ttf" ? generate(dest, family) : null)
          );
        }
        return Promise.resolve();
      })
    )
  )
);
