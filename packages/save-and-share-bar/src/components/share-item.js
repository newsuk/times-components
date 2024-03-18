import React from "react";
import { Stack, TextBlock, LinkStandalone, styled } from "newskit";
import PropTypes from "prop-types";

const StyledLinkStandalone = styled(LinkStandalone)`
  cursor: pointer;
  &:hover {
    text-decoration: none !important;
  }
`;

export const ShareItem = ({
  children,
  testId,
  href,
  onClick = () => {},
  ...props
}) => (
  <StyledLinkStandalone
    data-testid={testId}
    onClick={onClick}
    href={href}
    target="_blank"
    external={false}
    {...props}
  >
    {children}
  </StyledLinkStandalone>
);

export const ShareItemLabel = ({ children, icon }) => (
  <Stack flow="horizontal-center" spaceInline="space020">
    {icon}
    <TextBlock typographyPreset="utilityLabel020">{children}</TextBlock>
  </Stack>
);

ShareItem.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
};

ShareItem.defaultProps = {
  testId: "share-item",
  href: "",
  onClick: () => {}
};

ShareItemLabel.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired
};
