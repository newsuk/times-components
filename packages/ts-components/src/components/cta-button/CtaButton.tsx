import React, { useState, useEffect } from 'react';

import { BackgroundContainer, ctaButtonStyles, TimesEmbed } from './styles';
import Button from '@times-components/button';

interface AttributesProps {
  url: string;
  target?: string;
  text: string;
}

interface RootProps {
  src: string;
  ratio?: string;
  attributes?: AttributesProps;
}

export const CtaButton: React.FC<RootProps> = props => {
  const [id, setId] = useState<string | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ratio, setRatio] = useState<string | null>(null);
  const [stateLoaded, setStateLoaded] = useState<boolean>(false);

  useEffect(
    () => {
      const decodedSrc = decodeURIComponent(props.src);
      if (decodedSrc) {
        setId(`iframe-${Math.floor(Math.random() * 99999)}`);
        setSrc(decodedSrc);
        setRatio(props.ratio || '');
        setStateLoaded(true);
      }
    },
    [props.src, props.ratio]
  );

  useEffect(
    () => {
      if (stateLoaded && src) {
        const iframeEl = document.getElementById('iframeEl');
        if (iframeEl) {
          iframeEl.classList.add('deactivate-ratio');
        }
      }
    },
    [stateLoaded, src]
  );

  const attributes = props.attributes;

  return (
    <BackgroundContainer ratio={ratio || ''} id="iframeEl">
      <div>
        {attributes && (
          <Button
            title={attributes.text}
            style={ctaButtonStyles}
            onPress={() => {
              window.open(attributes.url, attributes.target || '_blank');
            }}
          />
        )}
        {id && <TimesEmbed id={id} />}
      </div>
    </BackgroundContainer>
  );
};
