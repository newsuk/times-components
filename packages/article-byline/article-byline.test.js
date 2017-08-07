/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleByline from "./article-byline";

const singleAuthorAST = [
  {
    name: 'author',
    attributes: {
      text: 'Fiona Hamilton',
      slug: 'fiona-hamilton'
    }
  }
];

const singleAuthorAndTitleAST = [
  {
    name: 'author',
    attributes: {
      text: 'Greg Hurst',
      slug: 'greg-hurst'
    }
  },
  {
    name: 'text',
    attributes: {
      text: 'Social Affairs Correspondent',
    }
  }
];

const multipleAuthorsTitlesAndTextAST = [
  {
    name: 'author',
    attributes: {
      text: 'Greg Hurst',
      slug: 'greg-hurst'
    }
  },
  {
    name: 'text',
    attributes: {
      text: ', Social Affairs Correspondent, | ',
    }
  },
  {
    name: 'text',
    attributes: {
      text: ', Mark Bridge, Technology Correspondent | ',
    }
  },
  {
    name: 'author',
    attributes: {
      text: 'Fiona Hamilton',
      slug: 'fiona-hamilton'
    }
  },
];

const styles = {
  textTransform: 'uppercase'
}

it("renders correctly with a single author", () => {
  const tree = renderer.create(<ArticleByline ast={singleAuthorAST} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with styles", () => {
  const tree = renderer.create(<ArticleByline ast={singleAuthorAST} style={styles} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a single author and title", () => {
  const tree = renderer.create(<ArticleByline ast={multipleAuthorsTitlesAndTextAST} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with multiple authors, titles and texts", () => {
  const tree = renderer.create(<ArticleByline ast={singleAuthorAndTitleAST} />).toJSON();
  expect(tree).toMatchSnapshot();
});
