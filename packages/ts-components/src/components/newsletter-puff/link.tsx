import React, { FC } from 'react';
import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

type ResponsiveLinkStyles = { [selector: string]: string };
type LinkProps = {
  url: string;
  onPress: () => void;
  target?: string;
  underlined?: boolean;
  responsiveLinkStyles?: ResponsiveLinkStyles;
};
type RespLinkProps = {
  href: string;
  onClick: () => void;
  underlined: boolean;
  target: string;
  responsiveLinkStyles: ResponsiveLinkStyles;
};
const respStylesSelector = (selector: string) => ({
  responsiveLinkStyles
}: RespLinkProps) =>
  (responsiveLinkStyles && responsiveLinkStyles[selector]) || '';

const RespLink = styled.a<any>`
  text-decoration: ${props =>
    props.underlined && props.responsiveLinkStyles ? 'underline' : 'none'};

  ${respStylesSelector('base')};

  @media (min-width: ${breakpoints.medium}px) {
    ${respStylesSelector('medium')};
  }
`;

export const Link: FC<LinkProps> = ({
  children,
  url,
  onPress = () => true,
  target = null,
  underlined = true,
  responsiveLinkStyles = null
}) => {
  return (
    <RespLink
      href={url}
      onClick={onPress}
      underlined={underlined}
      target={target}
      responsiveLinkStyles={responsiveLinkStyles}
    >
      {children}
    </RespLink>
  );
};
