import React from 'react';
import { Link } from './styles';
import { tealiumTrackingHandler } from '../../helpers/tracking/TrackingHandler';

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

  if (!attributes || !attributes.text.trim() || !attributes.url.trim()) {
    return null;
  }

  return (
    <Link
      href={attributes.url}
      target={attributes.target || '_blank'}
      onClick={() =>
        tealiumTrackingHandler(
          'affiliate cta clicked',
          'navigation',
          'click',
          attributes.url,
          attributes.text.toLowerCase()
        )
      }
      rel="nofollow"
    >
      {attributes.text}
    </Link>
  );
};
