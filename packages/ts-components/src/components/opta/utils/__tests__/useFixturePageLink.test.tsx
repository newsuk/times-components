import { render, waitFor } from '@testing-library/react';

import * as useFixturePageLinkFn from '../useFixturePageLink';
import * as addFixturesPageLinkModule from '../addFixturesPageLink';
import React from 'react';

const classNameForFixtures = 'Opta-Room';
const fixturesPageUrl = 'https://www.thetimes.co.uk/sport/football/euro-2024';

describe('getAndAddFixturesPageLink', () => {
  jest.spyOn(addFixturesPageLinkModule, 'addFixturesPageLink');
  jest.spyOn(useFixturePageLinkFn, 'useFixturePageLink');

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should call addFixturesPageLink if Opta-Room exists and fixturesPageUrlElement does not exist', () => {
    document.body.innerHTML = `<div class='${classNameForFixtures}'</div>`;
    expect(
      useFixturePageLinkFn.getAndAddFixturesPageLink(
        classNameForFixtures,
        fixturesPageUrl
      )
    ).toBe(true);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      fixturesPageUrl
    );
  });

  it('should not call addFixturesPageLink if Opta-Room does not exist', () => {
    document.body.innerHTML = '';
    expect(
      useFixturePageLinkFn.getAndAddFixturesPageLink(
        classNameForFixtures,
        fixturesPageUrl
      )
    ).toBe(false);
    expect(
      addFixturesPageLinkModule.addFixturesPageLink
    ).not.toHaveBeenCalled();
  });

  it('should not call addFixturesPageLink if fixturesPageUrlElement exists', () => {
    document.body.innerHTML = `<div class=${classNameForFixtures}></div><div class="fixtures-page-link"></div>`;
    expect(
      useFixturePageLinkFn.getAndAddFixturesPageLink(
        classNameForFixtures,
        fixturesPageUrl
      )
    ).toBe(false);
    expect(
      addFixturesPageLinkModule.addFixturesPageLink
    ).not.toHaveBeenCalled();
  });

  it('should call addFixturesPageLink if fixturesPageUrlElement does not exist but Opta-Room does', () => {
    document.body.innerHTML = `<div class=${classNameForFixtures}></div></div>`;
    expect(
      useFixturePageLinkFn.getAndAddFixturesPageLink(
        classNameForFixtures,
        fixturesPageUrl
      )
    ).toBe(true);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalled();
  });
});

describe('useFixturePageLink', () => {
  let ref: any;
  jest.spyOn(addFixturesPageLinkModule, 'addFixturesPageLink');
  jest.spyOn(useFixturePageLinkFn, 'useFixturePageLink');

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    ref = { current: document.createElement('div') };
  });

  const TestComponent = ({
    container,
    pageUrl,
  }: {
    container: string;
    isDarkMode: boolean;
    pageUrl: string;
  }) => {
    useFixturePageLinkFn.useFixturePageLink(ref, container, pageUrl);
    return (
      <div ref={ref}>
        <div className={container} />
      </div>
    );
  };

  it('should call getAndAddFixturesPageLink on mount', () => {
    render(
      <TestComponent
        container={classNameForFixtures}
        pageUrl={fixturesPageUrl}
        isDarkMode={false}
      />
    );
    jest.advanceTimersByTime(3000);
    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalled();
  });

  it('should have link appended to the end', async () => {
    render(
      <TestComponent
        container={classNameForFixtures}
        pageUrl={fixturesPageUrl}
        isDarkMode={false}
      />
    );
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      const elements = document.getElementsByClassName(classNameForFixtures);
      expect(elements.length).toBe(1);
      const transformedElements = Array.from(elements);
      const appendedLink = transformedElements[
        transformedElements.length - 1
      ].querySelector('.fixtures-page-link a') as HTMLAnchorElement;
      expect(appendedLink).toBeInstanceOf(HTMLAnchorElement);
      expect(appendedLink.href).toBe(fixturesPageUrl);
      expect(
        (appendedLink.querySelector('span') as HTMLElement).textContent
      ).toBe('Full Fixtures & Results');
    });
  });

  it('should retry adding fixture link inside setInterval', () => {
    const TestComponentMaxRetries = ({
      container,
      pageUrl,
    }: {
      container: string;
      pageUrl: string;
    }) => {
      useFixturePageLinkFn.useFixturePageLink(ref, container, pageUrl);
      return <div ref={ref} />;
    };

    jest
      .spyOn(useFixturePageLinkFn, 'getAndAddFixturesPageLink')
      .mockReturnValue(false);

    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    render(
      <TestComponentMaxRetries
        container="DummyClass"
        pageUrl={fixturesPageUrl}
      />
    );

    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(6000);
    expect(
      useFixturePageLinkFn.getAndAddFixturesPageLink
    ).toHaveBeenCalledTimes(31); // 1 initial + 30 retries

    jest.useRealTimers();
  });
});
