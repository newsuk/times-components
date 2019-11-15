import React from "react";
import TestRenderer from "react-test-renderer";

import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";

import Head from "../../src/head.web";
import articleFixture, {
  testFixture,
  videoLeadAsset
} from "../../fixtures/full-article";

jest.mock("react-helmet-async", () => ({ Helmet: "Helmet" }));

const omitProps = new Set([
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

const article = articleFixture({ ...testFixture });
const videoArticle = articleFixture({
  ...testFixture,
  hasVideo: true,
  leadAsset: videoLeadAsset()
});

const paidContentClassName = "class-name";
const logoUrl =
  "https://www.thetimes.co.uk/d/img/dual-masthead-placeholder-16x9-6a9822c61a.png";

describe("Head", () => {
  it("outputs correct metadata", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={article}
        logoUrl={logoUrl}
        paidContentClassName={paidContentClassName}
      />
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("outputs correct metadata for a video article", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={videoArticle}
        logoUrl={logoUrl}
        paidContentClassName={paidContentClassName}
      />
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("uses short headline if headline not available", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          headline: null,
          shortHeadline: "short headline"
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("defaults to an empty string if both headline and shortHeadline are null", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          headline: null,
          shortHeadline: null
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("uses the first non-news section in title", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          tiles: [
            {
              slices: [
                {
                  sections: [
                    {
                      title: "News"
                    }
                  ]
                }
              ]
            },
            {
              slices: [
                {
                  sections: [
                    {
                      title: "Comment"
                    }
                  ]
                }
              ]
            },
            {
              slices: [
                {
                  sections: [
                    {
                      title: "Foreign"
                    }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("uses news in title if news is the only available section", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          tiles: [
            {
              slices: [
                {
                  sections: [
                    {
                      title: "News"
                    }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("uses news in title if news is the only available section", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          tiles: [
            {
              slices: [
                {
                  sections: [
                    {
                      title: "News"
                    }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("removes section from title if there are no tiles", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          tiles: null
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("removes section from title if there are no tiles with sections", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          tiles: [
            {
              slices: [
                {
                  sections: []
                }
              ]
            },
            {
              slices: [
                {
                  sections: []
                }
              ]
            }
          ]
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("shows Sunday Times in title if publication is SUNDAYTIMES", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          publicationName: "SUNDAYTIMES"
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("shows Times in title if publication is TIMES", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          publicationName: "TIMES"
        }}
      />
    );

    const title = testRenderer.root.findByType("title");

    expect(title.children).toMatchSnapshot();
  });

  it("removes author tags if bylines not available", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          bylines: null
        }}
      />
    );

    expect(testRenderer.root.findAllByProps({ name: "author" })).toHaveLength(
      0
    );
  });

  it("shows author tags if bylines available", () => {
    const testRenderer = TestRenderer.create(<Head article={article} />);

    expect(testRenderer.root.findAllByProps({ name: "author" })).toHaveLength(
      1
    );
  });

  it("removes description tags if descriptionMarkup not available", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          descriptionMarkup: null
        }}
      />
    );

    expect(
      testRenderer.root.findAllByProps({ name: "description" })
    ).toHaveLength(0);
    expect(
      testRenderer.root.findAllByProps({ property: "og:description" })
    ).toHaveLength(0);
    expect(
      testRenderer.root.findAllByProps({ name: "twitter:description" })
    ).toHaveLength(0);
  });

  it("removes description tags if descriptionMarkup is empty", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          descriptionMarkup: []
        }}
      />
    );

    expect(
      testRenderer.root.findAllByProps({ name: "description" })
    ).toHaveLength(0);
    expect(
      testRenderer.root.findAllByProps({ property: "og:description" })
    ).toHaveLength(0);
    expect(
      testRenderer.root.findAllByProps({ name: "twitter:description" })
    ).toHaveLength(0);
  });

  it("shows description tags if descriptionMarkup available", () => {
    const testRenderer = TestRenderer.create(<Head article={article} />);

    expect(
      testRenderer.root.findAllByProps({ name: "description" })
    ).toHaveLength(1);
    expect(
      testRenderer.root.findAllByProps({ property: "og:description" })
    ).toHaveLength(1);
    expect(
      testRenderer.root.findAllByProps({ name: "twitter:description" })
    ).toHaveLength(1);
  });

  it("removes image tags if leadAsset not available", () => {
    const testRenderer = TestRenderer.create(
      <Head
        article={{
          ...article,
          leadAsset: null
        }}
      />
    );

    expect(
      testRenderer.root.findAllByProps({ property: "og:image" })
    ).toHaveLength(0);
    expect(
      testRenderer.root.findAllByProps({ name: "twitter:image" })
    ).toHaveLength(0);
  });

  it("shows image tags if leadAsset available", () => {
    const testRenderer = TestRenderer.create(<Head article={article} />);

    expect(
      testRenderer.root.findAllByProps({ property: "og:image" })
    ).toHaveLength(1);
    expect(
      testRenderer.root.findAllByProps({ name: "twitter:image" })
    ).toHaveLength(1);
  });
});
