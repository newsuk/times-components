import styled from 'styled-components';
import { fonts, colours, breakpoints } from '@times-components/styleguide';

// General styles

export const Label = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: ${({ sectionColour }) => `${sectionColour}`};
  padding-bottom: 12px;
  letter-spacing: 1px;
`;

export const Headline = styled.div`
  font-size: 24px;
  line-height: 24px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 32px;
    line-height: 32px;
    padding-bottom: 12px;
  }
`;

export const Copy = styled.div<{ isLarge: boolean }>`
  color: #555555;
  font-family: ${fonts.body};
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 12px;
  transition: all 0.3s ease;
  @media (min-width: ${breakpoints.medium}px) {
    width: 80%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isLarge }) => (isLarge ? '60%' : '100%')};
    font-size: ${({ isLarge }) => (isLarge ? '14px' : '16px')};
    line-height: ${({ isLarge }) => (isLarge ? '20px' : '24px')};
  }
`;

export const Credit = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  font-family: ${fonts.supporting};
  color: ${colours.functional.secondary};
  padding-bottom: 3px;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 0px;
  }
`;

export const CardContainer = styled.div<{ isLarge: boolean; isSmall: boolean }>`
  width: 100%;
  height: 30%;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 20px 20px 24px 20px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    height: ${({ isLarge }) => (isLarge ? '30%' : 'auto')};
    width: ${({ isLarge, isSmall }) =>
      (isLarge && '100%') || (isSmall && '36%') || '27%'};
    padding: ${({ isLarge }) =>
      isLarge ? '20px 20px 24px 20px' : '20px 20px 12px 20px'};
  }
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
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
    path {
      fill: ${({ disabled }) => (disabled ? '#CCCCCC' : 'black')};
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

// Device specific styles

export const MobileHeadlineLabelContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 12px 20px;
  background-color: #f9f9f9;
  @media (min-width: ${breakpoints.medium}px) {
    display: none;
  }
`;

export const MobileCardContent = styled.div`
  display: block;
  padding: 8px 20px;
  @media (min-width: ${breakpoints.medium}px) {
    display: none;
  }
`;

export const DesktopCardContent = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

export const MobileCopyCreditContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

// Look into this

export const CardButtonContainer = styled.div<{ isLarge: boolean }>`
  display: flex;
  justify-content: ${({ isLarge }) => (isLarge ? 'flex-end' : 'space-between')};
`;

export const CreditButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
