export const isNationalCompetition = (competition: string) => {
  const nationalCompetitions = [
    '3', // UEFA European Championship Finals
    '235', // UEFA European Championship Qualifiers
    '941' // UEFA Nations League
  ];
  return nationalCompetitions.includes(competition);
};

export const replaceWithTBD = (element: HTMLCollectionOf<Element>) => {
  let count = 0;
  const replaceDetails = setInterval(() => {
    if (count >= 5) {
      clearInterval(replaceDetails);
    }
    count++;

    for (let optaFlagContainer of element) {
      const country = (optaFlagContainer as HTMLElement).innerText;

      if (country) {
        if (country.includes('Third Place') || country.includes('Group')) {
          (optaFlagContainer as HTMLElement).innerText = 'TBD';
        }

        (optaFlagContainer as HTMLElement).innerText = (optaFlagContainer as HTMLElement).innerText.replace(
          /Quarter-Finalist/,
          'QF'
        );
        (optaFlagContainer as HTMLElement).innerText = (optaFlagContainer as HTMLElement).innerText.replace(
          /Semi-Finalist/,
          'SF'
        );
        (optaFlagContainer as HTMLElement).innerText = (optaFlagContainer as HTMLElement).innerText.replace(
          /Semi-Final/,
          'SF'
        );
      }
    }
  }, 500);
};
