import styled from 'styled-components';
import { fonts, colours, breakpoints } from '@times-components/styleguide';
import ReactElasticCarousel from 'react-elastic-carousel';

export const PlaceholderContainer = styled.div`
  position: relative;
  height: 200px;
  margin: 0 auto 20px auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Label = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${({ sectionColour }) => `${sectionColour}`};
  padding-bottom: 10px;
  letter-spacing: 1px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: 6px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    padding-bottom: 10px;
  }
`;

export const Headline = styled.div<{ isWide: boolean }>`
  font-size: 24px;
  line-height: 24px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  padding-bottom: 12px;
  @media (min-width: ${breakpoints.medium}px) {
    width: 70%;
    font-size: 32px;
    line-height: 32px;
    padding-bottom: 0px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 100%;
    font-size: ${({ isWide }) => (isWide ? '32px' : '24px')};
    line-height: ${({ isWide }) => (isWide ? '32px' : '24px')};
    padding-bottom: ${({ isWide }) => (isWide ? '0px' : '14px')};
  }
`;

export const HeadlineButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const Copy = styled.div<{ isWide: boolean }>`
  color: #555555;
  font-family: ${fonts.body};
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 16px;
  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isWide }) => (isWide ? '60%' : '100%')};
    font-size: 16px;
    line-height: 24px;
  }
`;

export const ImageTitle = styled.div<{ isWide: boolean }>`
  font-size: 16px;
  line-height: 16px;
  font-family: ${fonts.headlineRegular};
  padding-bottom: 6px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 24px;
    line-height: 24px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    font-size: ${({ isWide }) => (isWide ? '24px' : '18px')};
    line-height: ${({ isWide }) => (isWide ? '24px' : '18px')};
  }
`;

export const Credit = styled.div<{ isWide: boolean }>`
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  font-family: ${fonts.supporting};
  color: ${colours.functional.secondary};
  padding-bottom: 10px;
  padding-top: 8px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-top: 12px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: 12px;
    padding-bottom: ${({ isWide }) => (isWide ? '8px' : '14px')};
  }
`;

export const CardContainer = styled.div<{ isWide: boolean; isSmall: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  width: 100%;
  height: 30%;
  padding: 20px 16px 16px 16px;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 20px 20px 12px 20px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    height: ${({ isWide }) => (isWide ? '30%' : 'auto')};
    width: ${({ isWide, isSmall }) =>
      (isWide && '100%') || (isSmall && '36%') || '33%'};
    padding: ${({ isWide }) => (isWide ? '20px 16px 16px 16px' : '20px 16px')};
  }
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

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MobileOrLarge = styled.div<{ isWide: boolean }>`
  display: block;
  @media (min-width: ${breakpoints.wide}px) {
    display: ${({ isWide }) => (isWide ? 'block' : 'none')};
  }
`;

export const NotMobileOrLarge = styled.div<{ isWide: boolean }>`
  display: none;
  @media (min-width: ${breakpoints.wide}px) {
    display: ${({ isWide }) => (isWide ? 'none' : 'flex')};
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
  }
`;

export const CarouselContainer = styled.div<{
  sectionColour: string;
  isWide: boolean;
  isSmall: boolean;
}>`
  background-color: #f9f9f9;
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  flex-direction: ${({ isWide }) =>
    isWide || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isSmall }) => (isSmall ? '82.1%' : '100%')};
  }
`;

export const StyledCarousel = styled(ReactElasticCarousel)<{
  isWide: boolean;
  sectionColour: string;
}>`
  display: flex;
  height: fit-content;
  align-items: initial;
  flex-direction: column-reverse;
  .rec .rec-slider-container {
    margin: 0;
  }
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: ${({ isWide }) =>
      isWide || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
  }
`;
