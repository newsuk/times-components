import React from "react";
import { Stack, TextBlock, LinkStandalone, styled } from "newskit";
import PropTypes from "prop-types";

const StyledLinkStandalone = styled(LinkStandalone)`
  cursor: pointer;
  &:hover {
    text-decoration: none !important;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const ShareItem = ({
  children,
  testId,
  tooltipContent,
  href,
  onClick = () => {},
  ...props
}) => (
  <StyledLinkStandalone
    data-testid={testId}
    onClick={onClick}
    href={href}
    target="_blank"
    title={tooltipContent}
    external={false}
    {...props}
  >
    {children}
  </StyledLinkStandalone>
);

export const ShareItemLabel = ({ children, icon }) => (
  <Stack flow="horizontal-center" spaceInline="space020">
    <IconContainer>{icon}</IconContainer>
    <TextBlock typographyPreset="utilityLabel020">{children}</TextBlock>
  </Stack>
);

ShareItem.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  tooltipContent: PropTypes.string
};

ShareItem.defaultProps = {
  testId: "share-item",
  href: "",
  onClick: () => {},
  tooltipContent: ""
};

ShareItemLabel.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired
};
