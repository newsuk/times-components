import styled from "styled-components";
import { breakpoints } from "@times-components/ts-styleguide";

export const Container = styled.div`
  position: ${({$height}) => $height && $height.xs ? "absolute" : "relative"};
  width: 100%;
  height: ${({$height}) => $height.xs || 150}px;

  ${({$height}) => $height && $height.sm && (`
    media (min-width: ${breakpoints.small}px) {
      height: ${$height.sm}px;
    }
  `)}
  
  ${({$height}) => $height && $height.md && (`
    @media (min-width: ${breakpoints.medium}px) {
      height: ${$height.md}px;
    }
  `)}

  ${({$height}) => $height && $height.lg && (`
    @media (min-width: ${breakpoints.wide}px) {
      height: ${$height.lg}px;
    }
  `)}
`;

export const InteractiveContainer = styled(Container)`
  position: relative;
  height: ${({$height}) => `${$height.xs}px` || 'auto'};
`;

export const InteractiveWrapperContainer = styled.div`
  position: relative;
`;