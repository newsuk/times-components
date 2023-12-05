import React from 'react';
import { Block, Button, Stack } from 'newskit';
import { LoggedOutButtonsContainer } from '../styles';

type LoggedOutNavButtonsProps = {
  loginUrl: string;
  subscribeUrl: string;
  clickHandler: (title: string) => void;
};
export const LoggedOutButtons: React.FC<LoggedOutNavButtonsProps> = ({
  loginUrl,
  subscribeUrl,
  clickHandler
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
          onClick={() => clickHandler('Log in')}
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
          onClick={() => clickHandler('Subscribe')}
        >
          Subscribe
        </Button>
      </Stack>
    </LoggedOutButtonsContainer>
  </>
);
