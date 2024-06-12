import { render, waitFor } from '@testing-library/react';

import * as useFixturePageLinkFn from '../useFixturePageLink';
import * as addFixturesPageLinkModule from '../addFixturesPageLink';
import React from 'react';


const classNameForFixtures = 'Opta-Room';
const fixturesPageUrl = 'https://www.thetimes.co.uk/sport/football/euro-2024';

describe('getAndAddFixturesPageLink', () => {
  jest.spyOn(addFixturesPageLinkModule, 'addFixturesPageLink');
  jest.spyOn(useFixturePageLinkFn, 'useFixturePageLink')

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should call addFixturesPageLink if Opta-Room exists and fixturesPageUrlElement does not exist', () => {
    document.body.innerHTML = `<div class='${classNameForFixtures}'</div>`;
    expect(useFixturePageLinkFn.getAndAddFixturesPageLink(classNameForFixtures, fixturesPageUrl, false)).toBe(true);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalledWith(expect.any(HTMLCollection), fixturesPageUrl, false);
  });

  it('should not call addFixturesPageLink if Opta-Room does not exist', () => {
    document.body.innerHTML = '';
    expect(useFixturePageLinkFn.getAndAddFixturesPageLink(classNameForFixtures, fixturesPageUrl, false)).toBe(false);
    expect(addFixturesPageLinkModule.addFixturesPageLink).not.toHaveBeenCalled();
  });

  it('should not call addFixturesPageLink if fixturesPageUrlElement exists', () => {
    document.body.innerHTML = `<div class=${classNameForFixtures}></div><div class="fixtures-page-link"></div>`;
    expect(useFixturePageLinkFn.getAndAddFixturesPageLink(classNameForFixtures, fixturesPageUrl, false)).toBe(false);
    expect(addFixturesPageLinkModule.addFixturesPageLink).not.toHaveBeenCalled();
  });

  it('should call addFixturesPageLink if fixturesPageUrlElement does not exist but Opta-Room does', () => {
    document.body.innerHTML = `<div class=${classNameForFixtures}></div></div>`;
    expect(useFixturePageLinkFn.getAndAddFixturesPageLink(classNameForFixtures, fixturesPageUrl, false)).toBe(true);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalled();
  });
});

describe('useFixturePageLink', () => {
  let ref: any;
  jest.spyOn(addFixturesPageLinkModule, 'addFixturesPageLink');
  jest.spyOn(useFixturePageLinkFn, 'useFixturePageLink')

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    ref = { current: document.createElement('div') };
  });


  const TestComponent = ({ container, isDarkMode, fixturesPageUrl }: {container: string, isDarkMode: boolean, fixturesPageUrl: string}) => {
    useFixturePageLinkFn.useFixturePageLink(ref, container, isDarkMode, fixturesPageUrl);
    return <div ref={ref}><div className={container}></div></div>;
  };

  it('should call getAndAddFixturesPageLink on mount', () => {
    render(<TestComponent container={classNameForFixtures} fixturesPageUrl="http://fixtures.url" isDarkMode={false} />);
    jest.advanceTimersByTime(3000);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalled();
  });

  it('should have link appended to the end', async () => {
    const fixturesPageUrl = 'https://www.thetimes.co.uk/sport/football/euro-2024';
    render(<TestComponent container={classNameForFixtures} fixturesPageUrl={fixturesPageUrl} isDarkMode={false} />);
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      const elements = document.getElementsByClassName(classNameForFixtures);
      expect(elements.length).toBe(1);
      const transformedElements = Array.from(elements);
      const appendedLink: HTMLAnchorElement | null = transformedElements[transformedElements.length-1].querySelector('.fixtures-page-link a');
      expect(appendedLink).toBeInstanceOf(HTMLAnchorElement);
      expect(appendedLink?.href).toBe(fixturesPageUrl);
      expect(appendedLink?.querySelector('span')?.textContent).toBe('Full Fixtures & Results');
    });
  });

  it('should retry adding fixture link inside setInterval', () => {

    const TestComponentMaxRetries = ({ container, isDarkMode, fixturesPageUrl }: {container: string, isDarkMode: boolean, fixturesPageUrl: string}) => {
      useFixturePageLinkFn.useFixturePageLink(ref, container, isDarkMode, fixturesPageUrl);
      return <div ref={ref}></div>;
    };

    jest.spyOn(useFixturePageLinkFn, 'getAndAddFixturesPageLink').mockReturnValue(false);

    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    const fixturesPageUrl = 'https://www.thetimes.co.uk/sport/football/euro-2024';

    render(<TestComponentMaxRetries container="DummyClass" fixturesPageUrl={fixturesPageUrl} isDarkMode={false} />);

    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(6000);
    expect(useFixturePageLinkFn.getAndAddFixturesPageLink).toHaveBeenCalledTimes(12); // 1 initial + 11 retries

    jest.useRealTimers();
  });
});
