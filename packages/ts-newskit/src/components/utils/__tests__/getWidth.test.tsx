import { getWidth } from '../getWidth';

const mockCallback = jest.fn(el => el.clientWidth);

const testCase = {
  clientWidth: 100
};

test('forEach mock function', () => {
  mockCallback(getWidth(testCase));
  expect(mockCallback).toHaveBeenCalledWith(100);
});
