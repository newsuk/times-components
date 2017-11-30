const mediumBreakpoint = "768px";
const wideBreakpoint = "1024px";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

const mediumBpPositioning = `
  @media (min-width: ${mediumBreakpoint}) {
    width: ${mediumBpWidth};
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;

const wideBpPositioning = `
@media (min-width: ${wideBreakpoint}) {
  width: ${wideBpWidth};
}
`;

const articleContainerPadding = `
  padding-left: 10px;
  padding-right: 10px;
`;

const showHideToggle = (show, styles) =>
  `
  display: ${show ? "flex" : "none"};
  @media (min-width: ${wideBreakpoint}) {
    display: ${show ? "none" : "flex"};
    ${styles || ""}
  }
  `;

export default {
  mediumBreakpoint,
  wideBreakpoint,
  mediumBpWidth,
  wideBpWidth,
  mediumBpPositioning,
  wideBpPositioning,
  articleContainerPadding,
  showHideToggle
};
