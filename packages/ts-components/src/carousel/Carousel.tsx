import React from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';

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
          itemsToShow: 3,
          itemsToScroll: 3,
          itemPadding: [0, largePadding / 2]
      },
      {
          width: 1024 - largePadding * 2,
          itemsToShow: 4,
          itemsToScroll: 4,
          itemPadding: [0, largePadding / 2]
      }
  ];

  return (
      <ReactElasticCarousel
        breakPoints={breakPoints}
        enableMouseSwipe={false}
        isRTL={false}
      >
        {children}
      </ReactElasticCarousel>
  )
};

export default Carousel;