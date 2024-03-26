import React from 'react';
import { Stack, TextBlock } from 'newskit';
import { ShareItemLabelProps, ShareItemProps } from '../types';
import { StyledLinkStandalone, IconContainer } from './styled';

export const ShareItem = ({
  children,
  testId,
  tooltipContent,
  href = '',
  onClick = () => null,
  ...props
}: ShareItemProps) => (
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

export const ShareItemLabel = ({ children, icon }: ShareItemLabelProps) => (
  <Stack flow="horizontal-center" spaceInline="space020">
    <IconContainer>{icon}</IconContainer>
    <TextBlock typographyPreset="utilityLabel020">{children}</TextBlock>
  </Stack>
);
