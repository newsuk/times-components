import config from "@times-components/article/styles/responsive-config";

export const ChildrenContainer = childCount => ({
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
      width: auto;
    `;

    return `
      flex-direction: row;
      margin: 0 auto;
      ${childCount === 1 ? smallStyle : largeStyle}
    `;
  },
  wideUp: () => `
    width: ${childCount === 1 ? config.wideBpWidth : "auto"};
  `
});

export const ChildContainer = () => ({
  base: () => `
    padding-top: 0;
  `,
  mediumUp: () => `
    display: flex;
    flex-basis: 0 !important;
    flex-grow: 1;
    min-height: 100%;
    padding-top: 0;
  `
});

export const ChildCurrentContainer = () => ({
  base: () => `
    padding-top: 10px;
  `,
  mediumUp: ChildContainer().mediumUp
});
