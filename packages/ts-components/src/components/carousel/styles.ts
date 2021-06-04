import styled from 'styled-components';
import { fonts, colours } from '@times-components/styleguide';

export const CarouselButton = styled.button<{ disabled: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    padding-left: 6px;
    background-color: transparent;
    border: solid 1px #e4e4e4;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

    svg {
        fill: ${({ disabled }) => disabled ? 'ccc' : '#0a68c1'};
        color: #0a68c1;
    }

    &.nextBtn {
        transform: scaleX(-1);
    }

    &:hover {
        border: solid 1px #ccc;
    }
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #F9F9F9;
`;

export const Image = styled.img`
  width: 75%;
`

export const Label = styled.div`
  font-family: ${fonts.supporting};
  font-size: 12px;
  text-transform: uppercase;
  padding-bottom: 12px;
`;

export const Headline = styled.div`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  font-size: 32px;
  padding-bottom: 12px;
`

export const Copy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 12px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
`;

export const CarouselButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.div<{ active?: boolean}>`
 background-color: #CCCCCC;
 background-color: ${({ active }) => (active ? '#FF0000' :  '#CCCCCC' )};
 height: 5px;
 width: 5px; 
 border-radius: 50%;
 margin-right: 2px;
 margin-left: 2px;
`;

export const DotContainer = styled.div`
 display: flex;
 flex-direction: row;
 padding-left: 6px;
 padding-right: 6px;
`;
