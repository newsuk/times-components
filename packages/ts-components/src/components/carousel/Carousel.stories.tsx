import React from 'react';
import styled from 'styled-components';

import { showcaseConverter } from '@times-components/storybook';
import Carousel from './Carousel';

const Item = styled.div`
  background-color: purple;
  height: 200px;
  color: white;
  width: 100%;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const showcase = {
  children: [
    {
      component: () => (
        <Carousel>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Carousel>
      ),
      name: 'Carousel',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Carousel'
};

// @ts-ignore
showcaseConverter(module, showcase);
