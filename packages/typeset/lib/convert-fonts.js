const fs = require('fs');

const convert = (filename, target) => {
  const font = fs.readFileSync(filename).buffer;
  const buffer = Array.from(new Int32Array(font))
  fs.writeFileSync(
    target,
    `export default ${JSON.stringify(buffer)}`
  );
}

module.exports = convert