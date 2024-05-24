import '@testing-library/jest-dom';
import * as optaFn from '../replaceFlags';

const mockReplaceFlags = () => {
  const mockDomContainer = document.createElement('div');
  const mockDomElement = document.createElement('div');
  const mockDomElement2 = document.createElement('div');

  mockDomElement.innerHTML = 'Portugal';
  mockDomElement.classList.add('Opta-TeamName');

  mockDomElement2.innerHTML = 'Spain';
  mockDomElement2.classList.add('Opta-TeamName');

  mockDomContainer.append(mockDomElement);
  mockDomContainer.append(mockDomElement2);

  return mockDomContainer;
};

describe('replaceFlags', () => {
  jest.spyOn(optaFn, 'replaceFlags');

  it('should replace images when valid elements are passed', async () => {
    jest.useFakeTimers();
    const container = mockReplaceFlags();
    const elements = container.getElementsByClassName('Opta-TeamName');
    const replaceFlags = await optaFn.replaceFlags(elements);

    expect(optaFn.replaceFlags).toHaveBeenCalledWith(elements);
    jest.advanceTimersByTime(3000);
    expect(replaceFlags).toBe(undefined);
    const transformedElements = Array.from(elements);
    expect(transformedElements[0].querySelector('img')).toBeInstanceOf;
    expect(transformedElements[0]).toHaveTextContent('Portugal');
    expect(transformedElements[1].querySelector('img')).toBeInstanceOf;
    expect(transformedElements[1]).toHaveTextContent('Spain');
  });
});
