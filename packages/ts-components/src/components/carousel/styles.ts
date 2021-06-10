import styled from 'styled-components';
import { fonts, colours, breakpoints } from '@times-components/styleguide';

export const CardContainer = styled.div<{ isLarge: boolean }>`
  width: 100%;
  height: 30%;
  @media (min-width: ${breakpoints.wide}px) {
    height: ${({ isLarge }) => (isLarge ? '30%' : 'auto')};
    width: ${({ isLarge }) => (isLarge ? '100%' : '30%')};
  }
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  background-color: #f9f9f9;
`;

export const MobileHeadlineLabelContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  background-color: #f9f9f9;
`;

export const MobileCopyCreditContainer = styled.div`
display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

export const CardButtonContainer = styled.div<{ isLarge: boolean }>`
  display: flex;
  justify-content: ${({ isLarge }) => (isLarge ? 'flex-end' : 'space-between')};
`;

export const Label = styled.div`
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  padding-bottom: 12px;
  color: ${colours.section.news};
`;

export const Headline = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  padding-bottom: 12px;
  transition: opacity 0.5s;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 32px;
    line-height: 32px;
  }
`;

export const Copy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 12px;
  transition: all 0.3s ease;
`;

export const CreditButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Credit = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-family: ${fonts.supporting};
  color: ${colours.functional.secondary};
`;

export const ImageContainer = styled.div`
  width: 100%;
`;

export const CarouselButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CarouselButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding-left: 6px;
  background-color: transparent;
  border: solid 1px ${({ disabled }) => (disabled ? '#e4e4e4' : '#000000')};
  border-radius: 50%;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  svg {
    fill: 'ccc';
    path {
      height: 10px;
      width: 5px;
    }
  }

  &.nextBtn {
    transform: scaleX(-1);
  }

  &:hover {
    border: solid 1px #0a68c1;
  }
`;

export const CarouselIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 6px;
  padding-right: 6px;
`;

export const CarouselIndicator = styled.div<{ active?: boolean }>`
  background-color: #cccccc;
  background-color: ${({ active }) => (active ? '#1573A2' : '#CCCCCC')};
  height: 5px;
  width: 5px;
  border-radius: 50%;
  margin-right: 2px;
  margin-left: 2px;
  cursor: pointer;
`;
