import insertDropcapIntoAST from "./dropcap-util-common";

export default (template, isDropcapDisabled) => children => {
  const newContent = insertDropcapIntoAST(
    children,
    template,
    isDropcapDisabled
  );
  const dropCapChild =
    newContent.length > 0 && newContent.find(child => child.name === "dropCap");

  if (dropCapChild) {
    // remove the wrapping paragraph
    const dropCapIndex = newContent.indexOf(dropCapChild);
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
