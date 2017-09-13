import { Dimensions } from "react-native";

const window = Dimensions.get("window");
export default ({ source }) => {
  const uri = source.uri;

  return {
    height: 1,
    source: {
      uri: uri && uri.indexOf("//") === 0 ? `https:${uri}` : uri
    },
    width: window.width
  };
};
