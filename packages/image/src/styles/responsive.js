import styled from "styled-components";

export default styled.img`
  display: block;
  position: absolute;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
`;
