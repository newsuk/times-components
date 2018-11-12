import { View } from "react-native";
import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";

const TopicsMetaContainer = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;

export default TopicsMetaContainer;
