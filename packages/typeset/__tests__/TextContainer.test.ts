import BoxExclusion from '../src/BoxExclusion';
import TextContainer from '../src/TextContainer';

const getAllSpans = (container: TextContainer, leading: number) => {
  let span = container.nextSpan(leading);
  const results = [];
  while (span) {
    results.push(span);
    span = container.nextSpan(leading);
  }
  return results;
};

test('TextContainer#constructor', () => {
  expect(() => {
    const newContainer = new TextContainer(10, 10, 10, 10);
    return newContainer;
  }).not.toThrow();
});

test('TextContainer#calculateSpans(number)', () => {
  const container = new TextContainer(100, 100, 0, 0);
  expect(getAllSpans(container, 30)).toMatchSnapshot();
  expect(getAllSpans(container, 30)).toMatchSnapshot();
});

test('TextContainer(exclusions)#calculateSpans(number)', () => {
  const container = new TextContainer(100, 100, 0, 0);
  container.addExclusion(new BoxExclusion(0, 0, 50, 50));
  expect(getAllSpans(container, 30)).toMatchSnapshot();
});

test('TextContainer(exclusions)#calculateSpans(number)', () => {
  const container = new TextContainer(200, 100, 0, 0);
  container.addExclusion(new BoxExclusion(0, 0, 50, 50));
  container.addExclusion(new BoxExclusion(100, 0, 50, 50));
  expect(getAllSpans(container, 30)).toMatchSnapshot();
});
