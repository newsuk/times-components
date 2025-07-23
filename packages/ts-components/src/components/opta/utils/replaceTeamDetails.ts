import { OptaSport } from '../shared/fixtures-ticker/OptaFixturesTicker';

export const isNationalCompetition = (
  competition: string,
  sport: OptaSport
) => {
  const nationalCompetitions = [
    '3', // UEFA European Championship Finals
    '235', // UEFA European Championship Qualifiers
    '941' // UEFA Nations League
  ];
  return sport === 'football' && nationalCompetitions.includes(competition);
};

export const replaceTeamName = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = `
    Opta.events.subscribe('widget.loaded', function (widget) {
      const placeholder = document.querySelector('.opta-placeholder');

      const attr = widget.widget.attr;
      const sport = attr.sport;
      const competition = attr.competition;
      const nationalFootballCompetitions = [3, 235, 941];
    
      // This added class to replace flags for the Euro 2024 here;
      // - packages/ts-components/src/components/opta/shared/shared-styles.ts
      // if (sport === 'football' && nationalFootballCompetitions.includes(competition)) {
      //   Opta(widget.widget.wid).addClass('team-flags');
      // }

      Opta(widget.widget.wid + ' .Opta-TeamName').each(function (num, element) {
        const team = Opta(element);
        const isGroupPlayoff =
          team[0].innerText.includes('Third Place') ||
          team[0].innerText.includes('Group');

        const replacements = [
          { pattern: /Quarter-Finalist/g, replacement: 'QF' },
          { pattern: /Semi-Finalist|Semi-Final/g, replacement: 'SF' },
          { pattern: /British & Irish Lions/g, replacement: 'The Lions' },
          {
            pattern: /First Nations & Pasifika XV/g,
            replacement: 'FN & Pasifika XV'
          }
        ];

        replacements.forEach(({ pattern, replacement }) => {
          team[0].innerText = isGroupPlayoff
            ? 'TBD'
            : team[0].innerText.replace(pattern, replacement);
        });
      });

      if (placeholder) {
        placeholder.style.display = 'none';
      }
    });
  `;
  document.body.appendChild(script);
};
