import {
  CardComposable,
  getColorCssFromTheme,
  styled,
  CardMedia
} from 'newskit';

export const Container = styled.div`
  padding-top: 3px;
  border-style: solid none none none;
  border-width: 3px;
  border-color: #df7334;
`

export const Description = styled.p`
  display: block;
  padding-right: 12px;
  font-family: "Roboto";
  font-weight: 400;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: 0em;
`

export const Divider = styled.div`
  margin: 16px 0;
  border-style: dashed none none none;
  border-width: 1px;
  border-color: #01000d;
`

export const StyledCardComposable = styled(CardComposable)`
  &:hover {
    button {
      ${getColorCssFromTheme('backgroundColor', 'interface040')};
    }
  }
  h3 {
    color: inherit;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  picture {
    min-height: 40px;
    min-width: 40px;
    background: transparent;
  }
`;
