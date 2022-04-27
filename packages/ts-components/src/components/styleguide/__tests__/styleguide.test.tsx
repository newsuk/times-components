import {render} from '@testing-library/react';

import styleguide, { colours, fonts, spacing } from '../Styleguide';
import {Animations, TcView, TcText} from '../components'

describe('styleguide', () => {
  describe('components', () => {
    // it('', () => {})

    it('should render the Animations component', () => {
      expect()
    })
  })
  it('should render the font sizes at the default scale', () => {
    expect(styleguide().fontSizes.bodyMobile).toEqual(17);
  });

  it('should render the line height factory default scale', () => {
    expect(
      styleguide().lineHeight({
        font: 'body',
        fontSize: 'secondary'
      })
    ).toEqual(27);
  });

  it('should render the object of section colours', () => {
    expect(typeof colours.section).toBe('object');
  });

  it('should render the object of functional colours', () => {
    expect(typeof colours.functional).toBe('object');
  });

  it('should render the object of font references', () => {
    expect(typeof fonts).toBe('object');
  });

  it('should multiply spacing values and add px property', () => {
    expect(spacing(10)).toBe('50px');
  });
});
