/* eslint-env jest */

import "jsdom";
import "react-native";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { addTypenameToDocument } from "apollo-client";
import { query as authorProfileQuery } from "@times-components/provider/author-profile-provider";
import { query as articleListQuery } from "@times-components/provider/article-list-provider";
import AuthorProfile from "../author-profile";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import authorProfileFixture from "../fixtures/author-profile.json";
import articleListFixture from "../fixtures/article-list.json";

Enzyme.configure({ adapter: new React16Adapter() });

const props = {
  slug: "fiona-hamilton",
  onTwitterLinkPress: () => {},
  onArticlePress: () => {}
};

const articlesList = (skip, first) => ({
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: articleListFixture.data.author.articles.list.slice(
          skip,
          skip + first
        )
      }
    }
  }
});

const mocks = [
  {
    request: {
      query: addTypenameToDocument(authorProfileQuery),
      variables: {
        slug: "fiona-hamilton"
      }
    },
    result: authorProfileFixture
  },
  {
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 0,
        imageRatio: "3:2"
      }
    },
    result: articlesList(0, 3)
  },
  {
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 3,
        imageRatio: "3:2"
      }
    },
    result: articlesList(3, 3)
  },
  {
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 6,
        imageRatio: "3:2"
      }
    },
    result: articlesList(6, 3)
  },
  {
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 9,
        imageRatio: "3:2"
      }
    },
    result: articlesList(9, 3)
  }
];

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = mockNetworkInterface(...mocks);

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const withMockProvider = child => (
  <MockedProvider mocks={mocks} client={client}>
    {child}
  </MockedProvider>
);

export default AuthorProfileContent => {
  it("renders profile", () => {
    const wrapper = shallow(<AuthorProfile {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders profile content", () => {
    const component = renderer.create(
      withMockProvider(<AuthorProfile {...props} />)
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    const p = Object.assign({}, props, {
      slug: "fiona-hamilton",
      author: null,
      isLoading: true
    });
    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile empty", () => {
    const p = Object.assign({}, props, {
      slug: "fiona-hamilton",
      author: null,
      isLoading: false
    });

    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile error", () => {
    const p = Object.assign({}, props, {
      slug: "fiona-hamilton",
      author: null,
      error: {
        error: "error"
      }
    });

    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile separator", () => {
    const component = renderer.create(<AuthorProfileItemSeparator />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile content component", () => {
    const contentProps = {
      articles: articleListFixture.data.author.articles.list.map(el => ({
        ...el,
        publishedTime: new Date(el.publishedTime)
      }))
    };

    const component = renderer.create(
      withMockProvider(
        <AuthorProfileContent
          {...contentProps}
          {...authorProfileFixture}
          slug={"fiona-hamilton"}
          page={1}
          pageSize={10}
          onTwitterLinkPress={() => {}}
          onArticlePress={() => {}}
        />
      )
    );

    expect(component).toMatchSnapshot();
  });
};
