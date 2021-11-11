import styled from "styled-components";
import { colours } from "@times-components/styleguide";

import { View } from "./styled-react-native";

export const PlaceHolderWrapper = styled(View)`
  align-items: center;
  background-color: ${colours.functional.backgroundSecondary};
  bottom: 0;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`;

export const ImageWrapper = styled(View)`
  display: table;
  height: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
