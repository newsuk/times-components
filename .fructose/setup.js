import initFructose from "hjkadshhjkl-test-utils";
import config from "../package";

if (process.env.FRUCTOSE) {
  initFructose(config.fructose);
}
