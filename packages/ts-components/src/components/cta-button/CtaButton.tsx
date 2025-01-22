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

  return attributes ? (
    <Link
      href={attributes.url}
      target={attributes.target || '_blank'}
      onClick={() =>
        tealiumTrackingHandler(
          attributes.text.toLowerCase(),
          'navigation',
          'click'
        )
      }
      rel="nofollow"
    >
      {attributes.text}
    </Link>
  ) : null;
};
