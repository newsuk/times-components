import insertDropcapIntoAST from "./dropcap-util-common";

export default (children, template, isDropcapDisabled) => {
  const newContent = insertDropcapIntoAST(
    children,
    template,
    isDropcapDisabled
  );
  if (
    newContent.length > 0 &&
    newContent.find(child => child.name === "dropCap")
  ) {
    // remove the wrapping paragraph
    const dropCapIndex = newContent.findIndex(
      child => child.name === "dropCap"
    );
    newContent[dropCapIndex].children = newContent[
      dropCapIndex
    ].children[0].children.slice(0, 1);
    newContent[dropCapIndex + 1].children = [
      newContent[dropCapIndex],
      ...newContent[dropCapIndex + 1].children
    ];
    newContent.splice(dropCapIndex, 1);

    return newContent;
  }
  return newContent;
};
