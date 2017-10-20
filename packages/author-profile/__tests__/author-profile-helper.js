/* eslint-env jest */

import "jsdom";
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
import AuthorProfileItem from "../author-profile-item";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import authorProfileFixture from "../fixtures/author-profile.json";
import articleListFixture from "../fixtures/article-list.json";

Enzyme.configure({ adapter: new React16Adapter() });

const props = {
  slug: "fiona-hamilton",
  onTwitterLinkPress: () => {},
  onArticlePress: () => {},
  analyticsStream: () => {}
};

const pagedResult = (skip, first) => ({
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: articleListFixture.data.author.articles.list
          .map(el => ({
            ...el,
            publishedTime: new Date(el.publishedTime)
          }))
          .slice(skip, skip + first)
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
    result: pagedResult(0, 3)
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
    result: pagedResult(3, 3)
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
    result: pagedResult(6, 3)
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
    result: pagedResult(9, 3)
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
    const wrapper = shallow(<AuthorProfile {...props} />)
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders profile content", () => {
    const component = renderer.create(
      withMockProvider(
        <AuthorProfile
          {...props}
          author={authorProfileFixture.data.author}
          isLoading={false}
          slug="fiona-hamilton"
          page={1}
          pageSize={10}
          onTwitterLinkPress={() => {}}
          onArticlePress={() => {}}
        />
      )
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    const p = {
      ...props,
      ...authorProfileFixture.data.author,
      articles: Array(3)
        .fill()
        .map((_, id) => ({
          id,
          loading: true
        }))
    };

    const component = renderer.create(<AuthorProfileContent {...p} />);
    expect(component).toMatchSnapshot();
  });

  it("renders profile empty", () => {
    const p = Object.assign({}, props, {
      slug: "fiona-hamilton",
      author: null,
      isLoading: false
    });

    const component = renderer.create(<AuthorProfileContent {...p} />);

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

  it("adds author profile fields to tracking context", () => {
    const reporter = jest.fn();
    renderer.create(
      withMockProvider(
        <AuthorProfile
          {...props}
          author={authorProfileFixture.data.author}
          isLoading={false}
          slug="fiona-hamilton"
          page={1}
          pageSize={10}
          onTwitterLinkPress={() => {}}
          onArticlePress={() => {}}
          analyticsStream={reporter}
        />
      )
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "AuthorProfile",
        attrs: expect.objectContaining({
          authorName: "Fiona Hamilton",
          page: 1,
          pageSize: 10
        })
      })
    );
  });

  it("renders profile separator", () => {
    const component = renderer.create(<AuthorProfileItemSeparator />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile content component", () => {
    const results = pagedResult(0, 3);
    const component = renderer.create(
      <AuthorProfileContent
        count={10}
        articles={results.data.author.articles.list}
        author={authorProfileFixture.data.author}
        slug="fiona-hamilton"
        page={1}
        pageSize={3}
        onTwitterLinkPress={() => {}}
        onArticlePress={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile content item component", () => {
    const item = pagedResult(0, 1).data.author.articles.list[0];
    const component = renderer.create(
      <AuthorProfileItem {...item} onPress={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile content item component with no image ", () => {
    const item = pagedResult(0, 1).data.author.articles.list[0];
    const component = renderer.create(
      <AuthorProfileItem {...item} imageUri={null} onPress={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  it("tracks author profile item interactions", () => {
    const item = pagedResult(0, 1).data.author.articles.list[0];
    const stream = jest.fn();
    const component = shallow(<AuthorProfileItem {...item} />, {
      context: { tracking: { analytics: stream } }
    });

    component
      .dive()
      .find("Link")
      .simulate("press");

    expect(stream).toHaveBeenCalledWith({
      component: "AuthorProfileItem",
      action: "Pressed",
      attrs: {
        articleId: "97c64f20-cb67-11e4-a202-50ac5def393a",
        articleTitle: "British trio stopped on the way to join Isis"
      }
    });
  });
};
