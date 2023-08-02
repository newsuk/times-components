import React, { useEffect, useState } from 'react';

import { WelcomeBannerContainer, Text, Title } from './styles';

export const WelcomeBanner: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('showWelcomeBanner')) {
      window.sessionStorage.removeItem('showWelcomeBanner');
      setIsEnabled(true);
    }
  }, []);

  return isEnabled ? (
    <WelcomeBannerContainer>
      <Title data-testId="title">
        Welcome to The Times and The Sunday Times
      </Title>
      <Text data-testId="text">We hope you enjoy your free content</Text>
    </WelcomeBannerContainer>
  ) : null;
};
