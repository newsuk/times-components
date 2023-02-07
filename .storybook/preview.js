import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs';

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories)\.(tsx|js)$/
);

const customViewports = {
  extraSmall: {
    name: 'XS',
    styles: {
      width: '320px',
      height: '720px',
    },
  },
  small: {
    name: 'SM',
    styles: {
      width: '520px',
      height: '720px',
    },
  },
  medium: {
    name: 'MD',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  wide: {
    name: 'LG',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
  huge: {
    name: 'XL',
    styles: {
      width: '1440px',
      height: '736px',
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
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

const loadStories = () => req.keys().filter(k => k.indexOf("brightcove-video") === -1).forEach(filename => req(filename));

configure(loadStories, module);

