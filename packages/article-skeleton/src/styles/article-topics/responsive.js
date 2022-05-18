import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";
import { TcView } from "@times-components/utils";

export default styled(TcView)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;
