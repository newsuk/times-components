import styled from "styled-components";

const withResponsiveStyles = (Component, styles = {}) => styled(Component)`
  ${styles.base};

  @media (min-width: 520px) {
    ${styles.small};
  }
  @media (min-width: 768px) {
    ${styles.medium};
  }
  @media (min-width: 1024px) {
    ${styles.wide};
  }
  @media (min-width: 1320px) {
    ${styles.huge};
  }
`;

export default withResponsiveStyles;
