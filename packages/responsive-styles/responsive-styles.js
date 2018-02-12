import styled from "styled-components";

// Turn off prettier for this as the identified changes break this component
// prettier-ignore
const withResponsiveStyles = (Component, styles = {}) => styled(Component)`
  ${styles.base}

  @media (min-width: 520px) {
    ${styles.smallUp}
  }
  @media (min-width: 768px) {
    ${styles.mediumUp}
  }
  @media (min-width: 1024px) {
    ${styles.wideUp}
  }
  @media (min-width: 1320px) {
    ${styles.hugeUp}
  }
`;

export default withResponsiveStyles;
