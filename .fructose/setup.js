import setup from "@times-components/fructose/setup";
import config from "../package";

if (process.env.FRUCTOSE) {
  setup(config.fructose);
}
