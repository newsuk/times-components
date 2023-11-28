import * as opentype from "opentype.js";
import path from "path";

export default opentype.loadSync(
  path.join(__dirname, "/../fonts/Roboto-Regular.ttf")
);
