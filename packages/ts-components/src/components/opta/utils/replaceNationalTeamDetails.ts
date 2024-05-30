export const isNationalCompetition = (competition: string) => {
  const nationalCompetitions = [
    '3', // UEFA European Championship Finals
    '235', // UEFA European Championship Qualifiers
    '941' // UEFA Nations League
  ];
  return nationalCompetitions.includes(competition);
};

export const replaceWithTBD = (element: HTMLCollectionOf<Element>) => {
  setTimeout(() => {
    for (let optaFlagContainer of element) {
      const country = (optaFlagContainer as HTMLElement).innerText;

      if (country && country.includes('Third Place')) {
        (optaFlagContainer as HTMLElement).innerText = 'TBD';
      }
    }
  }, 500);
};
