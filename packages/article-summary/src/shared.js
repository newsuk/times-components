import renderTrees from "@times-components/markup-forest";
import summarise from "./summarise";
import renderer from "./article-summary-renderer";

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

export default renderAst;
