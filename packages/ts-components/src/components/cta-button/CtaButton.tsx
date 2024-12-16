import React from 'react';
import { Link } from './styles';

interface AttributesProps {
  url: string;
  target?: string;
  text: string;
}

interface RootProps {
  attributes?: AttributesProps;
}

export const CtaButton: React.FC<RootProps> = props => {
  const attributes = props.attributes;

  return attributes ? (
    <Link
      href={attributes.url}
      target={attributes.target || '_blank'}
      rel="nofollow"
    >
      {attributes.text}
    </Link>
  ) : null;
};
