import styled from 'styled-components';

export const RecommendedArticlesContainer = styled.div<{ isVisible?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;
