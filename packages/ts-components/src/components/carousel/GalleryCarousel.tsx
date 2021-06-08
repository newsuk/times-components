import React, { useState } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { Card } from './Card';
import { CarouselButtonContainer, CarouselButton, CarouselIndicatorContainer, CarouselIndicator, CardButtonContainer, ImageContainer, Credit, CreditButtonContainer } from './styles';
import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { breakpoints } from '@times-components/styleguide';


const StyledCarousel = styled(ReactElasticCarousel)<{isLarge: boolean, sectionColour: string}>`
  display: flex;
  height: fit-content;
  align-items: initial;
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  flex-direction: ${({ isLarge }) => isLarge || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
  @media (min-width: ${breakpoints.wide}px) {
    flex-direction: ${({ isLarge }) => isLarge ? 'column-reverse' : 'row-reverse'};
  }
  .rec .rec-slider-container {
    margin: 0px;
  }
`;

type DataObj = {
  paneldata: {
    copy: string;
    credit: string;
    headline: string;
    label: string;
  },
  carouseldata: {
    image: string;
  }
}

const CustomPagination: React.FC<{
  activePage: number;
  current: number;
  onClick: (current: number) => number;
  data: DataObj[]
}> = ({ activePage, onClick, current, data }) => {
  return (
      <CarouselButtonContainer>
        <CarouselButton
          disabled={activePage === 0}
          onClick={() => onClick(current - 1)}
        >
          <Arrow size={{ width: "10px", height: "14px" }} />
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
          disabled={activePage === data.length - 1}
          className="nextBtn"
          onClick={() => onClick(current + 1)}
        >
          <Arrow size={{ width: "10px", height: "14px" }} />
        </CarouselButton>
      </CarouselButtonContainer>
  )
};

const GalleryCarousel: React.FC<{
  isLarge: boolean;
  data: DataObj[];
  sectionColour: string;
}> = ({ isLarge, data, sectionColour }) => {
  const [current, setCurrent] = useState(0);
  const handleChange = (data: any) => {
    setCurrent(data.index);
  };
  return (
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
          <Card {...data[current].paneldata} isLarge={isLarge}>
            <CreditButtonContainer>
              {isLarge || window.innerWidth < 1024 ? (
                <Credit>{data[current].paneldata.credit}</Credit>
              ) : null}
              <CardButtonContainer isLarge={isLarge}>
                {/* @ts-ignore */}
                <CustomPagination activePage={activePage} onClick={onClick} current={current} data={data} />
              </CardButtonContainer>
            </CreditButtonContainer>
          </Card>
        );
      }}
    >
      {data.map((row) => (
        <ImageContainer>
          <AspectRatio ratio="16:9">
            <img style={{ width: '100%'}}src={row.carouseldata.image}></img>
          </AspectRatio>
        </ImageContainer>
      ))}
    </StyledCarousel>
  );
};

export default GalleryCarousel;