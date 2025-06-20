import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleAudio } from './ArticleAudio';

storiesOf('Typescript Component/Article Audio', module).add(
  'Article Audio',
  () => {
    return (
      <div style={{ padding: '10px' }}>
        <div style={{ marginLeft: '50px' }}>
          <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
        </div>
      </div>
    );
  }
);
