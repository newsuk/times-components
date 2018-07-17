import React from "react";
import { Text, View } from "react-native";
import { renderTree, renderTrees } from "../src/markup";
import multiParagraphWithPullQuote from "../fixtures/multi-paragraph-with-pullquote";

const singleParagraph = require("../fixtures/single-paragraph.json");
const multiParagraph = require("../fixtures/multi-paragraph.json");
const bold = require("../fixtures/bold.json");
const italic = require("../fixtures/italic.json");
const span = require("../fixtures/span.json");
const lineBreak = require("../fixtures/line-break.json");
const mixture = require("../fixtures/tag-mixture.json");
const nested = require("../fixtures/nested.json");
const bio = require("../fixtures/bio.json");
const script = require("../fixtures/script.json");
const image = require("../fixtures/image.json");

export default renderComponent => {
  it("renders a single paragraph", () => {
    const output = renderComponent(renderTree(singleParagraph));

    expect(output).toMatchSnapshot("1. renders a single paragraph");
  });

  it("renders multiple paragraphs", () => {
    const output = renderComponent(<View>{renderTrees(multiParagraph)}</View>);

    expect(output).toMatchSnapshot("2. renders multiple paragraphs");
  });

  it("renders multiple paragraphs with a pull quote", () => {
    const output = renderComponent(
      <View>
        {renderTrees(
          multiParagraphWithPullQuote({ pullQuote: "Some pull quote" })
        )}
      </View>
    );

    expect(output).toMatchSnapshot(
      "3. renders multiple paragraphs with a pull quote"
    );
  });

  it("renders the bold tag", () => {
    const output = renderComponent(renderTree(bold));

    expect(output).toMatchSnapshot("4. renders the bold tag");
  });

  it("renders the italic tag", () => {
    const output = renderComponent(renderTree(italic));

    expect(output).toMatchSnapshot("5. renders the italic tag");
  });

  it("renders the span tag", () => {
    const output = renderComponent(renderTree(span));

    expect(output).toMatchSnapshot("6. renders the span tag");
  });

  it("renders the line break tag", () => {
    const output = renderComponent(renderTree(lineBreak));

    expect(output).toMatchSnapshot("7. renders the line break tag");
  });

  it("renders a mixture of tags", () => {
    const output = renderComponent(
      renderTree(mixture, {
        block(key, attributes, renderedChildren) {
          return {
            element: <View key={key}>{renderedChildren}</View>
          };
        },
        link(key, attributes, renderedChildren) {
          return {
            element: (
              <Text href={attributes.href} key={key}>
                {renderedChildren}
              </Text>
            )
          };
        }
      })
    );

    expect(output).toMatchSnapshot("8. renders a mixture of tags");
  });

  it("renders tags nested", () => {
    const output = renderComponent(
      renderTree(nested, {
        block(key, attributes, renderedChildren) {
          return {
            element: <Text key={key}>{renderedChildren}</Text>
          };
        }
      })
    );

    expect(output).toMatchSnapshot("9. renders tags nested");
  });

  it("renders wrapped tags", () => {
    const output = renderComponent(<Text>{renderTrees(bio)}</Text>);

    expect(output).toMatchSnapshot("10. renders wrapped tags");
  });

  it("renders multiple children", () => {
    const output = renderComponent(
      <Text style={{ color: "red" }}>{renderTrees(multiParagraph)}</Text>
    );

    expect(output).toMatchSnapshot("11. renders multiple children");
  });

  it("does not render a script tag", () => {
    const output = renderComponent(<View>{renderTrees(script)}</View>);

    expect(output).toMatchSnapshot("12. does not render a script tag");
  });

  it("does not render an image tag", () => {
    const output = renderComponent(<View>{renderTrees(image)}</View>);

    expect(output).toMatchSnapshot("13. does not render an image tag");
  });
};
