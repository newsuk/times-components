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
