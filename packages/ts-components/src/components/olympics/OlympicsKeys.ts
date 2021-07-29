export type OlympicsKeys = {
  endpoint: string;
  authToken: string;
  gamesCode: string;
};

const dev = {
  endpoint: '.',
  authToken: '6i3DuEwbVhr2Fht6',
  gamesCode: 'OG2020-TR2'
};

const staging = {
  endpoint: 'https://olympics-embed-staging.pamedia.io',
  authToken: '6i3DuEwbVhr2Fht6',
  gamesCode: 'OG2020-TR2'
};

const prod = {
  endpoint: 'https://olympics-embed.pamedia.io',
  authToken: 'aUkSirP39ukOuuo1',
  gamesCode: 'OG2020'
};

export const config: { [key: string]: OlympicsKeys } = { dev, staging, prod };
