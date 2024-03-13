import React, { useRef } from 'react';
import {
  GridLayout,
  getSSRId,
  Scroll,
  GridLayoutItem,
  LinkInline
} from 'newskit';
import { Puzzle } from '../archive/types';
import { StyledTitleBar } from './styles';
import { ScrollControls } from './ScrollControls';
import { PuzzleCard } from '../puzzle-card';
import { PuzzleScrollClickHandlerType } from './types';

export interface CardsContainerProps {
  cards: Puzzle[];
  title?: string;
  isScrollable?: boolean;
  seeAllLink?: string;
  isImageCropped?: boolean;
  isDashHidden?: boolean;
}

export const CardsContainer = ({
  cardsProps,
  clickHandler
}: {
  cardsProps: CardsContainerProps;
  clickHandler: PuzzleScrollClickHandlerType;
}) => {
  const {
    cards,
    title,
    isScrollable = false,
    seeAllLink,
    isImageCropped = false,
    isDashHidden = false
  } = cardsProps;

  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  return (
    <>
      <StyledTitleBar
        headingAs="h2"
        overrides={{
          paddingBlock: {
            xs: 'space040',
            lg: 'space050'
          },
          paddingInline: 'space000',
          heading: {
            typographyPreset: {
              xs: 'editorialDisplay002',
              md: 'editorialDisplay003',
              lg: 'editorialDisplay004'
            },
            stylePreset: 'inkBrand010'
          },

          stylePreset: isDashHidden ? '' : 'dashedDivider'
        }}
        actionItem={() =>
          isScrollable && cards.length > 4 ? (
            <ScrollControls
              scrollProps={{
                scrollRef,
                cardRef,
                seeAllLink,
                sectionTitle: title
              }}
              clickHandler={clickHandler}
            />
          ) : null
        }
        hideActionItemOn={{
          xs: true,
          sm: true
        }}
        data-testid="title-bar"
      >
        {seeAllLink ? (
          <LinkInline
            href={seeAllLink}
            data-testid="card-controller-see-all-link"
            overrides={{
              externalIcon: { size: '0' },
              stylePreset: 'inkBrand010'
            }}
          >
            {title}
          </LinkInline>
        ) : (
          <span data-testid="no-see-all-link">{title}</span>
        )}
      </StyledTitleBar>
      <Scroll
        ref={scrollRef}
        overrides={{
          overlays: { stylePreset: '__delete' }
        }}
        data-testid="scroll-container"
      >
        <GridLayout
          columns={
            !isScrollable
              ? {
                  xs: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)'
                }
              : undefined
          }
          autoFlow={isScrollable ? 'column' : undefined}
          autoColumns={
            isScrollable ? { xs: '154px', lg: '218px', xl: '293px' } : undefined
          }
          columnGap={{
            xs: isScrollable ? 'space030' : 'space050',
            md: 'space060'
          }}
          rowGap={{
            xs: 'space060',
            md: 'space070'
          }}
        >
          {' '}
          {cards.map((card, index) => (
            <GridLayoutItem
              key={getSSRId()}
              data-test-id="single-card"
              ref={cardRef}
            >
              <PuzzleCard
                data={card}
                isImageCropped={isImageCropped}
                isLazyLoading={index > 3}
              />
            </GridLayoutItem>
          ))}
        </GridLayout>
      </Scroll>
    </>
  );
};
