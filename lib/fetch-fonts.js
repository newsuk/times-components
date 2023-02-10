const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const mkdirp = promisify(require("mkdirp"));
const fetch = require("node-fetch");
const convert = require("../packages/typeset/lib/convert-fonts");

const fontCdn = "https://www.thetimes.co.uk/d/fonts";
const fontDir = `${__dirname}/../dist/public/fonts`;

const fonts = [
  {
    fontName: "TimesModern-Bold",
    fileName: "TimesModern-Bold",
    fontFamily: "TimesModern-Bold",
    sources: [
      `${fontCdn}/TimesModern/TimesModern-Bold-62eb027e67.woff2`,
      `${fontCdn}/TimesModern/TimesModern-Bold-828aec4ccd.woff`,
      `${fontCdn}/TimesModern/TimesModern-Bold-e960fb2b2c.ttf`
    ]
  },
  {
    fontName: "TimesModern-Regular",
    fileName: "TimesModern-Regular",
    fontFamily: "TimesModern-Regular",
    sources: [
      `${fontCdn}/TimesModern/TimesModern-Regular-f3419df85d.woff2`,
      `${fontCdn}/TimesModern/TimesModern-Regular-39c619f4ef.woff`,
      `${fontCdn}/TimesModern/TimesModern-Regular-e47b8c277b.ttf`
    ]
  },
  {
    fontName: "TimesDigitalW04-Regular",
    fileName: "TimesDigitalW04",
    fontFamily: "TimesDigitalW04",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-dca82eac02.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-c93f4e13dd.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-bf4b850ffb.ttf`
    ]
  },
  {
    fontName: "TimesDigitalW04-Regular",
    fileName: "TimesDigitalW04-Regular",
    fontFamily: "TimesDigitalW04-Regular",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-dca82eac02.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-c93f4e13dd.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Regular-bf4b850ffb.ttf`
    ]
  },
  {
    fontName: "TimesDigitalW04-Italic",
    fileName: "TimesDigitalW04_italic",
    fontFamily: "TimesDigitalW04",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-Italic-b1475ca316.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Italic-a577e30ef1.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Italic-624f40f1d5.ttf`
    ]
  },
  {
    fontName: "TimesDigitalW04-Bold",
    fileName: "TimesDigitalW04_bold",
    fontFamily: "TimesDigitalW04",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-Bold-9a71df9f73.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Bold-956d1db6de.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-Bold-e627de75c8.ttf`
    ]
  },
  {
    fontName: "TimesDigitalW04-RegularSC",
    fileName: "TimesDigitalW04-RegularSC",
    fontFamily: "TimesDigitalW04-RegularSC",
    sources: [
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-5fc97c82cd.woff2`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-a06bfa24de.woff`,
      `${fontCdn}/TimesDigital/TimesDigitalW04-RegularSC-b3f19b6c56.ttf`
    ]
  },
  {
    fontName: "GillSansMTStd-Medium",
    fileName: "GillSansMTStd-Medium",
    fontFamily: "GillSansMTStd-Medium",
    sources: [
      `${fontCdn}/GillSans/GillSansMTStd-Medium-ff809aff43.woff2`,
      `${fontCdn}/GillSans/GillSansMTStd-Medium-f147e4bbf2.woff`,
      `${fontCdn}/GillSans/GillSansMTStd-Medium-45ad758029.ttf`
    ]
  },
  {
    fontName: "Roboto-Regular",
    fileName: "Roboto-Regular",
    fontFamily: "Roboto-Regular",
    sources: [
      `${fontCdn}/Roboto/Roboto-Regular-6887b6f244.woff2`,
      `${fontCdn}/Roboto/Roboto-Regular-3687450fd8.woff`,
      `${fontCdn}/Roboto/Roboto-Regular-8a36205bd9.ttf`
    ]
  },
  {
    fontName: "Roboto-Medium",
    fileName: "Roboto-Medium",
    fontFamily: "Roboto-Medium",
    sources: [
      `${fontCdn}/Roboto/Roboto-Medium-3ac5d40d1b.woff2`,
      `${fontCdn}/Roboto/Roboto-Medium-3441f19179.woff`,
      `${fontCdn}/Roboto/Roboto-Medium-68ea4734cf.ttf`
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

const generate = (file, fontName, fontFamily) =>
  exec(
    `fontforge -lang=ff -c 'Open($1); SetFondName("${fontFamily}"); SetFontNames("${fontName}", "${fontFamily}", "${fontName}"); Generate("${file}");' ${file}`
  ).catch(e => console.error(e)); // eslint-disable-line no-console

mkdirp(fontDir).then(() =>
  Promise.all(
    ...fonts.map(({ fontName, fontFamily, sources, fileName }) =>
      sources.map(source => {
        const extension = path.extname(source);
        const dest = `${fontDir}/${fileName}${extension}`;

        if (!fs.existsSync(dest)) {
          return download(source, dest).then(() => {
            if (extension === ".ttf") {
              try {
                generate(dest, fontName, fontFamily).then(() => {
                  convert(dest, `${fontDir}/${fileName}.js`);
                });
              } catch (e) {
                console.error(e);
              }
            }
            return null;
          });
        }
        return Promise.resolve();
      })
    )
  )
);
