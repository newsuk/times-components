import '@testing-library/jest-dom';
import * as optaFn from '../replaceNationalTeamDetails';

const mockReplaceNationalTeamDetails = () => {
  const mockDomContainer = document.createElement('div');
  const mockDomElement = document.createElement('div');
  const mockDomElement2 = document.createElement('div');
  const mockDomElement3 = document.createElement('div');

  mockDomElement.innerText = 'Portugal';
  mockDomElement.classList.add('Opta-TeamName');

  mockDomElement2.innerText = 'Spain';
  mockDomElement2.classList.add('Opta-TeamName');

  mockDomElement3.innerText = 'Third Place Group A/B/C';
  mockDomElement3.classList.add('Opta-TeamName');

  mockDomContainer.append(mockDomElement);
  mockDomContainer.append(mockDomElement2);
  mockDomContainer.append(mockDomElement3);

  return mockDomContainer;
};

describe('isNationalCompetition', () => {
  jest.spyOn(optaFn, 'isNationalCompetition');

  it('should return TRUE if is in array of national competitions', async () => {
    const isNationalCompetition = optaFn.isNationalCompetition('3');
    expect(optaFn.isNationalCompetition).toHaveBeenCalledWith('3');
    expect(isNationalCompetition).toBe(true);
  });

  it('should return FALSE if is in array of national competitions', async () => {
    const isNationalCompetition = optaFn.isNationalCompetition('8');
    expect(optaFn.isNationalCompetition).toHaveBeenCalledWith('8');
    expect(isNationalCompetition).toBe(false);
  });
});

describe('replaceWithTBD', () => {
  jest.spyOn(optaFn, 'replaceWithTBD');

  it('should replace images when valid elements are passed', async () => {
    jest.useFakeTimers();
    const container = mockReplaceNationalTeamDetails();
    const elements = container.getElementsByClassName('Opta-TeamName');
    const replaceWithTBD = await optaFn.replaceWithTBD(elements);

    expect(optaFn.replaceWithTBD).toHaveBeenCalledWith(elements);
    jest.advanceTimersByTime(3000);
    expect(replaceWithTBD).toBe(undefined);
    const transformedElements = Array.from(elements);
    expect(transformedElements[0].querySelector('img')).toBeInstanceOf;
    expect((transformedElements[0] as HTMLElement).innerText).toBe('Portugal');
    expect(transformedElements[1].querySelector('img')).toBeInstanceOf;
    expect((transformedElements[1] as HTMLElement).innerText).toBe('Spain');
  });

  it('should replace text when TeamName includes `Third Place` string', async () => {
    jest.useFakeTimers();
    const container = mockReplaceNationalTeamDetails();
    const elements = container.getElementsByClassName('Opta-TeamName');
    const replaceWithTBD = await optaFn.replaceWithTBD(elements);

    expect(optaFn.replaceWithTBD).toHaveBeenCalledWith(elements);
    jest.advanceTimersByTime(3000);
    expect(replaceWithTBD).toBe(undefined);
    const transformedElements = Array.from(elements);
    expect(transformedElements[2].querySelector('img')).not.toBeInstanceOf;
    expect((transformedElements[2] as HTMLElement).innerText).toBe('TBD');
  });
});
