import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ShareItemLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareItemLabelText = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
`;

const StyledLink = styled.a`
  color: #005c8a;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #00527a;
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
  <StyledLink
    data-testid={testId}
    onClick={onClick}
    href={href}
    target="_blank"
    title={tooltipContent}
    {...props}
  >
    {children}
  </StyledLink>
);

export const ShareItemLabel = ({ children, icon }) => (
  <ShareItemLabelContainer>
    <IconContainer>{icon}</IconContainer>
    <ShareItemLabelText>{children}</ShareItemLabelText>
  </ShareItemLabelContainer>
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
