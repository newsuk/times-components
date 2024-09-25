/* eslint-disable */

import React from "react";
import styled from "styled-components";
import PuzzleIcon from "./puzzle-icon";
import VideoIcon from "./video-icon";

const SlideUpWrapper = styled.div`
  overflow: auto;

  scroll-behavior: auto;
  opacity: 1;
  pointer-events: "auto";
  position: fixed;
  bottom: ${props =>
    props.showComponent ? "0" : "-100%"}; /* Change based on isVisible prop */
  left: 0;
  right: 0;
  color: white;
  background-color: white;
  padding-top: 12px;
  padding-bottom: 24px;
  text-align: center;
  z-index: 1000;
  border-top: 1px solid #696969;
  transition: bottom 1s ease-in; /* Smooth transition */
  flex-direction: row;
  display: flex;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.a`
  font-family: TimesModern-Regular, TimesModern-Regular-fallback, serif;
  font-size: 20px;
  color: #01000d;
  font-weight: 400;
  text-align: left;
  padding-left: 16px;
  text-decoration: none;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.span`
  font-family: Roboto-Regular, Roboto-Regular-fallback, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.color ? props.color : "#696969")};
  line-height: 21px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${props => (props.square ? 0 : "50%")};
`;

const MagicCarpetCardWrapper = styled.div`
  min-width: 336px;
  height: 74px;
`;

const MagicCarpetCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 16px;
`;

const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;
const LabelDivider = styled.hr`
  width: 1px;
  height: 12px;
  margin-left: 6px;
  margin-right: 6px;
  color: #e4e4e4;
`;

const CardDivider = styled.hr`
  width: 1px;
  height: 74px;
  color: #e4e4e4;
`;

const LinkButton = styled.a`
  font-family: Roboto-Regular, Roboto-Regular-fallback, serif;
  font-size: 14px;
  width: 92px;
  margin: 20px;
  color: #333333;
  background-color: #ffffff;
  border: 1px solid #333333;
  min-width: 92px;
  height: 32px;
  text-decoration: none;
  font-weight: 500;
  padding: 6px;
  margin-top: 28px;
`;

const lightPackContent = [
  {
    title: "Amazon demands workers return to office 5 days a week",
    titleLink:
      "/business-money/technology/article/amazon-demands-workers-return-to-office-five-days-a-week-hh6l5pq0w",
    image:
      "https://s3-alpha-sig.figma.com/img/c009/82bd/af646845df2c8cc9189432a48dc3d425?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mexn3iVODCMOJU4rxN0nH-O4hTv~z-wYIH9O6MvoatKfyinlc5ZPJ1njMNthtBjJNijeBSUswUMXV~dFdD66XQFwodhgGMR4aY67Bcu5zocLxKUQbVokxjLYLlftURwFj5Mf4PG63udmEWHP83NULmZuPxJhvF1kl-WIoKx45Wi3C438jVaLZCumUMy09wZplhv5qhsY~WtCA8AAq~6QXd90Pc2CY96jsNVlVnECftQgKztQqQljtKvBrEtGj5CQVYfpA165kGT1ZtPVaBHnvji8JWjS7aKt1xFNES9gTxmmvKNVSWzLszJgK21IHf0MH-Jy3ExiV2PguJ0QMMl5JA__",
    labels: ["READ MORE", "TECHNOLOGY"],
    labelColor: "#00787C"
  },
  {
    title: "Russell Brand questioned by police over alleged sex offences",
    titleLink:
      "/uk/article/russell-brand-questioned-again-by-police-over-sex-offences-n25zrt2h5",
    image:
      "https://s3-alpha-sig.figma.com/img/b4ef/e9de/7abde253d28d58ae0e09a478d949ddc8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PRmePt6-aC-3JtnY8AOCyjNJooEBeRST5dhIcu6tJbKAZoPCibObuiwQTsuOVlUzyB5zLfi1kVS-HM9oRzkVnLaB~gxi9WY1fejaW~OTT4OvAUK-mJv3112IUHh4YKVgm9BjuWDw8AhooPIv~XTiXnMXDLfhNygnNHJ3eMxRKKSsTg3PK3FXfez7Ec1VZLy8KMcZJX-bfi2hwZvsXv3YqckNbc3YT7R8pAmFm2~CuUXAyFf4CKzBKjfrvdp4iaRY231ywyZmLrJwt16YlWD9hfNHFhmEEgdhBKLPwrexmkP4Yf5EqQ4~XqlEr4~g8f4bdJOXKUWqDIUKOGw056SLng__",
    labels: ["EXCLUSIVES", "UK"],
    labelColor: "#FF5656"
  },
  {
    title: "Can an AI bot convince you that it's sentient?",
    titleLink: "/podcasts/the-story",
    image:
      "https://s3-alpha-sig.figma.com/img/896b/2015/526edfda9f8412647fe7da0a478c8dc8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ps~VWrg97448xoU0uoVlWPRwhd6wjC8G6WKr2eYhQ13BxTZB15rAgdTM18S2BSxQsZTpZtquTPakFpx7biHVI10bdnB7tpQvxWb1RlZ1bEUaSXSuIh2jtqOtEN-r2geudnCxq44xoI1Lqr9NMi8yiVb1zLCKixQqM-s9s9eOokkCzNsbT4hKAaxFPGiX1dptCaXigHL939-2QaGhxIsuC90WHnVCy4BAH2ZWOpRxHlv1LmQMoTMWem91e6m71e2Tl7FZNolsKUbh6IRE9d6v0jVc3OPOx3X996TbDleozwcaUZ7861UESVMpOCB9~obn7xsL~UmsoGQv7Rjk1TK2kw__",
    labels: ["PODCAST", "THE STORY"],
    icon: true,
    labelColor: "#54145D"
  },
  {
    title: "Snap bets on AR glasses, but is it seeing clearly?",
    titleLink:
      "/business-money/technology/article/snap-bets-on-augmented-reality-glasses-but-is-it-seeing-clearly-5h65jls6n",
    image:
      "https://s3-alpha-sig.figma.com/img/8952/585a/befd8b8a543efa63cddb784bf21ba08d?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SS3jO6c28xLXzJgI4XDPreKKGD4hkUGFwwOUlXs5Pt5u4~W3Ky~zSbH0MeOQGOEgMDV58MufCEkNpglYweiUPE8Ag8~VzOEm5sybVQJ--zhhMXnxMgVx26z6FZXmKjZfyEeUyqi7cdIqWndEsOEnPLWIThHlEDueeb~1UaEwrb2pJMnkzp6Ldl3eMoiIli1ccPoWh3lolUktPl91lP5u14EEJFuHMngZEQ1cHcfQ9AOvqq537DJ02l9UhKMmVMzrVT5JalkgnzZCsywx6iGUCIfJMSh3pyfwbffhx85mHR3Xpe9qhES-EfMfvyAGaC6HACngRDoEtVicb~xYucK4~g__",
    icon: true,
    labels: ["VIDEO", "TECHNOLOGY"],
    labelColor: "#005C8A"
  },
  {
    title: "Times General Knowledge No 12345",
    titleLink: "/puzzles/crossword/times-gk-crossword-no-252-n0n70whpb",
    image:
      "https://s3-alpha-sig.figma.com/img/24f9/bc87/903eed2895cf7ef34c3bd86cdb19ee74?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKEomwG~hc7W-ITYVzz8vKI7cKX4bkZ0xv1Ll-SW9mfR621lZvjzGwFO6F5hFrPo37GTok3RUi5G6JdS4jTXwxPPIOMYfPJzwgImrbY2eKElIBD-vSPBDK9U5OXc6dmN3600vGHDvEclr8Ar0FO8ZmXwKhnUa-hM2i2~~UOCHSHorTryt-iOn28pUC4~sqXhRSdz-5FH07IoVekjFmXYhX-mz8FCHgPvE~SrhlTmemubmMvU-FttZjY~rcyr7p9IkLWyXQ3jenq8UFRiiZ9buR0LQ6MpP85ocGQ4MCRnj2uCPVEtMU6wde34oI-GpvEa-B5Cf8zVR7GtF1ZfW5gsAw__",
    labels: ["PLAY", "PUZZLES"],
    icon: true,
    labelColor: "#DF7334"
  }
];

const notLightPackContent = [
  {
    title: "'Change has begun': Starmer gives first conference speech'",
    titleLink:
      "/uk/politics/article/labour-party-conference-keir-starmer-speech-latest-news-0nnkxjcqq",
    image:
      "https://s3-alpha-sig.figma.com/img/dd68/3e09/181fd13a92c1ab3e6319601ba403e6a9?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OPybSiJqmJXr5pl6BAwdtIZqpBWdVVJxKv-woB4y3EieTJKxfvNMOOyjO5C6u2ZEy0eA9F8iRtAenGLBGbUIBZt322hVscJDtODxjsNc3wP2wNne7khqGCroAJkgpuVQUbP4HvXqKJ-VV8-28KjIkN~YDVxsK0JUU8KuZMgfweWwv0g8auVUXEr1eU9AvaEgR-TMxJ52sNsyC9eE9Kj47V6yfZZ7KUHcUPxtvjjsIxySgJJvfY0FKsECPp5X1y6ym5DxFoknvG~HzfsUXDcuOUvauSIrKlz~S4yhBSCJBkEi0mBN56LPf5i9IlaBRqPmSt1mXPGwYoeEtsnn1e14WA__",
    labels: ["HAVE YOUR SAY", "89 RECENTLY COMMENTED"],
    labelColor: "#FF5656"
  },
  {
    title: "Rodri could miss rest of season with knee injury",
    titleLink:
      "/sport/football/article/rodri-knee-injury-man-city-arsenal-x08qk7pdb",
    image:
      "https://s3-alpha-sig.figma.com/img/b168/4d1b/b9361aacf8aa15439db267471ccf52ae?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djhM7Ifd4NH-iGmZb5IYPjRG5xrNSOCCXybgwEcfLWNTa5itFXwv715Oe8~-QYy5fenMRts0Oce6GlQ8rOhSqVhR2h1HAmJZZ8VxDL9zSWxZ~IejyHGNj0Q7LXqsxL8vfs7rypyZ94pN48bqIVvNPKi~6qf9~-qbAHx0CJJtCsQXE8102~de5dVTAn-WUIhzqY50UCaImG9IvTcX~tQxJE3aI7dYLvPa~iPpd5OxGrRaBaoQeHe-kXknkb-BpXtJ3AQvhdJXRdGSTRexyDR2eh7NQT6FJPywUz2uxYzikSzFuYYlBg2Ul2K40eQtsOBacuT0mtlwu0x0eWO5iLL~Tg__",
    labels: ["READ MORE", "SPORT"],
    labelColor: "#007A3F"
  },
  {
    title: "Evening Briefing Thursday 26th September",
    titleLink: "/podcasts/times-news-briefing",
    image:
      "https://s3-alpha-sig.figma.com/img/8505/83db/efe4ca6f159524c5e9605c09e22beb63?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HNYdABcDQqUiXIfetUZ9OA2Lh5IZ82h6NT4eNrR0mgrj1vk0TFNkd5pbMEAgfjBNwCQPT9kQIoifJ3HE6qjb4D69RgSr~R0Y3uMhuju4jBbmgMIXsE0C1-QjJcSXtj427ttm4ObVlhHlsWRb2lFcO2mlmnRqstmCaCRGqD-oAtUXZYQCXA45Cu27c7ezqBkaMID5VeShG4Psk-JmSXmtMSiPjYwFKlEKktniFs8fnwjdyFlHWxVPt6F~JXUemvDvVFavY9XBYRKdhOd4SkoVhKLe3kvenIFX6~yDqERGaIt1Vh5jAKBnoDxvCXWn~kjIjLKFwOzqYpFmYaeqFFQfjg__",
    labels: ["PODCAST", "TIMES NEWS BRIEFING"],
    icon: true,
    labelColor: "#54145D"
  },
  {
    title: "Trump used assassination attempt to his advantage",
    titleLink:
      "/world/us-world/article/donald-trump-used-assassination-attempts-advantage-us-election-2024-g9mz5wf8r",
    image:
      "https://s3-alpha-sig.figma.com/img/cdcb/7283/3ad7a0c137457614d3d1a693452964e1?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g5MwasiSQlq1ZyOFr-uaC9NvL3hb1Ui3gkHd7-izDGz7zBgTSHN3~pPpEcBSwBEbzp8-dTXfITS7M4XlM5jPy3GzA7N333yrbkwqWCX~xZkHLXYjnBlwQ59ukqOaRLyWZh1vSMqQTshRPnSso07sHXh37HIWuILsM1AKs9-NgDdNaQeyZgw--70gTFHJEUQ8iQdO00BqzcvRir0SAJXC4oYSRsT6X~qLNzRucIBLfHViEEcKruSWqhv~YPkym7DgeZCYQ9kBuSWb6NxSrNtzC-FNzzIzVAjcsFrUarEEzFgZywRC3n96sBTgHG6HYdJVVpqSIhrgDhD16Y~9ri4-3Q__",
    icon: true,
    labels: ["VIDEO", "US"],
    labelColor: "#005C8A"
  },
  {
    title: "Times General Knowledge No 12345",
    titleLink: "/puzzles/crossword/times-gk-crossword-no-252-n0n70whpb",
    image:
      "https://s3-alpha-sig.figma.com/img/24f9/bc87/903eed2895cf7ef34c3bd86cdb19ee74?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKEomwG~hc7W-ITYVzz8vKI7cKX4bkZ0xv1Ll-SW9mfR621lZvjzGwFO6F5hFrPo37GTok3RUi5G6JdS4jTXwxPPIOMYfPJzwgImrbY2eKElIBD-vSPBDK9U5OXc6dmN3600vGHDvEclr8Ar0FO8ZmXwKhnUa-hM2i2~~UOCHSHorTryt-iOn28pUC4~sqXhRSdz-5FH07IoVekjFmXYhX-mz8FCHgPvE~SrhlTmemubmMvU-FttZjY~rcyr7p9IkLWyXQ3jenq8UFRiiZ9buR0LQ6MpP85ocGQ4MCRnj2uCPVEtMU6wde34oI-GpvEa-B5Cf8zVR7GtF1ZfW5gsAw__",
    labels: ["PLAY", "PUZZLES"],
    icon: true,
    labelColor: "#DF7334"
  }
];

const getIcon = (label, color) => {
  if (label === "VIDEO") {
    return <VideoIcon style={{ marginRight: "4px" }} color={color} />;
  } else if (label === "PODCAST") {
    return <VideoIcon style={{ marginRight: "4px" }} color={color} />;
  } else {
    return <PuzzleIcon style={{ marginRight: "4px" }} color={color} />;
  }
};

export const MagicCarpet = ({ showComponent }) => {
  const getContent = () => {
    let content = notLightPackContent;
    if (typeof window !== "undefined") {
      const isLightPackUser =
        window.nuk && window.nuk.user && window.nuk.user.isLightPackUser;
      content = isLightPackUser ? lightPackContent : notLightPackContent;
    }
    return content;
  };

  const content = getContent();
  return (
    <SlideUpWrapper showComponent={showComponent}>
      {content.map(item => (
        <>
          <MagicCarpetCardWrapper>
            <MagicCarpetCardContainer>
              <LabelContainer>
                {item.icon && getIcon(item.labels[0], item.labelColor)}
                <Label color={item.labelColor}>{item.labels[0]}</Label>
                <LabelDivider />
                <Label>{item.labels[1]}</Label>
              </LabelContainer>
              <ImageTextContainer>
                <Image
                  square={item.labels.includes("PUZZLES")}
                  src={item.image}
                />
                <Title href={item.titleLink}>{item.title}</Title>
              </ImageTextContainer>
            </MagicCarpetCardContainer>
          </MagicCarpetCardWrapper>
          <CardDivider />
        </>
      ))}
      <LinkButton href="/register">Customise</LinkButton>
    </SlideUpWrapper>
  );
};
