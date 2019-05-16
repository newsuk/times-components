import styled from "styled-components";

export default styled.img`
  display: block;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  position: absolute;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
`;
