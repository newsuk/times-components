import { useEffect } from 'react';
import { addFixturesPageLink } from './addFixturesPageLink';

export const getAndAddFixturesPageLink = (
  container: string,
  fixturesPageUrl: string
): boolean => {
  const OptaRoom = document.querySelector(`.${container}`);
  const fixturesPageUrlElement = document.querySelector('.fixtures-page-link');
  if (OptaRoom && !fixturesPageUrlElement) {
    addFixturesPageLink(OptaRoom, fixturesPageUrl);
    return true;
  }
  return false;
};

export const useFixturePageLink = (
  ref: React.RefObject<HTMLDivElement>,
  container: string,
  fixturesPageUrl: string
): void => {
  useEffect(() => {
    let addFixtureLink = getAndAddFixturesPageLink(container, fixturesPageUrl);
    let setFixtureLink: NodeJS.Timeout | undefined;
    if (!addFixtureLink) {
      let count = 0;
      setFixtureLink = setInterval(() => {
        if (count >= 30) {
          clearInterval(setFixtureLink);
        }
        count++;
        addFixtureLink = getAndAddFixturesPageLink(container, fixturesPageUrl);
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
  }, [ref, container, fixturesPageUrl]);
};
