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

import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

export type DataObj = {
  headline: string;
  label: string;
  carouseldata: CarouselDataObj[];
};

export type CarouselDataObj = {
  imageTitle?: string;
  copy?: string;
  credit: string;
  image: string;
};

const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  onClick: (current: number, label?: string) => number;
  data: DataObj;
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
        {data.carouseldata.map(({}, index) => {
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
        disabled={activePage === data.carouseldata.length - 1}
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
  data: DataObj;
  sectionColour: string;
  initialIndex?: number;
};

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
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
          component_name: `${data.headline}`
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
                      component_name: data.headline
                    }
                  });
                }
                onClick && onClick(index);
              };
              return (
                <Card
                  isLarge={isLarge}
                  data={data.carouseldata[current]}
                  headline={data.headline}
                  label={data.label}
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
            {data.carouseldata.map(row => (
              <div style={{ width: '100%' }}>
                <AspectRatio ratio="3:2">
                  <img src={row.image} />
                </AspectRatio>
              </div>
            ))}
          </StyledCarousel>
          <MobileOrLarge isLarge={isLarge}>
            <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <Credit isLarge={isLarge}>
                {data.carouseldata[current].credit}
              </Credit>
              {data.carouseldata[current].imageTitle && (
                <ImageTitle isLarge={isLarge}>
                  {data.carouseldata[current].imageTitle}
                </ImageTitle>
              )}
              {data.carouseldata[current].copy && (
                <Copy isLarge={isLarge}>{data.carouseldata[current].copy}</Copy>
              )}
            </div>
          </MobileOrLarge>
        </CarouselContainer>
      )}
    </TrackingContextProvider>
  );
};

export default GalleryCarousel;
