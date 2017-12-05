import styled from "styled-components";

const withResponsiveStyles = (Component, styles = {}) => styled(Component)`
  @media (min-width: 520px) {
    ${styles.toSmall};
  }
  @media (min-width: 768px) {
    ${styles.toMedium};
  }
  @media (min-width: 1024px) {
    ${styles.toWide};
  }
  @media (min-width: 1320px) {
    ${styles.toHuge};
  }
`;

export default withResponsiveStyles;
