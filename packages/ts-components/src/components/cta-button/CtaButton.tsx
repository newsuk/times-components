import React from 'react';
import { Link } from './styles';
import { tealiumTrackingHandler } from '../../helpers/tracking/TrackingHandler';

interface AttributesProps {
  url: string;
  target?: string;
  text: string;
  className?: string;
}

interface RootProps {
  attributes?: AttributesProps;
}

export const CtaButton: React.FC<RootProps> = ({ attributes }) => {
  if (!attributes || !attributes.text.trim() || !attributes.url.trim()) {
    return null;
  }

  return (
    <Link
      href={attributes.url}
      target={attributes.target || '_blank'}
      className={attributes.className}
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
      style={{
        display:
          attributes.className &&
          attributes.className.includes('js-cta-experiment-variation')
            ? 'none'
            : 'block'
      }}
    >
      {attributes.text}
    </Link>
  );
};
