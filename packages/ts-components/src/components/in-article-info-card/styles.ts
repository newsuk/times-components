import styled from 'styled-components';
import { fonts, colours, breakpoints } from '@times-components/ts-styleguide';
import ReactElasticCarousel from 'react-elastic-carousel';

export const Headline = styled.div`
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
    padding-bottom: 0;
  }
`;

export const SubHeading = styled.div`
  font-size: 22px;
  line-height: 22px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headlineRegular};
  padding-bottom: 7px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 24px;
    line-height: 24px;
  }
`;

export const BodyCopy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
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
  background-color: transparent;
  border: solid 1px
    ${({ disabled }) =>
      disabled ? colours.functional.keyline : colours.functional.primary};
  border-radius: 50%;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  svg {
    path {
      fill: ${({ disabled }) =>
        disabled ? colours.functional.keyline : colours.functional.primary};
      height: 10px;
      width: 5px;
    }
  }

  &.nextBtn {
    transform: scaleX(-1);
  }

  @media (hover: hover) {
    &:hover {
      border: solid 1px
        ${({ disabled }) =>
          disabled ? colours.functional.keyline : colours.functional.action};
    }
  }

  @media (hover: none) {
    &:active {
      border: solid 1px
        ${({ disabled }) =>
          disabled ? colours.functional.keyline : colours.functional.action};
    }
  }
`;

export const CarouselIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 6px;
  padding-right: 6px;
`;

export const CarouselIndicator = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) =>
    active ? colours.functional.action : colours.functional.keyline};
  height: 5px;
  width: 5px;
  border-radius: 50%;
  margin-right: 2px;
  margin-left: 2px;
  cursor: pointer;
`;

export const StyledCarousel = styled(ReactElasticCarousel)<{
  sectionColour: string;
}>`
  display: flex;
  height: fit-content;
  align-items: initial;
  flex-direction: column-reverse;
  .rec .rec-slider-container {
    margin: 0;
  }
`;

export const CarouselContainer = styled.div<{
  sectionColour: string;
  isWide?: boolean;
  isStandard?: boolean;
}>`
  background-color: ${colours.functional.backgroundPrimary};
  padding-bottom: 16px;
  margin: 0 auto 20px auto;
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  width: ${({ isWide, isStandard }) =>
    (isWide && '100%') || (isStandard && 'auto') || 'auto'};

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ isWide, isStandard }) =>
      (isWide && '100%') || (isStandard && '80.8%') || '80.8%'};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isWide, isStandard }) =>
      (isWide && '100%') || (isStandard && '56.2%') || '56.2%'};
  }

  & div.rec-carousel-item.rec-carousel-item-visible {
    border-right: 1px solid ${colours.functional.keyline};
  }

  & div.rec-carousel-item:last-child {
    border-right: none;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colours.functional.backgroundPrimary};
  width: 100%;
  height: 30%;
  padding: 20px 16px 14px 16px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const InfoCardContainer = styled.div`
  padding: 0 16px;
  float: left;
  width: 100%;
`;

export const CardImg = styled.img`
  padding: 4px 0 12px;
  -webkit-user-drag: none;
  pointer-events: none;
}  
`;
