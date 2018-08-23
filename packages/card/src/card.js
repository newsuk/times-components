import React from "react";
import { Animations } from "@times-components/styleguide";
import { cardPropTypes, cardDefaultProps } from "./card-prop-types";
import CardContent from "./card-content";

const CardComponent = props => (
  <Animations.FadeIn>
    <CardContent {...props} />
  </Animations.FadeIn>
);

CardComponent.propTypes = cardPropTypes;
CardComponent.defaultProps = cardDefaultProps;

export default CardComponent;
