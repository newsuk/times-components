import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";

const TargettedElement = styled.div`
  :target:before {
    content: "";
    display: block;
    height: 110px;
    margin: -110px 0 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    :target:before {
      content: "";
      display: block;
      height: 100px;
      margin: -100px 0 0;
    }
  }

  @media (min-width: ${breakpoints.huge}px) {
    :target:before {
      content: "";
      display: block;
      height: 50px;
      margin: -50px 0 0;
    }
  }
`;

export default TargettedElement;
