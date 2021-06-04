import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import Carousel from './Carousel';
import { Card } from './Card';
import { Image } from './styles';

export const ImageContainer: React.FC<{
  image: string;
}> = ({ image }) => {
  return (<Image src={image}/>)
}

const props1 = {
  headline: "In Pictures - Cyclone Debbie",
  label: "Venezuelan Politics",
  copy: "Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac cras",
  image: "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180"
}

const props2 = {
  headline: "NOT In Pictures - Cyclone MARGARET",
  label: "British Politics",
  copy: "This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy.",
  image: "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F37b188b4-c383-11eb-8601-6a2ece3e4634.jpg?crop=3500%2C1969%2C0%2C182&resize=1180"
}

const showcase = {
  children: [
    {
      component: () => (
        <Carousel>
          <Card {...props1} />
          <Card {...props2} />
          <Card {...props1} />
          <Card {...props2} />
        </Carousel>
      ),
      name: 'Carousel',
      type: 'story'
    },
  ],
  name: 'Typescript Component/Carousel'
};

// @ts-ignore
showcaseConverter(module, showcase);