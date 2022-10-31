import styled from 'styled-components';
import { fonts } from '@times-components/ts-styleguide';

const MessageConfig = {
  info: { background: '#bedeed', foreground: '#1573a2' },
  warning: { background: '#ffeecc', foreground: '#ffa300' },
  error: { background: '#ffd6d6', foreground: '#df0000' }
};
export const Container = styled.div`
  display: flex;
  margin-top: 50px;
  &.info {
    background-color: ${MessageConfig.info.background};
    border-left: 4px solid ${MessageConfig.info.foreground};
    svg {
      fill: ${MessageConfig.info.foreground};
    }
  }

  &.warning {
    background-color: ${MessageConfig.warning.background};
    border-left: 4px solid ${MessageConfig.warning.foreground};
    svg {
      fill: ${MessageConfig.warning.foreground};
    }
  }

  &.error {
    background-color: ${MessageConfig.error.background};
    border-left: 4px solid ${MessageConfig.error.foreground};
    svg {
      fill: ${MessageConfig.error.foreground};
    }
  }
`;

export const IconContainer = styled.div`
  margin: 12px 0 45px 12px;
`;

export const ContentContainer = styled.div`
  margin: 12px;
`;

export const Title = styled.div`
  font-family: ${fonts.supporting};
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;

  margin-bottom: 6px;
`;
export const Description = styled.div`
  font-family: ${fonts.supporting};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  & a {
    color: #000000;
  }
`;
