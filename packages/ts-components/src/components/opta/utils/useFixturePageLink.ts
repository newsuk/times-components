import { RefObject, useEffect } from 'react';
import { addFixturesPageLink } from './addFixturesPageLink';

const getAndAddFixturesPageLink = (
  container: string,
  fixturesPageUrl: string,
  isDarkMode: boolean
) => {
  const OptaRoom = document.getElementsByClassName(container);
  const fixturesPageUrlElement = document.getElementsByClassName(
    'fixtures-page-link'
  );
  if (OptaRoom.length && !fixturesPageUrlElement.length) {
    addFixturesPageLink(OptaRoom, fixturesPageUrl, isDarkMode);
    return true;
  }
  return false;
};

export const useFixturePageLink = (
  ref: RefObject<HTMLDivElement>,
  container: string,
  isDarkMode: boolean = false,
  fixturesPageUrl: string
) => {
  useEffect(
    () => {
      const addFixtureLink = getAndAddFixturesPageLink(
        container,
        fixturesPageUrl,
        isDarkMode
      );
      if (!addFixtureLink) {
        let count = 0;
        const setFixtureLink = setInterval(() => {
          if (count >= 10) {
            clearInterval(setFixtureLink);
          }
          count++;
          getAndAddFixturesPageLink(container, fixturesPageUrl, isDarkMode);
          clearInterval(setFixtureLink);
        }, 500);
      }
    },
    [ref, fixturesPageUrl, isDarkMode, container]
  );
};
