import get from "lodash.get";

const mapChildValues = markupTree =>
  markupTree.map(child => child.attributes.value).join("");

export default markupTree =>
  markupTree
    .map(
      markupObject =>
        get(markupObject, "attributes.value") ||
        mapChildValues(markupObject.children)
    )
    .join("")
    .substring(0, 200);
