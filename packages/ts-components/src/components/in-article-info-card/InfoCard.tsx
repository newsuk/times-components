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

export type InfoCardData = {
  type: string;
  data: {
    image?: string;
    subtitle?: string;
    copy?: string;
  };
};

export type GalleryCarouselProps = {
  sectionColour: string;
  initialIndex?: number;
};

export enum Layout {
  Standard = '4043',
  Wide = '4042'
}

let showDisplayItem: number;
let showDotItem: number;
let windowWidth: string;
let isWideLayout: boolean;
let isSmallLayout: number;
let breakPointsCard = new Array();

const { small, medium, wide } = breakpoints;
const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  sanitiseHtml?: boolean;
  onClick: (current: number, label?: string, sanitiseHtml?: boolean) => number;
  data: InfoCardData[];
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
          if (windowWidth >= wide) {
            showDisplayItem = isWideLayout
              ? breakPointsCard[2].itemsToShow
              : (showDisplayItem = breakPointsCard[1].itemsToShow);
            isSmallLayout = 0;
          } else if (windowWidth >= medium && windowWidth <= wide) {
            showDisplayItem = breakPointsCard[1].itemsToShow;
            isSmallLayout = 0;
          } else {
            showDisplayItem = breakPointsCard[0].itemsToShow;
            isSmallLayout = 1;
          }
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
          Math.trunc(data.length / showDisplayItem - isSmallLayout)
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

  const isStandard = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Standard;
  };

  const isWide = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Wide;
  };

  const [winWidth, setWidth] = useState(window.innerWidth);
  const updateWidth = () => setWidth(window.innerWidth);
  windowWidth = winWidth.toString();
  isWideLayout = isWide(size);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

  const defaultCard = [{ width: small, itemsToShow: 1, itemsToScroll: 1 }];
  if (isWideLayout) {
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

  if (windowWidth < medium) {
    showDisplayItem = breakPointsCard[0].itemsToScroll;
  } else if (windowWidth >= wide && isWideLayout) {
    showDisplayItem = breakPointsCard[2].itemsToScroll;
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
      isWide={isWideLayout}
      isStandard={isStandard(size)}
    >
      <StyledCarousel
        sectionColour={sectionColour}
        breakPoints={breakPointsCard}
        isRTL={false}
        onChange={handleChange}
        showArrows={false}
        renderPagination={({ activePage, onClick }) => {
          const handlePaginationClick = (indicatorId: string) => {
            onClick && onClick(indicatorId);
          };
          return (
            <Card
              data={infoCardData[current]}
              headline={headline}
              label={label}
              sectionColour={sectionColour}
            >
              {infoCardData.length >
                (isWideLayout && (windowWidth >= wide && isWideLayout)
                  ? 3
                  : 2) && (
                <CustomPagination
                  activePage={activePage}
                  /* @ts-ignore */
                  onClick={handlePaginationClick}
                  current={current}
                  data={infoCardData}
                  isWide={isWideLayout}
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
