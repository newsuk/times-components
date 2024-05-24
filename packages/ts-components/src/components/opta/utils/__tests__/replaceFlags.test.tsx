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

// beforeAll(() => {
//   spy = jest.spyOn(document, 'getElementById');
// });

// describe('activeListItem', () => {
//   describe('with found element', () => {
//     let mockElement;
//     beforeAll(() => {
//       // Here you create the element that the document.createElement will return
//       // It might be even without an id
//       mockElement = document.createElement(....);
//       spy.mockReturnValue(mockElement);
//     });

//     // And then you could expect it to have the background
//     it('should have the background applied', () => {
//       expect(mockElement.style.backgroundColor).toBe('#ededed');
//     });
//   });

//   describe('without found element', () => {
//     // And here you can create a scenario
//     // When document.createElement returns null
//     beforeAll(() => {
//       spy.mockReturnValue(null);
//     });

//     // And expect you function not to throw an error
//     it('should not throw an error', () => {
//       expect(() => activeListItem({id:'123'})).not.toThrow();
//     });
//   });
// });
