import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { TextCrop } from '../TextCrop';
import { Font } from '../fonts';
describe('<TextCrop>', () => {
  it('default ', () => {
    const { asFragment } = render(<TextCrop font="supporting">Text</TextCrop>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('line height ', () => {
    const { asFragment } = render(
      <TextCrop font="supporting" lineHeight={1.0}>
        Text
      </TextCrop>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('top adjustment', () => {
    const { asFragment } = render(
      <TextCrop font="supporting" topAdjustment="1px">
        Text
      </TextCrop>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('bottom adjustment', () => {
    const { asFragment } = render(
      <TextCrop font="supporting" bottomAdjustment="2px">
        Text
      </TextCrop>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('missing font', () => {
    const { asFragment } = render(
      <TextCrop font={'missing' as Font}>Text</TextCrop>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
