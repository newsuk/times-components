import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

const LinkContainer = styled(View)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default LinkContainer;
