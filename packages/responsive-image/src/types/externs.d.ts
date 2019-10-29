declare module '*.png';

declare module '@times-components/styleguide' {
  type ColourMap = Record<string, string>;
  type Colours = Record<string, ColourMap>;

  export const colours: Colours;
}

declare module 'react-native-hooks' {
  export const useLayout: () => {
    onLayout: () => {};
    width?: number;
    height?: number;
  };
}
