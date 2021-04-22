import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const Container = styled.div`
  height: 240px;
  background-color: #F9F9F9;
  border-top: 2px #13354E solid;
`;

const ImageContainer = styled.img`
  width: 300px;
  height: 200px;
`;

const Label = styled.span`

`;

const Heading = styled.h3`

`;

const Description = styled.span`

`;

const Link = styled.a`

`;


const StandardPuff = ({
  label,
  image,
}) => (
  <Container>
    <ImageContainer src={image}/>
    <span>{label}</span>
  </Container>
);

export default StandardPuff;