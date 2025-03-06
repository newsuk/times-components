import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";

const LinkContainer = styled(TcView)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default LinkContainer;
