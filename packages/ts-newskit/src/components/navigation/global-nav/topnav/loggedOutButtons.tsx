import React from 'react';
import { Block, Button, Stack } from 'newskit';
import { LoggedOutButtonsContainer } from '../styles';

type LoggedOutNavButtonsProps = {
  loginUrl: string;
  subscribeUrl: string;
};
export const LoggedOutButtons: React.FC<LoggedOutNavButtonsProps> = ({
  loginUrl,
  subscribeUrl
}) => (
  <>
    <LoggedOutButtonsContainer
      paddingInline="space040"
      paddingBlock="space030"
      role="region"
      aria-label="My Account Navigation"
    >
      <Stack flow="horizontal-stretch" flexGrow={true}>
        <Button
          overrides={{
            stylePreset: 'buttonSolidSecondary',
            width: '100%',
            height: '40px'
          }}
          size="medium"
          href={loginUrl}
        >
          Log in
        </Button>
        <Block marginInline="space010" />
        <Button
          overrides={{
            stylePreset: 'buttonSolidPrimary',
            width: '100%',
            height: '40px'
          }}
          size="medium"
          href={subscribeUrl}
        >
          Subscribe
        </Button>
      </Stack>
    </LoggedOutButtonsContainer>
  </>
);
