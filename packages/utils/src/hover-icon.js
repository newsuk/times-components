import styled from "styled-components";

const HoverIcon = styled.div`
  color: ${props => props.colour};
  &:hover {
    color: ${props => props.hoverColour || props.colour};
  }
`;

export default HoverIcon;
