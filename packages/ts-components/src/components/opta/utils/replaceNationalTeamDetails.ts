export const isNationalCompetition = (competition: string) => {
  const nationalCompetitions = [
    '3', // UEFA European Championship Finals
    '235', // UEFA European Championship Qualifiers
    '941', // UEFA Nations League
  ];
  return nationalCompetitions.includes(competition);
};

export const replaceWithTBD = (element: HTMLCollectionOf<Element>) => {
  let count = 0;
  const replaceDetails = setInterval(() => {
    if (count >= 25) {
      clearInterval(replaceDetails);
    }
    count++;

    for (let optaFlagContainer of element) {
      const country = optaFlagContainer as HTMLElement;

      if (country) {
        const isGroupPlayoff =
          country.innerText.includes('Third Place') ||
          country.innerText.includes('Group');

        const replacements = [
          { pattern: /Quarter-Finalist/g, replacement: 'QF' },
          { pattern: /Semi-Finalist|Semi-Final/g, replacement: 'SF' },
        ];

        replacements.forEach(({ pattern, replacement }) => {
          country.innerText = isGroupPlayoff
            ? 'TBD'
            : country.innerText.replace(pattern, replacement);
        });
      }
    }
  }, 500);
};
