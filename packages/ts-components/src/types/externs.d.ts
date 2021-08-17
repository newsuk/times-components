declare module '@times-components/storybook' {
  export const showcaseConverter: (module: any, showcase: any) => any;
}

declare module '@times-components/tealium-utils' {
  export const storybookreporter: any;
}

declare module '@times-components/tracking' {
  import { FC } from 'react';
  type AnalyticsStreamType = (event: any) => void;

  export interface AnalyticsProps {
    analyticsStream: AnalyticsStreamType;
    section: string;
  }

  export function withTrackingContext<T>(component: FC<T>, attr: any): FC<T>;
  export function withTrackEvents<T>(component: FC<T>, attr: any): FC<T>;
}

declare module '@times-components/icons' {
  import { FC } from 'react';
  type IconProps = {
    fillColour: string | null;
    height?: number;
    width?: number;
  };
  export const IconForwardChevron: FC<IconProps>;
  export const IconForwardArrow: FC<IconProps>;
}

declare module '@times-components/image' {
  import { FC } from 'react';

  export const Placeholder: FC;
  const Image: FC<{
    aspectRatio: number;
    uri: string;
  }>;
  export default Image;
}

declare module '@times-components/test-utils' {
  export const delay: (ms: number) => Promise<never>;
}

declare module '@times-components/utils' {
  type appendToImageURL = (
    url: string,
    key: string,
    value: string | number
  ) => string;

  export const capitalise: (s: string) => string;
  export const stripTags: (input: string, replaceWith: string) => string;
}

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  type Breakpoints = {
    small: string;
    medium: string;
    wide: string;
    huge: string;
  };

  type Fonts = {
    body: string;
    bodyRegular: string;
    headline: string;
    brandColour: string;
    headlineRegular: string;
    supporting: string;
  };

  export const fonts: Fonts;
  export const fontSizes: {
    newsletterPuffCopy: number;
    newsletterPuffHeadline: number;
    newsletterPuffLabel: number;
  };
  export const spacing: (multiple: number) => number;
  export const breakpoints: Breakpoints;
  export const colours: Colours;

  export const scales: {
    large: string;
    medium: string;
    xlarge: string;
  };
  const styleguide: () => {
    colours: any;
    fontFactory: (v: any) => any;
  };

  export default styleguide;
}

declare module '@times-components/button' {
  import { FC } from 'react';

  type ButtonProps = {
    fontSize?: number;
    lineHeight?: number;
    onPress?: () => void;
    style?: {};
    title?: string;
    textStyle?: {};
    underlayColor?: string;
  };
  const Button: FC<ButtonProps>;
  export default Button;
}

type ResponsiveLinkStyles = { [selector: string]: string };

declare module '@times-components/link' {
  import { FC } from 'react';

  type LinkProps = {
    url: string;
    onPress: () => void;
    target?: string;
    underlined?: boolean;
    responsiveLinkStyles?: ResponsiveLinkStyles;
  };
  const Link: FC<LinkProps>;
  export default Link;
}

declare module '@times-components/provider' {
  export const GetNewsletter: React.FC<{
    code: string;
    ssr: boolean;
    debounceTimeMs: number;
  }>;
}

declare module '@times-components/provider-queries' {
  import { DocumentNode } from 'graphql';
  export const getNewsletter: DocumentNode;
  export const subscribeNewsletter: DocumentNode;
}

declare module '@times-components/provider-test-tools' {
  export const MockedProvider: React.FC<{ mocks: any }>;
}

declare module '@times-components/date-publication' {
  type DatePublicationProps = {
    date: string;
    publication?: 'SUNDAYTIMES' | 'TIMES';
    showDay: boolean;
  };

  export const DatePublication: React.FC<DatePublicationProps>;
  export default DatePublication;
}

declare module '@times-components/related-articles' {
  import { FC } from 'react';
  type RelatedArticles = {
    heading?: string;
    analyticsStream: AnalyticsStreamType;
    isVisible: boolean;
    slice: any;
  };
  const RelatedArticles: FC<RelatedArticles>;
  export default RelatedArticles;
}
