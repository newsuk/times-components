/* eslint-disable */

import React from "react";
import styled from "styled-components";

const SlideUpWrapper = styled.div`
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
  border-radius: 50%;
`;

const MagicCarpetCardWrapper = styled.div`
  width: 336px;
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

const MagicCarpetCard = () => (
  <MagicCarpetCardWrapper>
    <MagicCarpetCardContainer>
      <LabelContainer>
        <Label color="#007A3F">HAVE YOUR SAY</Label>
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

export const MagicCarpet = ({ showComponent }) => {
  return (
    <SlideUpWrapper showComponent={showComponent}>
      <MagicCarpetCard />
    </SlideUpWrapper>
  );
};
