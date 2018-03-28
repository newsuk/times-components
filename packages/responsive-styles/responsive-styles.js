import styled from "styled-components";

export { keyframes } from "styled-components";
export const config = {
  mediumBpWidth: "84%",
  wideBpWidth: "58%"
};

// Turn off prettier for this as the identified changes break this component
// prettier-ignore
const withResponsiveStyles = (Component, styles = {}, displayName = null) => {
  const component = styled(Component) `
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
  @media (-webkit-min-device-pixel-ratio: 2) {
    ${styles.dvp}
  }
`;
  if (displayName) {
    component.displayName = displayName;
  }
  return component;
}

export default withResponsiveStyles;
