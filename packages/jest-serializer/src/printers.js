export default (serialize, accum, element) => serialize(element);

export const stylePrinter = (serialize, accum, element) => {
  const mergedStyles = {
    ...(accum.rnw || {}),
    ...(accum.inlineStyles || {})
  };
  const styleBlock =
    Object.keys(mergedStyles).length > 0
      ? `<style>
${serialize(mergedStyles).replace(/Object\s{/g, "{")}
</style>

`
      : "";

  return `${styleBlock}${serialize(element)}`;
};
