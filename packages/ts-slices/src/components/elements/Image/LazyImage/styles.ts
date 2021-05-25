import styled from 'styled-components';

export const LazyContainer = styled.div<{
  visible: boolean;
  isRoundal: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ visible }) => (visible ? 'transparent' : '#f0f0f0')};
  border-radius: ${({ isRoundal }) => (isRoundal ? '50%' : 0)};
  transition: 0.5s;

  div,
  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ isRoundal }) => (isRoundal ? '50%' : 0)};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 0.5s;
  }
`;

export const BackgroundImage = styled.div<{ src?: string }>`
  background: ${({ src }) =>
    src ? `url(${src}) no-repeat center center` : 'none'};
  background-size: cover;
`;
