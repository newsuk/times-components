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
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

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
    margin: 0;
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
  onClick: (current: number, label?: string) => number;
  data: DataObj[];
}> = ({ activePage, onClick, current, data }) => {
  return (
    <CarouselButtonContainer>
      <CarouselButton
        data-testid="Previous button"
        disabled={activePage === 0}
        onClick={() => onClick(current - 1, 'left')}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
      <CarouselIndicatorContainer>
        {data.map(({}, index) => {
          const isActivePage = activePage === index;
          return (
            <CarouselIndicator
              data-testid="Page Indicator"
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
        onClick={() => onClick(current + 1, 'right')}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
    </CarouselButtonContainer>
  );
};

export type GalleryCarouselProps = {
  isLarge: boolean;
  isSmall: boolean;
  data: DataObj[];
  sectionColour: string;
  initialIndex?: number;
};
const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  isLarge,
  data,
  sectionColour,
  isSmall,
  initialIndex = 0
}) => {
  const [current, setCurrent] = useState(initialIndex);
  const handleChange = (event: any) => {
    setCurrent(event.index);
  };
  return (
    <TrackingContextProvider
      context={{
        object: 'GalleryCarousel',
        attrs: {
          component_type: 'in-article component : gallery : interactive',
          event_navigation_action: 'navigation',
          component_name: `${data[0].paneldata.headline}`
        }
      }}
      scrolledEvent={{
        attrs: {
          event_navigation_name: 'in-article component displayed : gallery',
          event_navigation_browsing_method: 'scroll'
        }
      }}
    >
      {({ intersectObserverRef, fireAnalyticsEvent }) => (
        <CarouselContainer
          sectionColour={sectionColour}
          isLarge={isLarge}
          isSmall={isSmall}
          ref={intersectObserverRef}
        >
          <MobileHeadlineLabelContainer>
            <Label sectionColour={sectionColour}>
              {data[current].paneldata.label}
            </Label>
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
              const handlePaginationClick = (index: string, label?: string) => {
                if (label) {
                  fireAnalyticsEvent({
                    attrs: {
                      event_navigation_name: `button : ${label}`,
                      component_name: data[current].paneldata.headline
                    }
                  });
                }
                onClick && onClick(index);
              };
              return (
                <Card
                  isLarge={isLarge}
                  data={data[current]}
                  isSmall={isSmall}
                  sectionColour={sectionColour}
                >
                  <CustomPagination
                    activePage={activePage}
                    /* @ts-ignore */
                    onClick={handlePaginationClick}
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
      )}
    </TrackingContextProvider>
  );
};

export default GalleryCarousel;
