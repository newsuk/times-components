import config from "@times-components/article/styles/responsive-config";

export const ChildrenContainer = ({ childCount }) => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  `,
  mediumUp: () => {
    const smallStyle = `
      width: ${config.mediumBpWidth};
    `;

    const largeStyle = `
      width: 100%;
    `;

    return `
      flex-direction: row;
      margin: 0 auto;
      ${childCount === 1 ? smallStyle : largeStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount === 1 ? config.wideBpWidth : "100%"};
  `
});

export const ChildContainer = ({ isFirstChild }) => ({
  base: () => `
    padding-top: ${isFirstChild ? "0px" : "10px"};
  `,
  mediumUp: () => {
    const firstStyle = `
      flex-grow: 3;
    `;

    const childStyle = `
      flex-grow: 1;
      padding-top: 0px;
    `;

    return `
      display: flex;
      flex-basis: 0 !important;
      min-height: 100%;
      ${isFirstChild ? firstStyle : childStyle};
    `;
  }
});
