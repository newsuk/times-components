import React from 'react';
import styled from 'styled-components';

import { showcaseConverter } from '@times-components/storybook';
import Carousel from './Carousel';

const Item = styled.div`
  background-color: blue;
  height: 100px;
  width: 100%;
  font-size: 24px;
  color: white;
  align-items: center;
`

const showcase = {
  children: [
    {
      component: () => (
        <Carousel>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>4</Item>
          <Item>5</Item>
          <Item>6</Item>
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
