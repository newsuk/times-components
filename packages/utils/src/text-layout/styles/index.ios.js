import { spacing } from "@times-components/styleguide";
import shared from "./shared";

export default {
  ...shared,
  container: {
    ...shared.container,
    height: 100,
    left: spacing(2),
    position: "absolute",
    right: 0,
    top: 0,
    width: 100,
    zIndex: -1
  }
};
