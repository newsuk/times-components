import { TestFont } from '@times-components/test-utils';
import { BoxExclusion, FontStorage } from '../src';
import AttributedString from '../src/AttributedString';
import LayoutManager from '../src/LayoutManager';
import TextContainer from '../src/TextContainer';
import { makeAttribute } from './AttributedString.test';

const testText = `Lorem Ipsum is simply dummy text of the \n printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

FontStorage.registerFont('TimesDigitalW04-Normal', () => TestFont);

const testString = new AttributedString(testText, [
  makeAttribute(0, testText.length)
]);
const testContainer = new TextContainer(100, 100, 0, 0);

test('LayoutManager#constructor()', () => {
  expect(() => {
    const manager = new LayoutManager(testString, [testContainer]);
    return manager;
  }).not.toThrow();
});

test('LayoutManager#layout(false, false)', () => {
  const manager = new LayoutManager(
    testString,
    [testContainer],
    [new BoxExclusion(0, 0, 50, 0)]
  );
  expect(manager.layout(false, false)).toMatchSnapshot();
});

test('bad font attribute', () => {
  const testString2 = new AttributedString(testText, []);
  const manager = new LayoutManager(testString2, [testContainer]);
  expect(() => manager.layout(false, false)).toThrow();
});

test('LayoutManager#layout(true, false)', () => {
  const manager = new LayoutManager(testString, [testContainer]);
  expect(manager.layout(true, false)).toMatchSnapshot();
});

test('LayoutManager#layout(true, true)', () => {
  const manager = new LayoutManager(testString, [testContainer]);
  expect(manager.layout(true, true)).toMatchSnapshot();
});

test('LayoutManager#layout(false, true)', () => {
  const manager = new LayoutManager(testString, [testContainer]);
  expect(manager.layout(false, true)).toMatchSnapshot();
});
