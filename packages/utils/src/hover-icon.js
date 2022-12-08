import styled from "styled-components";

const HoverIcon = styled.div`
  color: ${props => props.colour};
  text-decoration-line: ${props => props.underline && "underline"};
  &:hover {
    color: ${props => props.hoverColour || props.colour};
    text-decoration-line: ${props => props.underline && "none"};
  }
`;

export default HoverIcon;
