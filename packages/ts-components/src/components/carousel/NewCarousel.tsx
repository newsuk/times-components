import React, { useState, useRef, useEffect } from 'react';
import ReactElasticCarousel from 'react-elastic-carousel';
import { Card } from './Card';
import { Image, CarouselButtonContainer, CarouselButton, DotContainer, Dot, Container, CardButtonContainer } from './styles';
import { Arrow } from './Arrow';
import { AspectRatio } from '../aspect-ratio/AspectRatio';

const data = [
    {
      paneldata: {
        label: 'label 1',
        headline: 'In Pictures - Cyclone Debbie',
        copy: 'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac cras',
      },
        carouseldata: {
          image: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
        }
    },
    {
      paneldata: {
        label: 'label 2',
        headline: 'NOT In Pictures - Cyclone MARGARET',
        copy: 'This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy.',
      },
        carouseldata: {
          image: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
        }
    },
    {
        paneldata: {
          label: 'label 3',
          headline: 'In Pictures - Cyclone Debbie',
          copy: 'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac cras',
        },
        carouseldata: {
          image: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
        }
    },
    {
      paneldata: {
        label: 'label 4',
        headline: 'NOT In Pictures - Cyclone MARGARET',
        copy: 'This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy.',
      },
        carouseldata: {
          image: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
        }
    }
];
export const NewCarousel = () => {
    const [current, setCurrent] = useState(0);
    const handleChange = (data: any) => {
        console.log(data);
        setCurrent(data.index);
    };

    useEffect(() => {
      console.log(current, 'CURRENT')
    })
    // @ts-ignore
const carousel = useRef<ReactElasticCarousel | null>(null);
    return (
      <Container>
            <ReactElasticCarousel
                style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'initial'}}
                itemsToScroll={1}
                itemsToShow={1}
                isRTL={false}
                onChange={handleChange}
                showArrows={false}
                renderPagination={({  activePage, onClick }) => {
                  return (
                    <Card {...data[current].paneldata}>
                      <CardButtonContainer>
                    <CarouselButtonContainer>
              <CarouselButton
                disabled={activePage === 0}
                onClick={() => onClick(`${current - 1}`)}
              >
                <Arrow />
              </CarouselButton>
              <DotContainer>
                      {/* @ts-ignore */}
                      {data.map((child, index) => {
                        const isActivePage = activePage === index
                          return (
                          <Dot
                            key={index}
                            onClick={() => onClick(`${index}`)}
                            active={isActivePage}
                          />
                        )
                      })}
                    </DotContainer>
                    <CarouselButton
                    // @ts-ignore
                    disabled={activePage === data.length -1}
                    className="nextBtn"
                    onClick={() => onClick(`${current + 1}`)}
                    >
                    <Arrow />
              </CarouselButton>
              </CarouselButtonContainer>
              </CardButtonContainer>
              </Card>
                  )
                }}
                >
                {data.map(row => (
                  <div style={{ width: '100%'}}>
                  <AspectRatio ratio="16:9">
                  <Image src={row.carouseldata.image}></Image>
                  </AspectRatio>
                  </div>
                  ))}
            </ReactElasticCarousel>
            </Container>
    );
};

export default NewCarousel;