import React from "react";
import get from "lodash.get";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { renderTreeAsText } from "@times-components/markup-forest";
import { appendToImageURL } from "@times-components/utils";

// Get the section for an article, preferring it not to be News
function getSectionName(article) {
  const { tiles } = article;

  if (!tiles) {
    return null;
  }

  const slices = tiles.reduce((acc, tile) => {
    acc.push(...tile.slices);
    return acc;
  }, []);
  const sections = slices.reduce((acc, slice) => {
    acc.push(...slice.sections);
    return acc;
  }, []);
  const titles = sections.map(section => section.title);

  if (titles.length === 0) {
    return null;
  }

  const nonNews = titles.filter(title => title !== "News");

  return nonNews.length ? nonNews[0] : "News";
}

function getAuthorAsText(article) {
  const { bylines } = article;
  if (!bylines) {
    return null;
  }
  const children = bylines.reduce((acc, byline) => {
    if (Array.isArray(byline.byline)) {
      acc.push(...byline.byline);
    } else {
      acc.push(byline.byline);
    }
    return acc;
  }, []);
  return renderTreeAsText({ children });
}

function getAuthors({ bylines }) {
  return bylines.map(byline => byline.author).filter(author => author);
}

function getAuthorSchema(article) {
  const { bylines } = article;
  return bylines
    ? getAuthors(article).map(({ name, jobTitle, twitter, slug }) => {
        const url = `https://thetimes.co.uk/profile/${slug}`;
        return {
          "@type": "Person",
          name,
          jobTitle,
          sameAs: twitter ? [url, `https://twitter.com/${twitter}`] : url
        };
      })
    : [];
}

const PUBLICATION_NAMES = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const get169CropUrl = asset => get(asset, "crop169.url", null);

const getVideoLeadAssetUrl = article =>
  get169CropUrl(
    get(article, "leadAsset.posterImage", get(article, "leadAsset", null))
  );

const getImageLeadAssetUrl = article =>
  get169CropUrl(get(article, "leadAsset", null));

const getArticleLeadAssetUrl = article =>
  (article.hasVideo ? getVideoLeadAssetUrl : getImageLeadAssetUrl)(article);

const getThumbnailUrlFromImage = article => {
  const tileUrl =
    article.tiles &&
    article.tiles.find(tile => get(tile.leadAsset, "crop169.url", null));

  if (tileUrl) {
    return tileUrl;
  }

  const listingAssetUrl = get(article.listingAsset, "crop169.url", null);

  if (listingAssetUrl) {
    return listingAssetUrl;
  }

  return get(article.leadAsset, "crop169.url", null);
};

const getThumbnailUrl = article => {
  const { hasVideo, leadAsset } = article;
  const thumbnailUrl = hasVideo
    ? getVideoLeadAssetUrl(article)
    : getThumbnailUrlFromImage(article);

  if (thumbnailUrl) return thumbnailUrl;

  if (!leadAsset) return null;

  const { crop32, crop1251, crop11, crop45, crop23, crop2251 } =
    leadAsset && leadAsset.posterImage ? leadAsset.posterImage : leadAsset;
  const crop = crop32 || crop1251 || crop11 || crop45 || crop23 || crop2251;

  const thumbnailsStaticData = {
    "6401d9a1-1a1b-4872-b832-bf7091e509fb":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F78688144-56e0-4ec3-9256-0a6318d59352.jpg?crop=580%2C386%2C0%2C0",
    "ff4a134f-429d-4221-908b-b9bfec8bc226":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Ff429959c-f875-421a-a308-b24111d1670d.jpg?crop=1024%2C683%2C0%2C0",
    "66712d72-4b73-4401-bf1f-4a42b93c6558":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F7b818fc8-8750-47bb-b057-fe6a9aa5f0fe.jpg?crop=1024%2C683%2C0%2C0",
    "be32055e-e08c-49e4-98c5-1e31487a39ad":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fe93bd5c6-3c74-4b86-89f1-d2ca26e52df3.jpg?crop=1024%2C683%2C0%2C0",
    "3db1d870-463f-4917-b5b9-b3cd4f48a9cb":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fc65efbde-7129-3c6d-b74d-20d0bfacca9c.jpg?crop=1023%2C575%2C0%2C0",
    "731f6660-5b42-485e-8cc2-fac1ff464daf":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F8b955164-cdd7-477f-b023-55cc429ebcaa.jpg?crop=1024%2C683%2C0%2C0",
    "362712f4-1647-4be9-a75f-437ee8929bc5":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fe1a7ee7b-4c53-4d22-90a7-9db88456c888.jpg?crop=1024%2C683%2C0%2C0",
    "e3bf685d-9a44-4922-bc6a-e557fc76a064":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F6ecd4c5d-00fd-4d69-ade5-2fb9e145221b.jpg?crop=291%2C387%2C0%2C0",
    "34ff57a7-2c8e-42a3-a378-583ee9660cda":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F4ecb9541-3073-41f6-9526-d8e85f9323a9.jpg?crop=1024%2C683%2C0%2C0",
    "87b056c8-fc50-4b7d-a78f-498c8ecc2c33":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fb6e662a5-ed8b-3731-a37e-1a05befb74fd.jpg?crop=780%2C438%2C0%2C0",
    "44fa57a2-6d36-4b8e-80c7-aca3d92ee25c":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fdae31345-67a9-399d-bdd0-80047c2394c8.jpg?crop=380%2C213%2C0%2C0",
    "47890628-0145-4d2c-9945-df68fee834e2":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F4e0e1ee2-b8a6-4d00-990f-b4f6ed7688f0.jpg?crop=1024%2C683%2C0%2C0",
    "436e86ce-e036-446d-80c7-dd1fb338c628":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Ff87de52a-4351-4ca6-a13b-561b5e059865.jpg?crop=1024%2C757%2C0%2C0",
    "bd5a4fd2-5c27-4cdf-8a01-9238b7c664b5":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fa74b260b-4965-30a9-8523-07b262888866.jpg?crop=134%2C186%2C0%2C0",
    "efeb332f-ef71-4426-a773-aa2bb4175fe0":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F870b7b97-87e8-3d47-9c0e-8daa00b3478d.jpg?crop=380%2C253%2C0%2C0",
    "2c8efadd-97f1-45f6-9314-223a2f932c7e":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F6f1131ae-17d1-4579-939f-de4546f9cac6.jpg?crop=1024%2C683%2C0%2C0",
    "5e1554e6-dd16-4ff3-862a-e4012910d402":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F0e6e340d-2f54-3eb1-8390-7f158d44b5ef.jpg?crop=380%2C213%2C0%2C0",
    "3f6eca87-bbbe-4274-a646-b59d84a7e549":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fa37835e7-7347-3144-86bd-58a2da99a99d.jpg?crop=380%2C213%2C0%2C0",
    "6383faae-24a8-4c65-bedb-ce0327e9aa75":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F58b2206e-e4c3-486e-8938-2e35123008c0.jpg?crop=1024%2C683%2C0%2C0",
    "a13e1305-3ad5-426a-8ebb-88bd55b966fe":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fbdb32e02-28d0-37ca-8acc-7dd52fd6f8e6.jpg?crop=780%2C438%2C0%2C0",
    "dacca4d7-3433-4a9c-8627-b006a77fe260":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F87c5a718-41c8-498b-8bdb-b08a47e9607f.jpg?crop=1024%2C683%2C0%2C0",
    "9e41a5ba-47d4-471d-9896-34be283628a4":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F56de10b1-f5b2-496e-a832-009ce852785b.jpg?crop=1024%2C683%2C0%2C0",
    "e2344178-ee7e-4aa7-9beb-d312697b7a37":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F9f2d3116-bad6-43ba-8d51-f70bd85344c4.jpg?crop=1024%2C683%2C0%2C0",
    "44f4de5d-54f2-4142-8761-d830f7a83872":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F53e07cbb-b623-42d9-9cd1-df1780e39058.jpg?crop=1024%2C683%2C0%2C0",
    "ac1d234d-57f4-4748-9691-ef0770d9b53b":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F6ef7886c-a40c-40a4-927c-e2b9dd066f42.jpg?crop=1024%2C683%2C0%2C0",
    "b2bb7152-1dd4-46cc-99dc-032d63b90725":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F8b4b2b29-b479-3975-94cb-d86a94ecbe2c.jpg?crop=780%2C438%2C0%2C0",
    "2eaf28bb-7acc-4431-abe5-e1e22b1e6864":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F9b5ab0b2-d147-33ae-b656-11d5cb6ba612.jpg?crop=380%2C213%2C0%2C0",
    "33081ae9-8b8c-4d13-bad2-eff5acf436e3":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F0af02db4-d5ef-3e98-837c-4633ff2a8857.jpg?crop=130%2C73%2C0%2C0",
    "5936cb6a-759e-444e-bf8c-2876d58bd9a3":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F85f16276-8a4e-3a69-ab89-56a4d641ef04.jpg?crop=1010%2C683%2C0%2C0",
    "3cb75321-14d5-4d7f-805a-aebe8b953231":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F870bfacc-9be1-39e1-8cd5-322c0b0335a1.jpg?crop=1023%2C576%2C0%2C0",
    "c57aeb0d-3ee1-46fd-9c83-22b2f45a9757":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F75a3b7fa-49d3-4f38-8ec0-0faf12603de0.jpg?crop=1024%2C683%2C0%2C0",
    "a25658ad-1cca-4b77-9b52-4b0efdc3c854":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F1e3b32a3-be45-4301-b337-f8eb7489ce99.jpg?crop=1024%2C683%2C0%2C0",
    "61459fd3-b6ba-4fce-89d8-1b45439968c2":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F9689c58e-f809-41b8-bd32-8cf253450a74.jpg?crop=1024%2C683%2C0%2C0",
    "c32115af-12f3-4148-8bd3-f893172d05dd":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fe07cb2d9-8019-4032-907c-4852557cc4f8.jpg?crop=1024%2C683%2C0%2C0",
    "34376533-c1d7-4eca-b5e2-3212feebab7b":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F6e1d2f21-f08e-3818-82e5-74f4edbafcca.jpg?crop=1024%2C501%2C0%2C0",
    "a46fba2e-910a-4f34-abbd-47f3aae3305a":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F33017cc1-7968-3975-b6d9-a861393a8b48.jpg?crop=875%2C492%2C0%2C0",
    "f89a2c66-818f-4ecf-a651-ec2b1561ab94":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F953cad45-5398-312d-aaad-0b024be6e6b7.jpg?crop=780%2C438%2C0%2C0",
    "c111a064-a822-4807-9816-b9e6d37f4303":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F947f9ff2-9971-3d64-a418-1c85a2de5dcc.jpg?crop=380%2C212%2C0%2C0",
    "06ba1b0f-2044-4e04-a26b-a80aafc74111":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F5c7df34c-bd47-427f-a6f5-9234d3e11c33.jpg?crop=1024%2C683%2C0%2C0",
    "5efdd936-fe7a-4b5c-afc3-58294d31877e":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F3344295a-b135-34c9-ade6-bd2b794c2304.jpg?crop=1024%2C575%2C0%2C0",
    "37b90795-bdeb-4ecf-a7e7-35c695363d87":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F08594194-90dc-3b82-9365-e82bb2dd0cdc.jpg?crop=780%2C438%2C0%2C0",
    "639ceb0c-698a-444c-904f-5256d2a68388":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F01648790-ac13-4ac9-a13e-df3d7055d2f7.jpg?crop=1024%2C683%2C0%2C0",
    "1cca9461-7aaa-4fe6-9500-a7a099a78186":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fe58c914f-10c7-4f17-a1d2-4c098680f4c2.jpg?crop=1024%2C683%2C0%2C0",
    "42d4d370-6f0c-4f14-8737-5706fa84843f":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F15f82cbf-7403-4243-abd0-ee8a4c754a62.jpg?crop=1024%2C683%2C0%2C0",
    "bfc65ae3-4e7c-438f-b2b0-4cee4260fd50":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fcb324be1-1ac0-4baf-9266-f65f6c3db90f.jpg?crop=1024%2C683%2C0%2C0",
    "fce0b13b-bb5a-4cc5-aefc-c478e6b5c027":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Ffd5eb07f-06dd-3772-b9c0-75e0de6b9b10.jpg?crop=620%2C413%2C0%2C0",
    "30cc1efb-6711-44d2-8177-593995f264ae":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fc0366f5b-e5dd-3947-8d6b-cd71106ff46c.jpg?crop=780%2C439%2C0%2C0",
    "2ac5721b-cab7-4b0b-a07b-b0c501ca0a45":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F66725800-09fb-4ab9-86ad-17df8fe2aa54.jpg?crop=1024%2C683%2C0%2C0",
    "046a3f59-5f20-418f-a396-e04a7e07ae5b":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fd5446702-ebe4-41de-bb5d-1dd89a355c51.jpg?crop=1024%2C683%2C0%2C0",
    "2ea3cc2b-e726-4f75-bfd6-73c08342d4f4":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F627c3516-6680-423a-b85c-f3e51bf7c0ec.jpg?crop=1024%2C683%2C0%2C0",
    "2eb0f74b-4574-454e-8920-feb3a8670597":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2Fbf2c19b5-0df2-401a-8ca0-171c0f3ce6d0.jpg?crop=1024%2C683%2C0%2C0",
    "619f3044-89aa-4a20-a141-1a46bd47265d":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F17f18119-914d-429e-b15d-15d2de4fa116.jpg?crop=1024%2C683%2C0%2C0",
    "5556fb5e-c94f-4e9b-b989-ff92901b5bcc":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprodmigration%2Fweb%2Fbin%2F77ec392c-7417-49d6-b862-1a138ee9fa3e.jpg?crop=1024%2C683%2C0%2C0",
    "396842f6-985d-4f88-8125-d82e97c40874":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F09758053-f429-3860-96c3-c78ab7766e5b.jpg?crop=780%2C438%2C0%2C0",
    "d4379d20-71e3-4d81-bbe1-0313fab680db":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F5b7391ad-674a-3d1c-adf0-69956c54a823.jpg?crop=780%2C439%2C0%2C0",
    "ecab8e78-359d-4765-b5db-db3b9c6821a7":
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2Fd9f4f92c-0488-3575-91ac-614e9676b86b.jpg?crop=780%2C438%2C0%2C0"
  };
  return crop ? crop.url : thumbnailsStaticData[article.id];
};

function Head({ article, logoUrl, paidContentClassName }) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline,
    publishedTime,
    updatedTime,
    hasVideo,
    seoDescription,
    url
  } = article;

  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    seoDescription ||
    (Array.isArray(descriptionMarkup) && descriptionMarkup.length
      ? renderTreeAsText({ children: descriptionMarkup })
      : null);
  const sectionname = getSectionName(article);
  const leadassetUrl =
    appendToImageURL(getArticleLeadAssetUrl(article), "resize", 685) ||
    getThumbnailUrl(article);
  const authors = getAuthorSchema(article);
  const caption = get(leadAsset, "caption", null);
  const title = headline || shortHeadline || "";
  const datePublished = new Date(publishedTime).toISOString();
  const dateModified = updatedTime || datePublished;
  const thumbnailUrl = getThumbnailUrl(article);

  const jsonLD = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    headline: title,
    publisher: {
      "@type": "Organization",
      name: publication,
      logo: {
        "@type": "ImageObject",
        url: logoUrl
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage"
    },
    dateCreated: publishedTime,
    datePublished,
    isAccessibleForFree: false,
    hasPart: {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: `.${paidContentClassName}`
    },
    image: {
      "@type": "ImageObject",
      url: leadassetUrl,
      caption
    },
    thumbnailUrl,
    dateModified
  };

  if (authors && authors.length) {
    Object.assign(jsonLD, { author: authors });
  }

  const videoJsonLD = hasVideo
    ? {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        name: leadAsset.title || title,
        uploadDate: dateModified,
        thumbnailUrl,
        description:
          Array.isArray(descriptionMarkup) && descriptionMarkup.length
            ? renderTreeAsText({ children: descriptionMarkup })
            : null,
        contentUrl: url
      }
    : null;

  return (
    <Context.Consumer>
      {({ makeArticleUrl }) => {
        jsonLD.mainEntityOfPage["@id"] = makeArticleUrl(article);
        return (
          <Helmet encodeSpecialCharacters={false}>
            <title>
              {title} | {sectionname ? `${sectionname} | ` : ""}
              {publication}
            </title>
            <meta content={title} name="article:title" />
            <meta content={publication} name="article:publication" />
            {desc && <meta content={desc} name="description" />}
            {authorName && <meta content={authorName} name="author" />}

            <meta content={title} property="og:title" />
            <meta content="article" property="og:type" />
            <meta content={makeArticleUrl(article)} property="og:url" />
            {desc && <meta content={desc} property="og:description" />}
            {leadassetUrl && (
              <meta content={leadassetUrl} property="og:image" />
            )}

            <meta content={title} name="twitter:title" />
            <meta content="summary_large_image" name="twitter:card" />
            <meta content={makeArticleUrl(article)} name="twitter:url" />
            {desc && <meta content={desc} name="twitter:description" />}
            {leadassetUrl && (
              <meta content={leadassetUrl} name="twitter:image" />
            )}
            <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
            {videoJsonLD && (
              <script type="application/ld+json">
                {JSON.stringify(videoJsonLD)}
              </script>
            )}
          </Helmet>
        );
      }}
    </Context.Consumer>
  );
}

Head.propTypes = {
  article: PropTypes.shape({
    bylines: PropTypes.array,
    descriptionMarkup: PropTypes.array,
    headline: PropTypes.string,
    id: PropTypes.string.isRequired,
    leadAsset: PropTypes.object,
    publicationName: PropTypes.string.isRequired,
    shortHeadline: PropTypes.string,
    shortIdentifier: PropTypes.string.isRequired,
    tiles: PropTypes.array
  }).isRequired,
  logoUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string.isRequired
};

export default Head;
