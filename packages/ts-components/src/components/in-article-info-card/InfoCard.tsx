import React, { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { Placeholder } from '@times-components/image';
import { breakpoints } from '@times-components/styleguide';
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
  CardImg,
  PlaceholderContainer
} from './styles';
import { Arrow } from '../carousel/Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { useFetch } from '../../helpers/fetch/FetchProvider';

const sanitiseCopy = (copy: string, allowedTags: string[] = []) =>
  sanitizeHtml(copy, { allowedTags, allowedAttributes: {} });

export type InfoCardDataObj = {
  type: string;
  data: {
    image?: string;
    subHeading?: string;
    bodyCopy: string;
  };
};

export type GalleryCarouselProps = {
  sectionColour: string;
  initialIndex?: number;
};

let showDisplayItem: number;
let showDotItem: number;
let breakPointsCard = new Array();

const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  sanitiseHtml?: boolean;
  onClick: (current: number, label?: string, sanitiseHtml?: boolean) => number;
  data: InfoCardDataObj[];
}> = ({ activePage, onClick, current, data }) => {
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
        disabled={activePage === data.length / showDisplayItem - 1}
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
  const { loading, error, data } = useFetch();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error) {
    return null;
  }

  const { headline, label, size } = data.fields;
  const infoCardData = data.body.data;

  const isStandard = (infoCardSize: string) => {
    if (infoCardSize === '4043') {
      return true;
    }
    return false;
  };

  const isWide = (infoCardSize: string) => {
    if (infoCardSize === '4042') {
      return true;
    }
    return false;
  };

  const [winWidth, setWidth] = useState(window.innerWidth);
  const { small, medium, wide } = breakpoints;
  const updateWidth = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

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

  const width = winWidth.toString();
  let isWideScreen: boolean;
  if (width < medium) {
    showDisplayItem = breakPointsCard[0].itemsToScroll;
  } else if (width >= wide && isWide(size)) {
    showDisplayItem = breakPointsCard[2].itemsToScroll;
    isWideScreen = true;
  } else {
    showDisplayItem = breakPointsCard[1].itemsToScroll;
  }
  showDotItem = infoCardData.length / showDisplayItem;

  const [current, setCurrent] = useState(initialIndex);
  const handleChange = (event: any) => {
    setCurrent(event.index);
  };
  return (
    <CarouselContainer
      sectionColour={sectionColour}
      isWide={isWide(size)}
      isStandard={isStandard(size)}
    >
      <StyledCarousel
        sectionColour={sectionColour}
        breakPoints={breakPointsCard}
        isRTL={false}
        onChange={handleChange}
        showArrows={false}
        renderPagination={({ activePage, onClick }) => {
          const handlePaginationClick = (index: string) => {
            onClick && onClick(index);
          };
          return (
            <Card
              data={infoCardData[current]}
              headline={headline}
              label={label}
              sectionColour={sectionColour}
            >
              {infoCardData.length > (isWide(size) && isWideScreen ? 3 : 2) && (
                <CustomPagination
                  activePage={activePage}
                  /* @ts-ignore */
                  onClick={handlePaginationClick}
                  current={current}
                  data={infoCardData}
                  isWide={isWide(size)}
                />
              )}
            </Card>
          );
        }}
      >
        {infoCardData.map((row: any, index: any) => (
          <InfoCardContainer key={index}>
            {row.data.image && (
              <AspectRatio ratio="16:9">
                <CardImg src={row.data.image} />
              </AspectRatio>
            )}
            {row.data.subtitle && <SubHeading>{row.data.subtitle}</SubHeading>}
            {row.data.copy && (
              <BodyCopy
                dangerouslySetInnerHTML={{
                  __html: sanitiseCopy(row.data.copy, ['br', 'b', 'i'])
                }}
              />
            )}
          </InfoCardContainer>
        ))}
      </StyledCarousel>
    </CarouselContainer>
  );
};

export default InfoCard;
