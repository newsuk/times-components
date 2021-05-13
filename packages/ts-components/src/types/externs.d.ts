declare module '@times-components/storybook' {
  export const showcaseConverter: (module: any, showcase: any) => any;
}

declare module '@times-components/icons' {
  import { FC } from 'react';

  export const IconForwardChevron: FC<{
    fillColour: string;
    height: number;
    width: number;
  }>;
}

declare module '@times-components/image' {
  import { FC } from 'react';

  export const Placeholder: FC;
}

declare module '@times-components/test-utils' {
  export const delay: (ms: number) => Promise<never>;
}

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  type Breakpoints = {
    medium: string;
    wide: string;
    huge: string;
  };

  type Fonts = {
    body: string;
    headline: string;
    supporting: string;
  };

  export const fonts: Fonts;
  export const spacing: (multiple: number) => number;
  export const breakpoints: Breakpoints;
  export const colours: Colours;
}
