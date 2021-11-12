import styled from 'styled-components';
import { fonts } from '@times-components/styleguide';

export const Container = styled.div`
  display: flex;
  padding: 2px 6px;
  background-color: #9f0000;
`;

export const BulletContainer = styled.div`
  margin-right: 4px;
  color: #ffffff;
`;

export const ContentContainer = styled.div`
  margin-top: 5px;
  color: #ffffff;
`;

export const Title = styled.div`
  font-family: ${fonts.supporting};
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
  line-height: 16px;
`;
