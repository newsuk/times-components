const fse = require("fs-extra");

const originalDir = `${__dirname}/../.storybook/public/static/fonts`;
const distDir = `${__dirname}/../dist/public/fonts`;

try {
  fse.copySync(originalDir, distDir, { overwrite: true });
} catch (err) {
  console.error(err);
}
