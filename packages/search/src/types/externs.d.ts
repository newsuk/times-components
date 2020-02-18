declare module '*.png';

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  export const colours: Colours;
  export const fontFactory: any;
  export const spacing: any;
}

declare module "@times-components/article-summary" {
  export const ArticleSummaryContent: any
  export const ArticleSummaryHeadline: any
  export const ArticleSummaryStrapline:any;
}

declare module "@times-components/article-byline" {
  const Byline: any;

  export = Byline;
}

declare module 'react-native-hooks' {
  export const useLayout: () => {
    onLayout: () => {};
    width?: number;
    height?: number;
  };
}

declare module 'react-native-render-html' {
  const HTML: any;

  export = HTML;
}