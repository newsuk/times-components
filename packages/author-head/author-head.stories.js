import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Header,
  Photo,
  Name,
  Title
} from './author-head';

const data = {
  uri: 'https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=200',
  name: 'Carol Midgley',
  title: 'Columnist'
};

storiesOf('AuthorHead', module)
  .add('Profile Photo', () => (
    <Photo uri={data.uri} />
  ))
  .add('Profile Name', () => (
    <Name>Renatinho</Name>
  ))
  .add('Profile Title', () => (
    <Title>{data.title}</Title>
  ))
  .add('Full Header', () => (
    <Header {...data} />
  ));
