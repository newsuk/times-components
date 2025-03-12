import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { SocialMediaEmbed } from './SocialMediaEmbed';
import { SocialEmbedsProvider } from '../../contexts/SocialEmbedsProvider';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

storiesOf('Typescript Component/SocialMediaEmbed', module).add(
  'Instagram',
  () => (
    <SocialEmbedsProvider>
      <Wrapper>
        <SocialMediaEmbed
          url="https://www.instagram.com/p/CEuqUvxBqGB"
          vendorName="instagram"
          id="c5a0fc3a-d42c-462e-8576-fa3599fbfd2f"
        />
      </Wrapper>
    </SocialEmbedsProvider>
  )
);

storiesOf('Typescript Component/SocialMediaEmbed', module).add(
  'Twitter',
  () => (
    <SocialEmbedsProvider>
      <Wrapper>
        <SocialMediaEmbed
          url="https://twitter.com/realDonaldTrump/status/1034663158357655552"
          vendorName="twitter"
          id="c9fda8ab-3809-432e-c88b-bfcecf6900bc"
        />
      </Wrapper>
    </SocialEmbedsProvider>
  )
);
