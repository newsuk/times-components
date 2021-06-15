import React, { useState } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { Card } from './Card';
import {
  CarouselButtonContainer,
  CarouselButton,
  CarouselIndicatorContainer,
  CarouselIndicator,
  Label,
  Headline,
  MobileHeadlineLabelContainer
} from './styles';
import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { breakpoints } from '@times-components/styleguide';

export type DataObj = {
  paneldata: {
    copy: string;
    credit: string;
    headline: string;
    label: string;
  };
  carouseldata: {
    image: string;
  };
};

const StyledCarousel = styled(ReactElasticCarousel)<{
  isLarge: boolean;
  sectionColour: string;
}>`
  display: flex;
  height: fit-content;
  align-items: initial;
  flex-direction: column;
  .rec .rec-slider-container {
    margin: 0px;
  }
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: ${({ isLarge }) =>
      isLarge || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
  }
`;

const CarouselContainer = styled.div<{
  sectionColour: string;
  isLarge: boolean;
  isSmall: boolean;
}>`
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  flex-direction: ${({ isLarge }) =>
    isLarge || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isSmall }) => (isSmall ? '82.1%' : '100%')};
  }
`;

const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  onClick: (current: number) => number;
  data: DataObj[];
}> = ({ activePage, onClick, current, data }) => {
  return (
    <CarouselButtonContainer>
      <CarouselButton
        data-testid="Previous button"
        disabled={activePage === 0}
        onClick={() => onClick(current - 1)}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
      <CarouselIndicatorContainer>
        {/* @ts-ignore */}
        {data.map((child, index) => {
          const isActivePage = activePage === index;
          return (
            <CarouselIndicator
              key={index}
              onClick={() => onClick(index)}
              active={isActivePage}
            />
          );
        })}
      </CarouselIndicatorContainer>
      <CarouselButton
        data-testid="Next Button"
        disabled={activePage === data.length - 1}
        className="nextBtn"
        onClick={() => onClick(current + 1)}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
    </CarouselButtonContainer>
  );
};

const GalleryCarousel: React.FC<{
  isLarge: boolean;
  isSmall: boolean;
  data: DataObj[];
  sectionColour: string;
}> = ({ isLarge, data, sectionColour, isSmall }) => {
  const [current, setCurrent] = useState(0);
  const handleChange = (data: any) => {
    setCurrent(data.index);
  };
  return (
    <CarouselContainer
      sectionColour={sectionColour}
      isLarge={isLarge}
      isSmall={isSmall}
    >
      <MobileHeadlineLabelContainer>
        <Label sectionColour={sectionColour}>{data[current].paneldata.label}</Label>
        <Headline>{data[current].paneldata.headline}</Headline>
      </MobileHeadlineLabelContainer>
      <StyledCarousel
        sectionColour={sectionColour}
        isLarge={isLarge}
        itemsToScroll={1}
        itemsToShow={1}
        isRTL={false}
        onChange={handleChange}
        showArrows={false}
        renderPagination={({ activePage, onClick }) => {
          return (
            <Card isLarge={isLarge} data={data[current]} isSmall={isSmall} sectionColour={sectionColour}>
              <CustomPagination
                activePage={activePage}
                /* @ts-ignore */
                onClick={onClick}
                current={current}
                data={data}
              />
            </Card>
          );
        }}
      >
        {data.map(row => (
          <div style={{ width: '100%' }}>
            <AspectRatio ratio="3:2">
              <img src={row.carouseldata.image} />
            </AspectRatio>
          </div>
        ))}
      </StyledCarousel>
    </CarouselContainer>
  );
};

export default GalleryCarousel;
