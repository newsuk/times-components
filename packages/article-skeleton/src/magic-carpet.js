/* eslint-disable */

import React from "react";
import styled from "styled-components";

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
const content = [
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
    labelColor: "#54145D"
  },
  {
    title: "Trump used assassination attempt to his advantage",
    titleLink:
      "world/us-world/article/donald-trump-used-assassination-attempts-advantage-us-election-2024-g9mz5wf8r",
    image:
      "https://s3-alpha-sig.figma.com/img/cdcb/7283/3ad7a0c137457614d3d1a693452964e1?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g5MwasiSQlq1ZyOFr-uaC9NvL3hb1Ui3gkHd7-izDGz7zBgTSHN3~pPpEcBSwBEbzp8-dTXfITS7M4XlM5jPy3GzA7N333yrbkwqWCX~xZkHLXYjnBlwQ59ukqOaRLyWZh1vSMqQTshRPnSso07sHXh37HIWuILsM1AKs9-NgDdNaQeyZgw--70gTFHJEUQ8iQdO00BqzcvRir0SAJXC4oYSRsT6X~qLNzRucIBLfHViEEcKruSWqhv~YPkym7DgeZCYQ9kBuSWb6NxSrNtzC-FNzzIzVAjcsFrUarEEzFgZywRC3n96sBTgHG6HYdJVVpqSIhrgDhD16Y~9ri4-3Q__",
    labels: ["VIDEO", "US"],
    labelColor: "#005C8A"
  },
  {
    title: "Times General Knowledge No 12345",
    titleLink: "/puzzles/crossword/times-gk-crossword-no-252-n0n70whpb",
    image:
      "https://s3-alpha-sig.figma.com/img/24f9/bc87/903eed2895cf7ef34c3bd86cdb19ee74?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKEomwG~hc7W-ITYVzz8vKI7cKX4bkZ0xv1Ll-SW9mfR621lZvjzGwFO6F5hFrPo37GTok3RUi5G6JdS4jTXwxPPIOMYfPJzwgImrbY2eKElIBD-vSPBDK9U5OXc6dmN3600vGHDvEclr8Ar0FO8ZmXwKhnUa-hM2i2~~UOCHSHorTryt-iOn28pUC4~sqXhRSdz-5FH07IoVekjFmXYhX-mz8FCHgPvE~SrhlTmemubmMvU-FttZjY~rcyr7p9IkLWyXQ3jenq8UFRiiZ9buR0LQ6MpP85ocGQ4MCRnj2uCPVEtMU6wde34oI-GpvEa-B5Cf8zVR7GtF1ZfW5gsAw__",
    labels: ["PLAY", "PUZZLES"],
    labelColor: "#005C8A"
  }
];

export const MagicCarpet = ({ showComponent }) => {
  const isLightPackUser =
    window.nuk && window.nuk.user && window.nuk.user.isLightPackUser;
  return isLightPackUser ? (
    <SlideUpWrapper showComponent={showComponent}>
      {content.map(item => (
        <>
          <MagicCarpetCardWrapper>
            <MagicCarpetCardContainer>
              <LabelContainer>
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
    </SlideUpWrapper>
  ) : (
    <SlideUpWrapper showComponent={showComponent}>
      {content.reverse().map(item => (
        <>
          <MagicCarpetCardWrapper>
            <MagicCarpetCardContainer>
              <LabelContainer>
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
    </SlideUpWrapper>
  );
};
