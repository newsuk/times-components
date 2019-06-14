import insertDropcapIntoAST from "./dropcap-util-common";

export default (children, template, isDropcapDisabled) => {
  const newContent = insertDropcapIntoAST(
    children,
    template,
    isDropcapDisabled
  );
  if (newContent.length > 0 && newContent[0].name === "dropCap") {
    // remove the wrapping paragraph
    newContent[0].children = newContent[0].children[0].children;
    newContent[1].children = [newContent[0], ...newContent[1].children];
    return newContent.slice(1);
  }
  return newContent;
};
