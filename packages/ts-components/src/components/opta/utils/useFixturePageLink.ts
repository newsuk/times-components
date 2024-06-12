import { useEffect } from 'react';
import { addFixturesPageLink } from './addFixturesPageLink';

export const getAndAddFixturesPageLink = (
  container: string,
  fixturesPageUrl: string,
  isDarkMode: boolean
): boolean => {
  const OptaRoom = document.querySelector(`.${container}`);
  const fixturesPageUrlElement = document.querySelector('.fixtures-page-link');
  if (OptaRoom && !fixturesPageUrlElement) {
    addFixturesPageLink(OptaRoom, fixturesPageUrl, isDarkMode);
    return true;
  }
  return false;
};

export const useFixturePageLink = (
  ref: React.RefObject<HTMLDivElement>,
  container: string,
  isDarkMode: boolean = false,
  fixturesPageUrl: string
): void => {
  useEffect(
    () => {
      let addFixtureLink = getAndAddFixturesPageLink(
        container,
        fixturesPageUrl,
        isDarkMode
      );
      let setFixtureLink: NodeJS.Timeout | undefined;
      if (!addFixtureLink) {
        let count = 0;
        setFixtureLink = setInterval(() => {
          if (count >= 30) {
            clearInterval(setFixtureLink);
          }
          count++;
          addFixtureLink = getAndAddFixturesPageLink(
            container,
            fixturesPageUrl,
            isDarkMode
          );
          if (addFixtureLink) {
            clearInterval(setFixtureLink);
          }
        }, 200);
      }
      return () => {
        if (setFixtureLink) {
          clearInterval(setFixtureLink);
        }
      };
    },
    [ref, container, fixturesPageUrl, isDarkMode]
  );
};
