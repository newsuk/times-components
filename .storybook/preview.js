import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { configure } from '@storybook/react';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories)\.(tsx|js)$/
);

const customViewports = {
  huge: {
    name: 'huge',
    styles: {
      width: '1320px',
      height: '963px',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  nativeTablet: {
    name: 'nativeTablet',
    styles: {
      width: '660px',
      height: '963px',
    },
  },
  nativeTabletWide: {
    name: 'nativeTabletWide',
    styles: {
      width: '1194px',
      height: '963px',
    },
  },
  small: {
    name: 'small',
    styles: {
      width: '520px',
      height: '720px',
    },
  },
  wide: {
    name: 'wide',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
};


addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Times Components',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
    hierarchySeparator: /\//
  },
  viewport: {
    viewports: customViewports
  }
});

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);

