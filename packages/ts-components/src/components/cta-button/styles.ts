import styled from 'styled-components';

interface BackgroundContainerProps {
  ratio?: 'r21-9' | 'r16-9' | 'r4-3' | 'r1-1' | 'r2-3' | 'r1-2' | string;
}

export const BackgroundContainer = styled.div<BackgroundContainerProps>`
  position: relative;
  overflow: hidden;
  overflow-y: auto;

  color: blue;

  -webkit-overflow-scrolling: touch;

  padding-bottom: ${props =>
    props.ratio === 'r21-9'
      ? '42.85714%'
      : props.ratio === 'r16-9'
        ? '56.25%'
        : props.ratio === 'r4-3'
          ? '75%'
          : props.ratio === 'r1-1'
            ? '100%'
            : props.ratio === 'r2-3'
              ? '150%'
              : props.ratio === 'r1-2'
                ? '200%'
                : '75'};
  position: relative;

  iframe {
    position: absolute;
    height: 100%;
  }

  &.deactivate-ratio {
    padding: 0;
    overflow: hidden !important;

    iframe {
      position: relative;
    }
  }
`;

export const TimesEmbed = styled.div`
  border: 0px;
  width: 100%;
  height: auto;
`;

export const ctaButtonStyles = {
  width: 'fit-content',
  height: '48px',
  'font-family': 'Roboto, sans-serif',
  'font-size': '16px',
  'font-weight': '500',
  border: 'none',
  'border-radius': 0,
  'padding-inline': '16px'
};
