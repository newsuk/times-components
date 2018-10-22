/* eslint-disable react/prop-types */
/* eslint-env browser */
import React, { Fragment } from "react";
import invert from "lodash.invert";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import Context from "@times-components/context";
import LazyLoad from "@times-components/lazy-load";
import { ArticleProvider } from "@times-components/provider";
import {
  article as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { colours, scales, spacing } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import { makeArticleUrl } from "@times-components/test-utils";
import {
  ArticleConfigurator,
  makeArticleConfiguration
} from "./showcase-helper";
import Article from "./src/article";
import fullArticleFixture, {
  bylineWithLink,
  longContent,
  videoLeadAsset
} from "./fixtures/full-article";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderArticle = ({
  adConfig,
  analyticsStream,
  decorateAction,
  id,
  scale,
  sectionColour
}) => (
  // <ArticleProvider debounceTimeMs={0} id={id}>
  //   {({ article, isLoading, error, refetch }) => {
  //     console.log(article);
  //     return (
      <Context.Provider
        value={{ makeArticleUrl, theme: { scale, sectionColour } }}
      >
        <Article
          adConfig={adConfig}
          analyticsStream={analyticsStream}
          article={article}
          error={error}
          isLoading={isLoading}
          refetch={refetch}
        />
      </Context.Provider>
    // )}
  //         }
  // </ArticleProvider>
);

const mockArticle = ({
  adConfig = articleAdConfig,
  analyticsStream = storybookReporter,
  decorateAction,
  id,
  params,
  scale,
  sectionColour
}) => (
  <MockFixture
    params={params}
    render={mocks => {
      console.log(mocks);
      return (
      <MockedProvider mocks={mocks}>
        {renderArticle({
          adConfig,
          analyticsStream,
          decorateAction,
          id,
          scale,
          sectionColour
        })}
      </MockedProvider>
    )}
      }
  />
);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

const renderComponent = (config) => {
  const data = fullArticleFixture(config);
  return (
    <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
    {({ observed, registerNode }) => (
      <Article
        analyticsStream={storybookReporter}
        data={data}
        observed={observed}
        registerNode={registerNode}
      />
    )}
  </LazyLoad>
  )
}

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) => {
        // const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        // const scale = selectScales(select);
        // const sectionColour = selectSection(select);
        // const withFlags = boolean("Flags", true);
        // const withLabel = boolean("Label", true);
        // const withLeadAsset = boolean("Lead Asset", true);
        // const withLinkedByline = boolean("Linked Byline", true);
        // const withStandfirst = boolean("Standfirst", true);
        // const withVideo = boolean("Video", true);

        const scale = selectScales(select);
        const sectionColour = selectSection(select);
        const byline = boolean("Byline?", true, "TOGGLE")
        const commentsEnabled = boolean("Comments Enabled?", true, "TOGGLE")
        const headline = boolean("Headline?", true, "TOGGLE")
        const flags = boolean("Flags?", true, "TOGGLE")
        const label = boolean("Label?", true, "TOGGLE")
        const relatedArticleSlice = boolean("Related Articles?", true, "TOGGLE")
        const standfirst = boolean("Standfirst?", true, "TOGGLE")
        const topics = boolean("Topics?", true, "TOGGLE")

        const config = {
          byline: byline ? undefined : [],
          commentsEnabled: commentsEnabled ? undefined : false,
          headline: headline ? undefined : "",
          flags: flags ? undefined : [],
          label: label ? undefined : "",
          relatedArticleSlice: relatedArticleSlice ? undefined : {},
          standfirst: standfirst ? undefined : "",
          topics: topics ? undefined : [],
        };

        return renderComponent(config);

        // return (
        //   <Fragment>
        //     {link}
        //     {
        //       <ArticleConfigurator
        //         configuration={makeArticleConfiguration({
        //           withFlags,
        //           withLabel,
        //           withLeadAsset,
        //           withLinkedByline,
        //           withStandfirst,
        //           withVideo
        //         })}
        //         id={id}
        //       >
        //         {renderArticle({
        //           adConfig: articleAdConfig,
        //           analyticsStream: storybookReporter,
        //           decorateAction,
        //           id,
        //           scale,
        //           sectionColour
        //         })}
        //       </ArticleConfigurator>
        //     }
        //   </Fragment>
        // );
      },
      name: "Default",
      type: "story"
    },
    {
      component: () => (
        <Article
          adConfig={articleAdConfig}
          analyticsStream={storybookReporter}
          isLoading
          onRelatedArticlePress={() => {}}
          onTopicPress={() => {}}
        />
      ),
      name: "Loading",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
        const scale = selectScales(select);
        const sectionColour = selectSection(select);

        return mockArticle({
          decorateAction,
          id,
          params: makeParams({
            error: () => new Error("Article error"),
            variables: () => ({
              id
            })
          }),
          scale,
          sectionColour
        });
      },
      name: "Error",
      platform: "native",
      type: "story"
    }
  ],
  name: "Pages/Article"
};




// /* eslint-disable react/prop-types */
// /* eslint-env browser */
// import React, { Fragment } from "react";
// import invert from "lodash.invert";
// import Context from "@times-components/context";
// import LazyLoad from "@times-components/lazy-load";
// import { ArticleProvider } from "@times-components/provider";
// import {
//   article as makeParams,
//   fixtures,
//   MockFixture,
//   MockedProvider
// } from "@times-components/provider-test-tools";
// import { makeArticleUrl } from "@times-components/test-utils";
// import StorybookProvider from "@times-components/storybook/storybook-provider";
// import { colours, scales, spacing } from "@times-components/styleguide";
// import storybookReporter from "@times-components/tealium-utils";
// import {
//   ArticleConfigurator,
//   makeArticleConfiguration
// } from "./showcase-helper";
// import Article from "./src/article";
// import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
// import fullArticleFixture from "./fixtures/full-article";

// const preventDefaultedAction = decorateAction =>
//   decorateAction([
//     ([e, ...args]) => {
//       e.preventDefault();
//       return ["[SyntheticEvent (storybook prevented default)]", ...args];
//     }
//   ]);

// const renderArticle = ({
//   adConfig,
//   analyticsStream = storybookReporter,
//   decorateAction,
//   id,
//   scale,
//   sectionColour,
//   fixture,
// }) => {
//   console.log(fixture)
//   return (
//   <ArticleProvider debounceTimeMs={0} id={id}>
//     {({ article, isLoading, error, refetch }) => (
//       <Context.Provider
//         value={{ makeArticleUrl, theme: { scale, sectionColour } }}
//       >
//       <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
//         {({ observed, registerNode }) => (
//         <Article
//           analyticsStream={analyticsStream}
//           data={fixture}
//           observed={observed}
//           registerNode={registerNode}
//         />
//         )}
//       </LazyLoad>
//       </Context.Provider>
//   //   )}
//   // </ArticleProvider>
// )
//         };

// const mockArticle = ({
//   adConfig = articleAdConfig,
//   analyticsStream = storybookReporter,
//   decorateAction,
//   id,
//   params,
//   scale,
//   sectionColour
// }) => (
//   <MockFixture
//     params={params}
//     render={mocks => (
//       <MockedProvider mocks={mocks}>
//         {renderArticle({
//           adConfig,
//           analyticsStream,
//           decorateAction,
//           id,
//           scale,
//           sectionColour
//         })}
//       </MockedProvider>
//     )}
//   />
// );

// const selectScales = select => select("Scale", scales, scales.medium);
// const selectSection = select =>
//   select("Section", invert(colours.section), colours.section.default);

// export default {
//   children: [
//     {
//       component: ({ boolean, select }, { decorateAction }) => {
//         const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
//         const scale = selectScales(select);
//         const sectionColour = selectSection(select);
//         const withHeadline = boolean("Headline", true);
//         const withFlags = boolean("Flags", true);
//         const withLabel = boolean("Label", true);
//         const withLeadAsset = boolean("Lead Asset", true);
//         const withLinkedByline = boolean("Linked Byline", true);
//         const withStandfirst = boolean("Standfirst", true);
//         const withVideo = boolean("Video", true);

//         const link = typeof document === "object" &&
//           window !== window.top && (
//             <a
//               href={`/iframe.html${window.top.location.search}`}
//               rel="noopener noreferrer"
//               target="_blank"
//             >
//               Open in new window
//             </a>
//           );

//           const config = {
//             byline: withLinkedByline ? undefined : [],
//             headline: withHeadline ? undefined : "",
//             flags: withFlags ? undefined : [],
//             label: withLabel ? undefined : "",
//             // relatedArticleSlice: relatedArticleSlice ? undefined : {},
//             standfirst: withStandfirst ? undefined : "",
//             // topics: topics ? undefined : [],
//           };
//           return <Fragment>
//           {link}
//           {
//             renderArticle({decorateAction, scale, sectionColour,
//               fixture: fullArticleFixture(config)
//             })
//           }
//           </Fragment>

//         // return (
//         //   <Fragment>
//         //     {link}
//         //     {
//         //       <ArticleConfigurator
//         //         configuration={makeArticleConfiguration({
//         //           withFlags,
//         //           withLabel,
//         //           withLeadAsset,
//         //           withLinkedByline,
//         //           withStandfirst,
//         //           withVideo
//         //         })}
//         //         id={id}
//         //       >
//         //         {renderArticle({
//         //           adConfig: articleAdConfig,
//         //           analyticsStream: storybookReporter,
//         //           decorateAction,
//         //           id,
//         //           scale,
//         //           sectionColour
//         //         })}
//         //       </ArticleConfigurator>
//         //     }
//         //   </Fragment>
//         // );
//       },
//       name: "Default",
//       type: "story"
//     },
//     {
//       component: ({ select }, { decorateAction }) => {
//         const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
//         const scale = selectScales(select);
//         const sectionColour = selectSection(select);

//         return mockArticle({
//           decorateAction,
//           id,
//           params: makeParams({
//             chooseMedia: mediaIndex => {
//               if (mediaIndex === 0) {
//                 return {
//                   __typename: "Video"
//                 };
//               }

//               return {
//                 __typename: "Image"
//               };
//             },
//             makeArticle: a => ({
//               ...a,
//               leadAsset: fixtures.video
//             }),
//             variables: () => ({
//               id
//             })
//           }),
//           scale,
//           sectionColour
//         });
//       },
//       name: "Article with video asset",
//       type: "story"
//     },
//     {
//       component: ({ select }, { decorateAction }) => {
//         const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
//         const scale = selectScales(select);
//         const sectionColour = selectSection(select);

//         return mockArticle({
//           decorateAction,
//           id,
//           params: makeParams({
//             makeArticle: article => ({
//               ...article,
//               content: [...article.content, ...article.content]
//             }),
//             variables: () => ({
//               id
//             })
//           }),
//           scale,
//           sectionColour
//         });
//       },
//       name: "Long Article",
//       type: "story"
//     },
//     {
//       component: () => (
//         <Article
//           adConfig={articleAdConfig}
//           analyticsStream={storybookReporter}
//           isLoading
//           onRelatedArticlePress={() => {}}
//           onTopicPress={() => {}}
//         />
//       ),
//       name: "Loading",
//       type: "story"
//     },
//     {
//       component: ({ select }, { decorateAction }) => {
//         const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";
//         const scale = selectScales(select);
//         const sectionColour = selectSection(select);

//         return mockArticle({
//           decorateAction,
//           id,
//           params: makeParams({
//             error: () => new Error("Article error"),
//             variables: () => ({
//               id
//             })
//           }),
//           scale,
//           sectionColour
//         });
//       },
//       name: "Error",
//       platform: "native",
//       type: "story"
//     },
//     {
//       component: ({ select, text }, { decorateAction }) => {
//         const id = text("Article id", "");
//         const scale = selectScales(select);
//         const sectionColour = selectSection(select);

//         return (
//           <StorybookProvider>
//             {renderArticle({
//               adConfig: articleAdConfig,
//               analyticsStream: storybookReporter,
//               decorateAction,
//               id,
//               scale,
//               sectionColour
//             })}
//           </StorybookProvider>
//         );
//       },
//       name: "With Provider",
//       type: "story"
//     }
//   ],
//   name: "Pages/Article"
// };
