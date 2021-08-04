import React from 'react';

import { storiesOf } from '@storybook/react';

import { TextCrop } from './TextCrop';
import { select, text } from '@storybook/addon-knobs';
import { fonts, Font } from './fonts';

storiesOf('Typescript Component/Helpers', module).add('TextCrop', () => {
  const selection = select('Font', Object.keys(fonts), 'headline');
  const fontSize = select('Font Size', [12, 14, 16, 20, 24, 32, 36, 64], 64);
  const lineheight = select('Line Height', [1, 1.2, 1.5, 2], 1.2);
  const content = text('Text', 'Hello World');
  const font = selection as Font;
  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#fbb',
        display: 'flex',
        justifyContent: 'center',
        fontSize: `${fontSize}px`
      }}
    >
      <TextCrop lineHeight={lineheight} font={font}>
        {content}
      </TextCrop>
    </div>
  );
});
