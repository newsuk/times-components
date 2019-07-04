import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks.web";
import shared, { renderArticle } from "./shared.base";

const omitProps = new Set([
  "article",
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  const emptyArticle = {
    __typename: "Article",
    id: "198c4b2f-ecec-4f34-be53-c89f83bc1b44",
    publicationName: "TIMES",
    publishedTime: "2015-03-13T18:54:58.000Z",
    content: []
  };

  shared(TestRenderer.create, [
    {
      name: "passes the emptyArticle to the header",
      test() {
        const Header = () => null;
        const testRenderer = TestRenderer.create(
          renderArticle(emptyArticle, Header)
        );

        const header = testRenderer.root.findByType(Header);
        expect(header.props.article).toEqual(emptyArticle);
      }
    }
  ]);
};
