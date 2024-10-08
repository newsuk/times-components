import React, { useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { breakpoints } from '@times-components/ts-styleguide';
import { Card } from './Card';
import {
  InfoCardContainer,
  BodyCopy,
  SubHeading,
  CarouselButtonContainer,
  CarouselButton,
  CarouselIndicatorContainer,
  CarouselIndicator,
  CarouselContainer,
  StyledCarousel,
  CardImg
} from './styles';
import { PlaceholderContainer } from '../common-styles';
import { Arrow } from '../carousel/Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { DeckData } from '../../helpers/fetch/types';
import { InfoCardData } from './types';

type InfoCardFields = { headline: string; label: string; size: Layout };

type InfoCardDeckData = DeckData<InfoCardFields, InfoCardData>;

export type GalleryCarouselProps = {
  sectionColour: string;
  initialIndex?: number;
};

export enum Layout {
  Standard = '4043',
  Wide = '4042'
}

let breakPointsCard = new Array();
const { small, medium, wide } = breakpoints;
const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  onClick: (current: number, label?: string) => number;
  data: InfoCardData[];
  showDisplayItem: number;
  windowWidth: string;
  showDotItem: number;
}> = ({
  activePage,
  onClick,
  current,
  data,
  showDisplayItem,
  windowWidth,
  showDotItem
}) => {
  return (
    <CarouselButtonContainer>
      <CarouselButton
        data-testid="Previous button"
        disabled={activePage === 0}
        onClick={() => onClick(current / showDisplayItem - 1, 'left')}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
      <CarouselIndicatorContainer>
        {data.map(({}, index) => {
          if (index < showDotItem) {
            const isActivePage = activePage === index;
            return (
              <CarouselIndicator
                data-testid="Page Indicator"
                key={index}
                onClick={() => onClick(index)}
                active={isActivePage}
              />
            );
          } else {
            return;
          }
        })}
      </CarouselIndicatorContainer>
      <CarouselButton
        data-testid="Next Button"
        disabled={
          activePage ===
          Math.trunc(
            data.length / showDisplayItem - (medium > windowWidth ? 1 : 0)
          )
        }
        className="nextBtn"
        onClick={() => onClick(current / showDisplayItem + 1, 'right')}
      >
        <Arrow size={{ width: '10px', height: '14px' }} />
      </CarouselButton>
    </CarouselButtonContainer>
  );
};

export const InfoCard: React.FC<GalleryCarouselProps> = ({
  sectionColour,
  initialIndex = 0
}) => {
  const { loading, error, data } = useFetch<InfoCardDeckData>();

  if (error) {
    return null;
  }

  if (loading || data === undefined) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  const { headline, label, size } = data.fields;
  const infoCardData = data.body.data;

  const isStandard = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Standard;
  };

  const isWide = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Wide;
  };

  const [winWidth, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [showDisplayItem, setDisplayItem] = useState(1);
  const windowWidth = winWidth.toString();
  const updateWidth = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    setDisplayItemCount();
  });

  const defaultCard = [{ width: small, itemsToShow: 1, itemsToScroll: 1 }];
  if (isWide(size)) {
    breakPointsCard = [
      ...defaultCard,
      { width: medium, itemsToShow: 2, itemsToScroll: 2 },
      { width: wide, itemsToShow: 3, itemsToScroll: 3 }
    ];
  }

  if (isStandard(size)) {
    breakPointsCard = [
      ...defaultCard,
      { width: small + 55, itemsToShow: 2, itemsToScroll: 2 }
    ];
  }

  const setDisplayItemCount = () => {
    if (windowWidth < medium) {
      setDisplayItem(breakPointsCard[0].itemsToScroll);
    } else if (windowWidth >= wide && isWide(size)) {
      setDisplayItem(breakPointsCard[2].itemsToScroll);
    } else {
      setDisplayItem(breakPointsCard[1].itemsToScroll);
    }
  };

  const showDotItem = infoCardData.length / showDisplayItem;
  const enableCarousel =
    infoCardData.length >
    (windowWidth >= wide && isWide(size) ? 3 : windowWidth < medium ? 1 : 2);
  const [current, setCurrent] = useState(initialIndex);
  const handleChange = (event: any) => {
    setCurrent(event.index);
  };
  return (
    <TrackingContextProvider
      context={{
        object: 'InfoCard',
        attrs: {
          component_type:
            'in-article component : text-image info cards : interactive',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          component_name: `${headline}`
        }
      }}
      scrolledEvent={{
        attrs: {
          component_type:
            'in-article component : text-image info cards : ' +
            (showDotItem > 1 ? 'interactive' : 'static'),
          event_navigation_name:
            'in-article component displayed : text-image info cards',
          event_navigation_browsing_method: 'scroll'
        }
      }}
    >
      {({ intersectObserverRef, fireAnalyticsEvent }) => (
        <CarouselContainer
          sectionColour={sectionColour}
          isWide={isWide(size)}
          isStandard={isStandard(size)}
          ref={intersectObserverRef}
        >
          <StyledCarousel
            sectionColour={sectionColour}
            breakPoints={breakPointsCard}
            isRTL={false}
            onChange={handleChange}
            showArrows={false}
            enableSwipe={enableCarousel}
            renderPagination={({ activePage, onClick }) => {
              const handlePaginationClick = (
                indicatorId: string,
                buttonLabel?: string
              ) => {
                if (buttonLabel) {
                  fireAnalyticsEvent({
                    attrs: {
                      event_navigation_name: `button : ${buttonLabel}`,
                      component_name: headline
                    }
                  });
                }
                onClick && onClick(indicatorId);
              };
              return (
                <Card
                  data={infoCardData[current]}
                  headline={headline}
                  label={label}
                  sectionColour={sectionColour}
                >
                  {enableCarousel && (
                    <CustomPagination
                      activePage={activePage}
                      /* @ts-ignore */
                      onClick={handlePaginationClick}
                      current={current}
                      data={infoCardData}
                      showDisplayItem={showDisplayItem}
                      windowWidth={winWidth.toString()}
                      showDotItem={showDotItem}
                    />
                  )}
                </Card>
              );
            }}
          >
            {infoCardData.map((row: InfoCardData, index: number) => (
              <InfoCardContainer key={index}>
                {row.data.image && (
                  <AspectRatio ratio="16:9">
                    <CardImg src={row.data.image} />
                  </AspectRatio>
                )}
                {row.data.subtitle && (
                  <SubHeading>{row.data.subtitle}</SubHeading>
                )}
                {row.data.copy && (
                  <BodyCopy
                    dangerouslySetInnerHTML={{
                      __html: sanitiseCopy(row.data.copy, {
                        br: {},
                        b: {},
                        i: {}
                      })
                    }}
                  />
                )}
              </InfoCardContainer>
            ))}
          </StyledCarousel>
        </CarouselContainer>
      )}
    </TrackingContextProvider>
  );
};

export default InfoCard;
