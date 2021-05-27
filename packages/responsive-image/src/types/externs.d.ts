declare module '*.png';

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  export const colours: Colours;
}

declare module '@times-components/utils' {
  type appendToImageURL = (
    url: string,
    key: string,
    value: string | number
  ) => string;

  export const appendToImageURL: appendToImageURL;

  export const capitalise: (s: string) => string;
}

declare module 'react-native-hooks' {
  export const useLayout: () => {
    onLayout: () => {};
    width?: number;
    height?: number;
  };
}
