import PositionedItem from '../src/PositionedItem';

test('PositionedItem#constructor', () => {
  expect(() => {
    const newItem = new PositionedItem({} as any, {} as any);
    return newItem;
  }).not.toThrow();
});
