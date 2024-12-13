import styled from "styled-components";

export const Container = styled.div`
  position: ${({ $height }) =>
    $height && $height.xs ? "absolute" : "relative"};
  width: 100%;
  height: ${({ $height }) => ($height && $height.xs ? $height.xs : 150)}px;

  ${({ $height }) =>
    $height &&
    $height.sm &&
    `
    media (min-width: 520px) {
      height: ${$height.sm}px;
    }
  `}
  
  ${({ $height }) =>
    $height &&
    $height.md &&
    `
    @media (min-width: 768px) {
      height: ${$height.md}px;
    }
  `}

  ${({ $height }) =>
    $height &&
    $height.lg &&
    `
    @media (min-width: 1024px) {
      height: ${$height.lg}px;
    }
  `}
`;

export const InteractiveContainer = styled(Container)`
  position: relative;
  height: ${({ $height }) =>
    $height && $height.xs ? `${$height.xs}px` : "auto"};
`;

export const InteractiveWrapperContainer = styled.div`
  position: relative;
`;
