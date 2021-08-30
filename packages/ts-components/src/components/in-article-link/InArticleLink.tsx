import React from 'react';
import { IconForwardChevron } from '@times-components/icons';

import { Link, LinkText } from './styles';

export const InArticleLink: React.FC<{
  link: string;
  linkText: string;
  onClick?: (text: string) => void;
}> = ({ link, linkText, onClick }) => (
  <Link href={link} onClick={() => onClick && onClick(linkText)}>
    <LinkText>{linkText}</LinkText>
    <IconForwardChevron height={18} width={8} fillColour={null} />
  </Link>
);
