import css from "css";

export default (serialize, accum, element) => serialize(element);

const getDeclarationsAst = rules =>
  Object.entries(rules).map(([property, value]) => ({
    property,
    type: "declaration",
    value
  }));

const getRulesAst = jss =>
  Object.entries(jss).map(([selector, rules]) => ({
    declarations: getDeclarationsAst(rules),
    selectors: [`.${selector}`],
    type: "rule"
  }));

const getStylesheetAst = jss => ({
  stylesheet: {
    rules: getRulesAst(jss)
  },
  type: "stylesheet"
});

const stringifyJss = jss => css.stringify(getStylesheetAst(jss));

const stringifyMqs = mediaQueries =>
  Object.entries(mediaQueries)
    .map(([key, mqs]) =>
      mqs
        .map(
          mq => `@media (${mq.args}) {
  .${key} {
    ${mq.rules.join("\n    ")}
  }
}`
        )
        .join("\n\n")
    )
    .join("\n\n");

export const stylePrinter = (serialize, accum, element) => {
  const { mediaQueries = {} } = accum;

  const mergedStyles = {
    ...(accum.rnw || {}),
    ...(accum.inlineStyles || {})
  };

  const styleContents = [];

  if (Object.keys(mergedStyles).length > 0) {
    styleContents.push(stringifyJss(mergedStyles));
  }

  if (Object.keys(mediaQueries).length > 0) {
    styleContents.push(stringifyMqs(mediaQueries));
  }

  const filteredStyleContents = styleContents.filter(style => !!style);

  const styleBlock = filteredStyleContents.length
    ? `<style>
${filteredStyleContents.join("\n")}
</style>
`
    : "";

  return `${styleBlock}${serialize(element)}`;
};
