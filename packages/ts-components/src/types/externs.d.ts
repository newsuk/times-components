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

declare module '@times-components/ts-slices' {
  export const Slice = React.FC;
  export type SliceArticle = {
    id?: string;
    url?: string;
    label?: string;
    byline?: string;
    headline: string;
    standfirst?: string;
    summary?: string;
    cta?: string;
    datePublished?: string;
    dateUpdated?: string;
    template?: string;
    images: {
      alt?: string;
      crops: Array<{
        url: string;
        ratio: string;
      }>;
    };
  };
  export type ClickHandlerType = (
    event: MouseEventType,
    article: SliceArticle,
    position?: string
  ) => void;
  export type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>;
}

declare module '@times-components/ts-styleguide' {
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

  type FontFactory = () => {
    fontFamily: Record<string, string>;
    fontSize: Record<string, number>;
    lineHeight: ({ font: string, fontSize: number }) => number;
  };

  export const fonts: Fonts;
  export const fontSizes: {
    newsletterPuffCopy: number;
    newsletterPuffHeadline: number;
    newsletterPuffLabel: number;
  };
  export const timesFontFactory: fontSizes;
  export const spacing: (multiple: number) => number;
  export const breakpoints: Breakpoints;
  export const colours: Colours;
  export const tabletRowPadding: number;

  export const scales: {
    large: string;
    medium: string;
    xlarge: string;
  };
  const styleguide: () => {
    colours: Colours;
    fontFactory: FontFactory;
  };

  export { styleguide };
  export default styleguide;
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

  export const TcView: React.FC<{ style?: React.CSSProperties }>;
  export const TcText: React.FC<{ style?: React.CSSProperties }>;
  export const TcScrollView: React.FC<{ style?: React.CSSProperties }>;
  export const capitalise: (s: string) => string;
  export const stripTags: (input: string, replaceWith: string) => string;
  export const gqlRgbaToStyle: (colour: string | undefined) => string | null;
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
    slice: any;
    isVisible: boolean;
    onPress?: any;
    analyticsStream: AnalyticsStreamType;
  };
  const RelatedArticles: FC<RelatedArticles>;
  export default RelatedArticles;
}
