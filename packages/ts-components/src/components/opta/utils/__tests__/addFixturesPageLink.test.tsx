import '@testing-library/jest-dom';
import * as addFixturesPageLinkModule from '../addFixturesPageLink';

const mockAddFixturesPageLink = () => {
  const mockDomContainer = document.createElement('div');

  const mockDomWrapper = document.createElement('div');
  mockDomWrapper.classList.add('Opta-Room');
  
  const mockDomElement = document.createElement('div');
  const mockDomElement2 = document.createElement('div');
  const mockDomElement3 = document.createElement('div');
  mockDomElement.innerText = 'Portugal';
  mockDomElement.classList.add('Opta-TeamName');

  mockDomElement2.innerText = 'Spain';
  mockDomElement2.classList.add('Opta-TeamName');

  mockDomElement3.innerText = 'Third Place Group A/B/C';
  mockDomElement3.classList.add('Opta-TeamName');

  mockDomWrapper.append(mockDomElement);
  mockDomWrapper.append(mockDomElement2);
  mockDomWrapper.append(mockDomElement3);
  mockDomContainer.append(mockDomWrapper);

  return mockDomContainer;
};


describe('addFixturesPageLink', () => {
  jest.spyOn(addFixturesPageLinkModule, 'addFixturesPageLink');

  it.only('should add link at the end of a list when valid elements are passed', async () => {
    jest.useFakeTimers();
    const container = mockAddFixturesPageLink();
    const elements = container.getElementsByClassName('Opta-Room');
    await addFixturesPageLinkModule.addFixturesPageLink(elements, 'https://www.thetimes.co.uk/sport/football/euro-2024');

    expect(addFixturesPageLinkModule.addFixturesPageLink).toHaveBeenCalledWith(elements, 'https://www.thetimes.co.uk/sport/football/euro-2024');
    jest.advanceTimersByTime(3000);
    const transformedElements = Array.from(elements);
    const anchorElement = transformedElements[transformedElements.length-1].querySelector('a') as HTMLElement;
    expect(anchorElement).toBeInstanceOf;
    expect(anchorElement.querySelector('span')?.textContent).toBe('Full Fixtures & Results');
  });
});
