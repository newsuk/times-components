import React, { useRef, useState } from 'react';
import { Container, Disclaimer, TextContainer } from './styles';

interface AttributesProps {
  disclaimer_text: string;
  toggle_active_text: string;
  toggle_inactive_text: string;
  disclaimer_full_text: string;
}

interface RootProps {
  attributes: AttributesProps;
}

export const AffiliateLinkDisclaimer: React.FC<RootProps> = (props) => {
  const attributes = props.attributes;

  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const getHeight = (): string => {
    return ref.current
      ? `${ref.current.getBoundingClientRect().height}px`
      : '0px';
  };

  return (
    <Container>
      <Disclaimer>
        <p className="shortcode-disclaimer_text">
          {decodeURIComponent(attributes.disclaimer_text)}
        </p>
        <a
          className="shortcode-disclaimer__toggle"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          {open
            ? decodeURIComponent(attributes.toggle_active_text)
            : decodeURIComponent(attributes.toggle_inactive_text)}
        </a>
      </Disclaimer>

      <TextContainer style={{ height: open ? getHeight() : '0px' }}>
        <p ref={ref}>{decodeURIComponent(attributes.disclaimer_full_text)}</p>
      </TextContainer>
    </Container>
  );
};
