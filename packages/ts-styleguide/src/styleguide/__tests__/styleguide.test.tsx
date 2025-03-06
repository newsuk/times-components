import React from 'react';
import { render } from '@testing-library/react';

import styleguide, {
  colours,
  fonts,
  fontsWithFallback,
  spacing
} from '../Styleguide';
import { Animations, TsTcText, TsTcView } from '../components';

import styles from '../helpers/storybookStyles';

describe('styleguide', () => {
  it('should return correct storybook style', () => {
    expect(styles.box.height).toEqual(100);
  });

  it('should render the object of section colours', () => {
    expect(typeof colours.section).toBe('object');
  });

  it('should render the object of functional colours', () => {
    expect(typeof colours.functional).toBe('object');
  });

  it('should multiply spacing values and add px property', () => {
    expect(spacing(10)).toEqual('50px');
  });

  describe('fonts', () => {
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

    it('should render the object of font references', () => {
      expect(typeof fonts).toBe('object');
    });

    it('should render the object of font and fallback references', () => {
      expect(typeof fontsWithFallback).toBe('object');
    });

    it('should render the supporting font roboto should correctly show font and fallback references', () => {
      expect(fontsWithFallback.supporting).toEqual(
        'Roboto-Regular, Roboto-Regular-fallback, sans-serif'
      );
    });

    it('should return object when fontFactory is called', () => {
      expect(
        styleguide().fontFactory({ font: 'headline', fontSize: 'body' })
      ).toEqual({
        fontFamily: 'TimesModern-Bold, TimesModern-Bold-fallback, serif',
        fontSize: 18,
        lineHeight: undefined
      });
    });
  });

  describe('components', () => {
    it('should render the Animations component', () => {
      expect(
        render(
          <Animations.FadeIn>
            <TsTcView style={styles.container}>
              <TsTcText style={styles.text}>Hello World</TsTcText>
            </TsTcView>
          </Animations.FadeIn>
        )
      ).toBeTruthy();
    });
  });
});
