import React, { useEffect, useState } from 'react';

import { Container, Text, Title } from './styles';

export const WelcomeBanner: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<Boolean>(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('showWelcomeBanner')) {
      window.sessionStorage.removeItem('showWelcomeBanner');
      setIsEnabled(true);
    }
  }, []);

  return isEnabled ? (
    <Container>
      <Title>Welcome to The Times and The Sunday Times</Title>
      <Text>We hope you enjoy your free article</Text>
    </Container>
  ) : null;
};
