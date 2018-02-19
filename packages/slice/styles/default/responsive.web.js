import config from "@times-components/article/styles/responsive-config";

export const ChildrenContainer = ({ childCount }) => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
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
      ${childCount >= 3 ? largeStyle : smallStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount >= 3 ? "100%" : config.wideBpWidth};
  `
});

export const ChildContainer = ({ isFirstChild }) => ({
  base: () => `
    padding-top: ${isFirstChild ? "0px" : "10px"};
  `,
  mediumUp: () => `
    display: flex;
    flex-basis: 0 !important;
    flex-grow: 1;
    min-height: 100%;
    padding-top: 0px;
  `
});
