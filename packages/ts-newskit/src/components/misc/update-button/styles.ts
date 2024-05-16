import styled from 'styled-components';

const styleMap = {
  colors: {
    interactiveNegative040: "#9f0000",
    interactiveNegative050: "#800000",
    inkInverse: '#FFFFFF'
  },
   spacing: {
    space030: "12px",
    space020: "8px",
   }
}

export const StyledButton = styled.button`
  border: none;
  background-color: ${styleMap.colors.interactiveNegative040};
  padding-block: ${styleMap.spacing.space020};
  padding-inline: ${styleMap.spacing.space030};
  font-family: Roboto;
  font-size: 1.4000000000000001rem;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: 0em;
  color: ${styleMap.colors.inkInverse};
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 8px;
  place-content: center;
  place-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${styleMap.colors.interactiveNegative050}
  }
  &:active {
    background-color: ${styleMap.colors.interactiveNegative050}
  }
`;