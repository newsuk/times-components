import { useEffect } from 'react';
import { addFixturesPageLink } from './addFixturesPageLink';

export const getAndAddFixturesPageLink = (
  container: string,
  fixturesPageUrl: string,
  isDarkMode: boolean
): boolean => {
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
          if (count >= 10) {
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
        }, 500);
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
