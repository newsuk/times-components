import React from 'react';
import { storiesOf } from '@storybook/react';
import { List, Container, ListItem } from './ColumnSplitter';

import { ArticleHarness } from './../../fixtures/article-harness/ArticleHarness'

storiesOf('Typescript Component/Column Splitter', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))

  .add('Split Column List', () => {
    return ( 
      <Container>
        <List>
          <ListItem>Parturient enbendum</ListItem>
          <ListItem>Parturient mi dictumst suspenti donec in parturient al</ListItem>
          <ListItem>Parturient n parturient al</ListItem>
          <ListItem>Paruent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.</ListItem>
          <ListItem>Partbibendum ma a ullamcorper idParturient mi dictumst suspendisse torquent priParturient mi dictumst suspendisse torquent primi</ListItem>
        </List>
      </Container>
    );
  });
