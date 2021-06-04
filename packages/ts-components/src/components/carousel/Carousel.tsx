import React, { useRef } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import { CarouselButtonContainer, CarouselButton, DotContainer, Dot } from './styles';
import { Arrow } from './Arrow';

const Carousel: React.FC = ({ children }) => {
  const smallPadding = 8;
  const largePadding = 20;

  const breakPoints = [
      {
          width: 1,
          itemsToShow: 1,
          itemsToScroll: 1,
          itemPadding: [0, smallPadding]
      },
      {
          width: 768 - largePadding * 2,
          itemsToShow: 1,
          itemsToScroll: 1,
          itemPadding: [0, largePadding / 2]
      },
      {
          width: 1024 - largePadding * 2,
          itemsToShow: 1,
          itemsToScroll: 1,
          itemPadding: [0, largePadding / 2]
      }
  ];
// @ts-ignore
const carousel = useRef<ReactElasticCarousel | null>(null);
const prevSlide = () => {
  // @ts-ignore
  if (carousel && carousel.current)  carousel.current.slidePrev();
};

const nextSlide = () => {
  // @ts-ignore
  if (carousel && carousel.current) carousel.current.slideNext();
}

  return (
    <>
    <ReactElasticCarousel
        breakPoints={breakPoints}
        showArrows={false}
        enableMouseSwipe={false}
        isRTL={false}
        ref={carousel}
        renderPagination={({  activePage, onClick }) => {
          return (
            <CarouselButtonContainer>
      <CarouselButton
        disabled={activePage === 0}
        onClick={() => prevSlide()}
      >
        <Arrow />
      </CarouselButton>
      <DotContainer>
              {/* @ts-ignore */}
              {children.map((child, index) => {
                const isActivePage = activePage === index
                               return (
                  <Dot
                    key={index}
                    onClick={() => onClick(index)}
                    active={isActivePage}
                  />
                )
              })}
            </DotContainer>
            <CarouselButton
            // @ts-ignore
            disabled={activePage === children.length -1}
            className="nextBtn"
            onClick={() => nextSlide()}
            >
            <Arrow />
      </CarouselButton>
      </CarouselButtonContainer>
            
          )
        }}
      >
        {children}
      </ReactElasticCarousel>
      
      </>
  )
};

export default Carousel;