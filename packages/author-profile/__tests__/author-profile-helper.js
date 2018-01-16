import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
import set from "lodash.set";
import cloneDeep from "lodash.clonedeep";
import {
  makeAuthor,
  makeArticleMocks
} from "@times-components/provider/fixtures/author-profile/fixture-generator";
import AuthorProfile from "../author-profile";
import AuthorProfileItem from "../author-profile-item";
import AuthorHead from "../author-profile-author-head";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import pagedResult from "./paged-result";

Enzyme.configure({ adapter: new React16Adapter() });

const authorProfileProps = {
  slug: "deborah-haynes",
  onTwitterLinkPress: () => {},
  onArticlePress: () => {},
  analyticsStream: () => {},
  refetch: () => {}
};

export default AuthorProfileContent => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
    jest.restoreAllMocks();
  });

  it("renders profile", () => {
    const pageSize = 3;
    const component = renderer.create(
      <MockedProvider mocks={makeArticleMocks({ withImages: true, pageSize })}>
        <AuthorProfile
          slug={authorProfileProps.slug}
          analyticsStream={() => {}}
          author={makeAuthor({ withImages: true })}
          isLoading={false}
          page={1}
          pageSize={pageSize}
        />
      </MockedProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    const pageSize = 3;
    const component = renderer.create(
      <MockedProvider mocks={makeArticleMocks({ withImages: true, pageSize })}>
        <AuthorProfile
          {...authorProfileProps}
          isLoading
          page={1}
          pageSize={pageSize}
        />
      </MockedProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it("renders with no author", () => {
    const pageSize = 3;
    const component = renderer.create(
      <MockedProvider mocks={makeArticleMocks({ withImages: false, pageSize })}>
        <AuthorProfile
          {...authorProfileProps}
          isLoading={false}
          page={1}
          pageSize={pageSize}
        />
      </MockedProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it("adds author profile fields to tracking context", () => {
    const reporter = jest.fn();
    const pageSize = 3;

    renderer.create(
      <MockedProvider mocks={makeArticleMocks()}>
        <AuthorProfile
          {...authorProfileProps}
          author={makeAuthor()}
          isLoading={false}
          page={1}
          pageSize={pageSize}
          analyticsStream={reporter}
        />
      </MockedProvider>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "AuthorProfile",
        attrs: expect.objectContaining({
          authorName: "Deborah Haynes",
          page: 1,
          pageSize
        })
      })
    );
  });

  it("renders profile content component", () => {
    const pageSize = 3;
    const results = pagedResult(0, pageSize);
    const component = renderer.create(
      <AuthorProfileContent
        {...makeAuthor({ withImages: true })}
        articles={results.data.author.articles.list}
        page={1}
        pageSize={pageSize}
        imageRatio={3 / 2}
        showImages
        {...authorProfileProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile content loading", () => {
    const props = {
      ...authorProfileProps,
      isLoading: true,
      showImages: true,
      articlesLoading: true,
      articles: Array(3)
        .fill()
        .map((number, id) => ({
          id,
          loading: true
        })),
      imageRatio: 3 / 2
    };

    const component = renderer.create(<AuthorProfileContent {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile content empty", () => {
    const props = {
      ...authorProfileProps,
      author: null,
      isLoading: false
    };

    const component = renderer.create(<AuthorProfileContent {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile content item component", () => {
    const item = pagedResult(0, 1).data.author.articles.list[0];
    const component = renderer.create(
      <AuthorProfileItem
        {...item}
        imageRatio={8 / 5}
        imageSize={200}
        onPress={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile content item component with a specific image size", () => {
    const item = pagedResult(0, 1).data.author.articles.list[0];
    const component = renderer.create(
      <AuthorProfileItem
        {...item}
        imageRatio={8 / 5}
        imageSize={200}
        onPress={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders profile content item component with no image", () => {
    const item = cloneDeep(pagedResult(0, 1).data.author.articles.list[0]);
    set(item, "leadAsset.crop.url", null);
    const component = renderer.create(
      <AuthorProfileItem {...item} imageRatio={20 / 3} onPress={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  it("removes profile items that fail to render", () => {
    jest.spyOn(console, "error").mockImplementation();

    const makeArticleWithSummary = (id, summary) => ({
      summary: [summary],
      id,
      leadAsset: {
        title: "Title",
        crop: {
          url:
            "//www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F1b5afe88-cb0d-11e7-9ee9-e45ae7e1cdd4.jpg?crop=4252%2C2835%2C0%2C0",
          __typename: "Crop"
        },
        __typename: "Image"
      },
      publicationName: "TIMES",
      publishedTime: new Date("2017-11-17T00:01:00.000Z"),
      headline: "Top medal for forces dog who took a bite out of the Taliban",
      url:
        "https://www.thetimes.co.uk/article/d98c257c-cb16-11e7-b529-95e3fc05f40f",
      __typename: "Article",
      page: 1,
      pageSize: 2
    });

    const p = {
      ...authorProfileProps,
      ...makeAuthor({ withImages: true }),
      showImages: true,
      articlesLoading: false,
      articles: [
        makeArticleWithSummary("d98c257c-cb16-11e7-b529-95e3fc05f40f", {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "This will error"
              },
              children: {} // Will cause exception
            }
          ]
        }),
        makeArticleWithSummary("4e6894ec-cb18-11e7-b529-95e3fc05f40f", {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "Did not error"
              },
              children: []
            }
          ]
        })
      ],
      imageRatio: 3 / 2
    };

    const component = renderer.create(<AuthorProfileContent {...p} />);
    expect(component.root.findAllByType(AuthorProfileItem)).toHaveLength(1);
  });

  it("renders profile separator", () => {
    const component = renderer.create(<AuthorProfileItemSeparator />);

    expect(component).toMatchSnapshot();
  });

  it("renders the author head", () => {
    const component = renderer.create(
      <AuthorHead {...makeAuthor()} onTwitterLinkPress={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  it("does not re-render the author head if the name changes", () => {
    const el = shallow(
      <AuthorHead {...makeAuthor()} onTwitterLinkPress={() => {}} />
    );

    el.setProps({
      name: "second name"
    });

    expect(
      el
        .dive()
        .dive()
        .find("AuthorName")
        .dive()
        .find({ testID: "author-name" })
    ).toMatchSnapshot();
  });

  it("does re-render the author head if the loading state changes", () => {
    const el = shallow(
      <AuthorHead {...makeAuthor()} onTwitterLinkPress={() => {}} />
    );

    el.setProps({
      name: "second name",
      isLoading: false
    });

    expect(
      el
        .dive()
        .dive()
        .find("AuthorName")
        .dive()
        .find({ testID: "author-name" })
    ).toMatchSnapshot();
  });

  it("tracks page view", () => {
    const stream = jest.fn();
    const pageSize = 3;
    const withImages = true;

    renderer.create(
      <MockedProvider mocks={makeArticleMocks({ pageSize, withImages })}>
        <AuthorProfile
          {...authorProfileProps}
          author={makeAuthor({ withImages })}
          isLoading={false}
          page={1}
          pageSize={pageSize}
          analyticsStream={stream}
        />
      </MockedProvider>
    );

    expect(stream).toHaveBeenCalledWith({
      object: "AuthorProfile",
      component: "Page",
      action: "Viewed",
      attrs: expect.objectContaining({
        authorName: "Deborah Haynes",
        articlesCount: 20,
        page: 1,
        pageSize
      })
    });
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
        articleId: "d98c257c-cb16-11e7-b529-95e3fc05f40f",
        articleHeadline:
          "Top medal for forces dog who took a bite out of the Taliban"
      }
    });
  });

  it("calls refetch when retrying from author error", done => {
    const wrapper = shallow(
      <AuthorProfile
        {...authorProfileProps}
        author={null}
        refetch={done}
        error={new Error("It went wrong")}
        isLoading={false}
        slug="deborah-haynes"
        page={1}
        pageSize={3}
      />
    );

    const authProfileError = wrapper.dive().dive();
    expect(authProfileError.type().name).toEqual("AuthorProfileError");

    authProfileError
      .dive()
      .dive()
      .find("Button")
      .simulate("press");
  });

  it("calls refetch when retrying from articles error", done => {
    const wrapper = shallow(
      <AuthorProfileContent
        count={0}
        articles={[]}
        author={makeAuthor()}
        slug="deborah-haynes"
        page={1}
        pageSize={3}
        imageRatio={3 / 2}
        error={new Error("Failed")}
        refetch={done}
        onTwitterLinkPress={() => {}}
        onArticlePress={() => {}}
        onViewed={() => {}}
      />
    );

    wrapper
      .dive()
      .dive()
      .find("AuthorProfileListingError")
      .dive()
      .find("Button")
      .simulate("press");
  });
};
