/* eslint-disable */

import React from "react";
import styled from "styled-components";

const SlideUpWrapper = styled.div`
  overflow: auto;
  scrollbar-width: none;
  scroll-behavior: auto;
  opacity: 1;
  pointer-events: 'auto';
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
  transition: bottom 1s ease-in-out; /* Smooth transition */
  flex-direction: row;
  display: flex;
`;

const Title = styled.span`
  font-family: TimesModern-Regular, TimesModern-Regular-fallback, serif;
  font-size: 20px;
  color: #01000d;
  font-weight: 400;
  text-align: left;
  padding-left: 16px;
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
  border-radius: ${props => (props.square) ? 0 : '50%'}
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

const MagicCarpetCard = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#FF5656">HAVE YOUR SAY</Label>
        <LabelDivider />
        <Label>89 RECENTLY COMMENTED</Label>
      </LabelContainer>
      <ImageTextContainer>
        <Image src="https://s3-alpha-sig.figma.com/img/dd68/3e09/181fd13a92c1ab3e6319601ba403e6a9?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OPybSiJqmJXr5pl6BAwdtIZqpBWdVVJxKv-woB4y3EieTJKxfvNMOOyjO5C6u2ZEy0eA9F8iRtAenGLBGbUIBZt322hVscJDtODxjsNc3wP2wNne7khqGCroAJkgpuVQUbP4HvXqKJ-VV8-28KjIkN~YDVxsK0JUU8KuZMgfweWwv0g8auVUXEr1eU9AvaEgR-TMxJ52sNsyC9eE9Kj47V6yfZZ7KUHcUPxtvjjsIxySgJJvfY0FKsECPp5X1y6ym5DxFoknvG~HzfsUXDcuOUvauSIrKlz~S4yhBSCJBkEi0mBN56LPf5i9IlaBRqPmSt1mXPGwYoeEtsnn1e14WA__" />
        <Title>'Change has begun': Starmer gives first conference speech</Title>
      </ImageTextContainer>
    </MagicCarpetCardContainer>
  </MagicCarpetCardWrapper>
);

const MagicCarpetCard1 = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#007A3F">READ MORE</Label>
        <LabelDivider />
        <Label>SPORT</Label>
      </LabelContainer>
      <ImageTextContainer>
        <Image src="https://s3-alpha-sig.figma.com/img/b168/4d1b/b9361aacf8aa15439db267471ccf52ae?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djhM7Ifd4NH-iGmZb5IYPjRG5xrNSOCCXybgwEcfLWNTa5itFXwv715Oe8~-QYy5fenMRts0Oce6GlQ8rOhSqVhR2h1HAmJZZ8VxDL9zSWxZ~IejyHGNj0Q7LXqsxL8vfs7rypyZ94pN48bqIVvNPKi~6qf9~-qbAHx0CJJtCsQXE8102~de5dVTAn-WUIhzqY50UCaImG9IvTcX~tQxJE3aI7dYLvPa~iPpd5OxGrRaBaoQeHe-kXknkb-BpXtJ3AQvhdJXRdGSTRexyDR2eh7NQT6FJPywUz2uxYzikSzFuYYlBg2Ul2K40eQtsOBacuT0mtlwu0x0eWO5iLL~Tg__" />
        <Title>Rodri could miss rest of season with knee injury</Title>
      </ImageTextContainer>
    </MagicCarpetCardContainer>
  </MagicCarpetCardWrapper>
);

const MagicCarpetCard2 = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#54145D">PODCAST</Label>
        <LabelDivider />
        <Label>TIMES NEWS BRIEFING</Label>
      </LabelContainer>
      <ImageTextContainer>
        <Image src="https://s3-alpha-sig.figma.com/img/8505/83db/efe4ca6f159524c5e9605c09e22beb63?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HNYdABcDQqUiXIfetUZ9OA2Lh5IZ82h6NT4eNrR0mgrj1vk0TFNkd5pbMEAgfjBNwCQPT9kQIoifJ3HE6qjb4D69RgSr~R0Y3uMhuju4jBbmgMIXsE0C1-QjJcSXtj427ttm4ObVlhHlsWRb2lFcO2mlmnRqstmCaCRGqD-oAtUXZYQCXA45Cu27c7ezqBkaMID5VeShG4Psk-JmSXmtMSiPjYwFKlEKktniFs8fnwjdyFlHWxVPt6F~JXUemvDvVFavY9XBYRKdhOd4SkoVhKLe3kvenIFX6~yDqERGaIt1Vh5jAKBnoDxvCXWn~kjIjLKFwOzqYpFmYaeqFFQfjg__" />
        <Title>Evening Briefing Thursday 26th September</Title>
      </ImageTextContainer>
    </MagicCarpetCardContainer>
  </MagicCarpetCardWrapper>
);

const MagicCarpetCard3 = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#005C8A">VIDEO</Label>
        <LabelDivider />
        <Label>US</Label>
      </LabelContainer>
      <ImageTextContainer>
        <Image src="https://s3-alpha-sig.figma.com/img/cdcb/7283/3ad7a0c137457614d3d1a693452964e1?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g5MwasiSQlq1ZyOFr-uaC9NvL3hb1Ui3gkHd7-izDGz7zBgTSHN3~pPpEcBSwBEbzp8-dTXfITS7M4XlM5jPy3GzA7N333yrbkwqWCX~xZkHLXYjnBlwQ59ukqOaRLyWZh1vSMqQTshRPnSso07sHXh37HIWuILsM1AKs9-NgDdNaQeyZgw--70gTFHJEUQ8iQdO00BqzcvRir0SAJXC4oYSRsT6X~qLNzRucIBLfHViEEcKruSWqhv~YPkym7DgeZCYQ9kBuSWb6NxSrNtzC-FNzzIzVAjcsFrUarEEzFgZywRC3n96sBTgHG6HYdJVVpqSIhrgDhD16Y~9ri4-3Q__" />
        <Title>Trump used assassination attempt to his advantage</Title>
      </ImageTextContainer>
    </MagicCarpetCardContainer>
  </MagicCarpetCardWrapper>
);

const MagicCarpetCard4 = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#005C8A">PLAY</Label>
        <LabelDivider />
        <Label>PUZZLES</Label>
      </LabelContainer>
      <ImageTextContainer>
        <Image square={true} src="https://s3-alpha-sig.figma.com/img/24f9/bc87/903eed2895cf7ef34c3bd86cdb19ee74?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKEomwG~hc7W-ITYVzz8vKI7cKX4bkZ0xv1Ll-SW9mfR621lZvjzGwFO6F5hFrPo37GTok3RUi5G6JdS4jTXwxPPIOMYfPJzwgImrbY2eKElIBD-vSPBDK9U5OXc6dmN3600vGHDvEclr8Ar0FO8ZmXwKhnUa-hM2i2~~UOCHSHorTryt-iOn28pUC4~sqXhRSdz-5FH07IoVekjFmXYhX-mz8FCHgPvE~SrhlTmemubmMvU-FttZjY~rcyr7p9IkLWyXQ3jenq8UFRiiZ9buR0LQ6MpP85ocGQ4MCRnj2uCPVEtMU6wde34oI-GpvEa-B5Cf8zVR7GtF1ZfW5gsAw__" />
        <Title>Times General Knowledge No 12345</Title>
      </ImageTextContainer>
    </MagicCarpetCardContainer>
  </MagicCarpetCardWrapper>
);

export const MagicCarpet = ({ showComponent }) => {
  return (
    <SlideUpWrapper showComponent={showComponent}>
      <MagicCarpetCard />
      <CardDivider />
      <MagicCarpetCard1 />
      <CardDivider />
      <MagicCarpetCard2 />
      <CardDivider />
      <MagicCarpetCard3 />
      <CardDivider />
      <MagicCarpetCard4 />
    </SlideUpWrapper>
  );
};
