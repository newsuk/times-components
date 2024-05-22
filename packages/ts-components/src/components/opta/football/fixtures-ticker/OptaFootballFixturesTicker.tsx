import React, { useState, useEffect } from 'react';

import { Placeholder } from '@times-components/image';

import {
  initSettings,
  initStyleSheet,
  initScript,
  initElement,
  initComponent
} from '../../utils/config';

import { PlaceholderContainer } from '../shared-styles';
import { WidgetContainer } from './styles';

export const OptaFootballFixturesTicker: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
}> = React.memo(({ season, competition, date_from, date_to }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [optaImages, setOptaImages] = useState<HTMLCollectionOf<Element> | undefined>();
  const nationalCompetitions = ['3','5','6','235','941','1125'];
  const isNationalCompetition = nationalCompetitions.includes(competition)

  useEffect(() => {
    const sport = 'football';

    initSettings();
    initStyleSheet(sport);

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement('opta-widget', {
          sport,
          widget: 'fixtures',
          season,
          competition,
          date_from,
          date_to,
          live: true,
          start_on_current: true,
          template: 'strip',
          team_naming: 'brief',
          match_status: 'all',
          order_by: 'date_ascending',
          show_grouping: true,
          show_crests: !isNationalCompetition,
          show_date: true,
          date_format: 'ddd Do MMM'
        }).outerHTML;

        initComponent();
        setIsReady(true);

        if (isNationalCompetition) {
          const TeamNameContainers = ref.current.getElementsByClassName('Opta-TeamName')
          TeamNameContainers && setOptaImages(TeamNameContainers)
          console.log(TeamNameContainers)
        } 
      }
    });
  }, [ref]);
  
  if (isNationalCompetition) {
    const replaceImages = setInterval(() => {
      if (optaImages && optaImages.length > 0) {
        for (let optaImage of optaImages) {
          const country = optaImage && (optaImage as HTMLElement).innerText;

          if (!optaImage.querySelector('img')) {
            const countryImg = document.createElement("img");
            countryImg.setAttribute('src', `https://nuk-tnl-editorial-prod-staticassets.s3.eu-west-1.amazonaws.com/opta/euro-flags/${country}.svg`);
            countryImg.setAttribute('onerror', 'this.remove()');
            countryImg.classList.add('team-flag');

            optaImage.prepend(countryImg)            
          }
        }
        clearInterval(replaceImages);
      }
    }, 500);
  }

  return (
    <>
      <WidgetContainer ref={ref} />

      {!isReady && (
        <PlaceholderContainer height={100}>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </>
  );
});
