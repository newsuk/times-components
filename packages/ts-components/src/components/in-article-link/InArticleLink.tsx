import { Link, LinkText } from './styles';
import { IconForwardChevron } from '@times-components/icons';
import React from 'react';

type InArticleLinkProps = {
  link: string;
  linkText: string;
  onClick?: (text: string) => void;
};
export const InArticleLink = ({
  link,
  linkText,
  onClick
}: InArticleLinkProps) => (
  <Link href={link} onClick={() => onClick && onClick(linkText)}>
    <LinkText>{linkText}</LinkText>
    <IconForwardChevron height={18} width={8} fillColour={null} />
  </Link>
);
