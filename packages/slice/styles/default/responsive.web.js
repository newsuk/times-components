import config from "@times-components/article/styles/responsive-config";

export const ChildrenContainerStyles = childCount => ({
  base: () => `
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `,
  mediumUp: () => {
    const smallStyle = `
      padding-left: 0;
      padding-right: 0;
      width: ${config.mediumBpWidth};
    `;

    const largeStyle = `
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
    `;

    return `
      flex-direction: row;
      margin: 0 auto;
      ${childCount === 3 ? largeStyle : smallStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount === 3 ? "100%" : config.wideBpWidth};
  `
});

export default ChildrenContainerStyles;
