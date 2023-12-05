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

export const stylePrinter = (serialize, accum, element) => {
  const mergedStyles = {
    ...(accum.rnw || {}),
    ...(accum.inlineStyles || {})
  };
  const styleBlock =
    Object.keys(mergedStyles).length > 0
      ? `<style>
${stringifyJss(mergedStyles)}
</style>

`
      : "";

  return `${styleBlock}${serialize(element)}`;
};
