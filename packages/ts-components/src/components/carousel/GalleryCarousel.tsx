import React, { useState } from 'react';
import { Card } from './Card';
import {
  CarouselButtonContainer,
  CarouselButton,
  CarouselIndicatorContainer,
  CarouselIndicator,
  CarouselContainer,
  StyledCarousel,
  Copy,
  Credit,
  ImageTitle,
  MobileOrLarge
} from './styles';
import { DataObj, CarouselDataObj } from './types';

import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  onClick: (current: number, label?: string) => number;
  data: CarouselDataObj[];
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
  data: DataObj;
  sectionColour: string;
  initialIndex?: number;
};

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  data,
  sectionColour,
  initialIndex = 0
}) => {
  const isSmall = (size: string) => {
    if (size === '4033') {
      return true;
    }
    return false;
  };

  const isLarge = (size: string) => {
    if (size === '4035') {
      return true;
    }
    return false;
  };

  const panelData = data.fields;
  const carouselData = data.body.data;

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
          component_name: `${panelData.headline}`
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
          isLarge={isLarge(panelData.size)}
          isSmall={isSmall(panelData.size)}
          ref={intersectObserverRef}
        >
          <StyledCarousel
            sectionColour={sectionColour}
            isLarge={isLarge(panelData.size)}
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
                      component_name: panelData.headline
                    }
                  });
                }
                onClick && onClick(index);
              };
              return (
                <Card
                  isLarge={isLarge(panelData.size)}
                  data={carouselData[current]}
                  headline={panelData.headline}
                  label={panelData.label}
                  isSmall={isSmall(panelData.size)}
                  sectionColour={sectionColour}
                >
                  <CustomPagination
                    activePage={activePage}
                    /* @ts-ignore */
                    onClick={handlePaginationClick}
                    current={current}
                    data={carouselData}
                  />
                </Card>
              );
            }}
          >
            {carouselData.map(row => (
              <div style={{ width: '100%' }}>
                <AspectRatio ratio="3:2">
                  <img src={row.data.image} />
                </AspectRatio>
              </div>
            ))}
          </StyledCarousel>
          <MobileOrLarge isLarge={isLarge(panelData.size)}>
            <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <Credit isLarge={isLarge(panelData.size)}>
                {carouselData[current].data.credit}
              </Credit>
              {carouselData[current].data.imageTitle && (
                <ImageTitle isLarge={isLarge(panelData.size)}>
                  {carouselData[current].data.imageTitle}
                </ImageTitle>
              )}
              {carouselData[current].data.copy && (
                <Copy isLarge={isLarge(panelData.size)}>
                  {carouselData[current].data.copy}
                </Copy>
              )}
            </div>
          </MobileOrLarge>
        </CarouselContainer>
      )}
    </TrackingContextProvider>
  );
};

export default GalleryCarousel;
