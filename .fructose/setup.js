import initFructose from "hjkadshhjkl-test-utils";
import config from "../package.json";

if (process.env.FRUCTOSE) {
  initFructose(config.fructose);
}
