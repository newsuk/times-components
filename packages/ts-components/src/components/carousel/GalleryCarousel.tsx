import React, { useState } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { Card } from './Card';
import { CarouselButtonContainer, CarouselButton, CarouselIndicatorContainer, CarouselIndicator, CardButtonContainer, ImageContainer, Credit, CreditButtonContainer, Label, CardContainer, Headline, Copy, MobileCopyCreditContainer, MobileHeadlineLabelContainer } from './styles';
import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { breakpoints } from '@times-components/styleguide';


const StyledCarousel = styled(ReactElasticCarousel)<{isLarge: boolean, sectionColour: string}>`
  display: flex;
  height: fit-content;
  align-items: initial;
  
  
  .rec .rec-slider-container {
    margin: 0px;
  }
  flex-direction: column;
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: ${({ isLarge }) => isLarge || window.innerWidth < 1024 ? 'column-reverse' : 'row-reverse'};
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

const CarouselContainer = styled.div<{ sectionColour: string}>`
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  flex-direction: column-reverse;
`

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
    <CarouselContainer sectionColour={sectionColour}>
      { window.innerWidth < 768 &&
      <MobileHeadlineLabelContainer isLarge={isLarge} sectionColour={sectionColour}>
      <Label >{data[current].paneldata.label}</ Label>
      <Headline>{data[current].paneldata.headline}</Headline>
      </MobileHeadlineLabelContainer>
      }
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
        <Card isLarge={isLarge}>
          {window.innerWidth < 768 ? (
            <>
          <MobileCopyCreditContainer>
          <Copy>{data[current].paneldata.copy}</Copy>
          </MobileCopyCreditContainer>
                  <CreditButtonContainer>
                      <Credit>{'Mobile Credit'}</Credit>
                    <CardButtonContainer isLarge={isLarge}>
                      {/* @ts-ignore */}
                      <CustomPagination activePage={activePage} onClick={onClick} current={current} data={data} />
                    </CardButtonContainer>
                  </CreditButtonContainer></>) : (
                    <>
                    <div style={{height: '100%'}}>
                    <Label >{data[current].paneldata.label}</ Label>
                    <Headline>{data[current].paneldata.headline}</Headline>
                    <Copy>{data[current].paneldata.copy}</Copy>
                    {
                      isLarge ? (null) : (<Credit>{'Credit outside of mobile'}</Credit>) 
                    }
                    </div>
                    <CreditButtonContainer>
                      {isLarge ? (<Credit>{'Credit large outside of mobile'}</Credit>) : (null)}
                      <CustomPagination activePage={activePage} onClick={onClick} current={current} data={data} />
                    </CreditButtonContainer>
                  </>
                  )
          }
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
    </CarouselContainer>
  );
};

export default GalleryCarousel;