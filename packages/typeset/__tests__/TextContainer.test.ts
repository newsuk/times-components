import BoxExclusion from '../src/BoxExclusion';
import TextContainer from '../src/TextContainer';

test('TextContainer#constructor', () => {
  expect(() => {
    const newContainer = new TextContainer(10, 10, 10, 10);
    return newContainer;
  }).not.toThrow();
});

test('TextContainer#calculateSpans(number)', () => {
  const container = new TextContainer(100, 100, 0, 0);
  expect(container.calculateSpans(30)).toMatchSnapshot();
  expect(container.calculateSpans(30)).toMatchSnapshot();
});

test('TextContainer(exclusions)#calculateSpans(number)', () => {
  const container = new TextContainer(100, 100, 0, 0);
  container.addExclusion(new BoxExclusion(0, 0, 50, 50));
  expect(container.calculateSpans(30)).toMatchSnapshot();
});

test('TextContainer(exclusions)#calculateSpans(number)', () => {
  const container = new TextContainer(200, 100, 0, 0);
  container.addExclusion(new BoxExclusion(0, 0, 50, 50));
  container.addExclusion(new BoxExclusion(100, 0, 50, 50));
  expect(container.calculateSpans(30)).toMatchSnapshot();
});
