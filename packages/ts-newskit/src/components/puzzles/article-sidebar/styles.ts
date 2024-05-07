import {
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

export const Divider = styled.hr`
  margin: 16px 0;
  border-style: dashed none none none;
  border-width: 1px;
  border-color: #01000d;
`

export const StyledCardComposable = styled.div`
  margin-right: 12px;

  &:hover {
    button {
      background-color: #e4e4e4;
    }
    h3 {
      color: #00527a;
    }
  }
  h3 {
    color: #df7334;
  }
`;

export const Title = styled.h3`
font-family: "Times Modern";
font-weight: 800;
line-height: 1.125;
font-size: 1.8rem;
letter-spacing: 0em;
margin: 0;
`

export const ItemTitle = styled.p`
font-family: "Times Modern";
font-weight: 400;
line-height: 1.125;
font-size: 1.6rem;
letter-spacing: 0em;
`

export const StyledCardMedia = styled(CardMedia)`
  picture {
    min-height: 40px;
    min-width: 40px;
    background: transparent;
  }
`;
