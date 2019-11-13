/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from "react";
import { AttributedString } from "@times-components/typeset";
import { colours } from "@times-components/styleguide";
import PropTypes from "prop-types";
import makeDropCap from "./drop-cap";
import InlineParagraph from "./inline-paragraph";
import SimpleParagraph from "./simple-paragraph";

const ArticleParagraph = ({
  key,
  children,
  index,
  tree,
  scale,
  dropcapsDisabled,
  isTablet,
  defaultFont,
  onLinkPress,
  data,
  dropCapFont,
  LinkComponent
}) => {
  const str = AttributedString.join(
    children.filter(child => child instanceof AttributedString)
  );

  const [inline] = children.filter(
    child => !(child instanceof AttributedString)
  );

  const dropCap = useMemo(
    () =>
      !dropcapsDisabled && index === 0
        ? makeDropCap(scale, colours.section[data.section], dropCapFont, str)
        : false,
    [data.section, dropCapFont, dropcapsDisabled, index, scale, str]
  );

  if (!inline && !dropCap) {
    return (
      <SimpleParagraph
        tree={tree}
        key={key}
        defaultFont={defaultFont}
        onLinkPress={onLinkPress}
        LinkComponent={LinkComponent}
      >
        {children}
      </SimpleParagraph>
    );
  }

  return (
    <InlineParagraph
      isTablet={isTablet}
      dropCap={dropCap}
      str={str}
      scale={scale}
      inline={inline}
      tree={tree}
      key={key}
      defaultFont={defaultFont}
      onLinkPress={onLinkPress}
      LinkComponent={LinkComponent}
    />
  );
};

ArticleParagraph.propTypes = {
  key: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  tree: PropTypes.object.isRequired,
  scale: PropTypes.string.isRequired,
  dropcapsDisabled: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  defaultFont: PropTypes.object.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  dropCapFont: PropTypes.object.isRequired,
  LinkComponent: PropTypes.func.isRequired
};

export default ArticleParagraph;
