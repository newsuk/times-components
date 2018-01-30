import React from "react";
import { SubContainer, MainContainer } from "./styles/responsive";
import SliceContent from "./slice-content";
import SliceHeading from "./slice-heading";
import { propTypes, defaultProps } from "./slice-prop-types";

const Slice = ({ item, template }) => (
  <MainContainer template={template}>
    <SliceHeading />
    <SubContainer>
      <SliceContent item={item} />
    </SubContainer>
  </MainContainer>
);

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
