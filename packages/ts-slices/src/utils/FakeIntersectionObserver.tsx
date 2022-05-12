type MockCallbackType = (props: Array<{ isIntersecting: boolean }>) => {};

class FakeIntersectionObserver {
  static callback: MockCallbackType;
  static observe = jest.fn();
  static disconnect = jest.fn();

  static intersect(isIntersecting = true): void {
    FakeIntersectionObserver.callback([{ isIntersecting }]);
  }

  observe = FakeIntersectionObserver.observe;
  disconnect = FakeIntersectionObserver.disconnect;

  constructor(callback: MockCallbackType) {
    FakeIntersectionObserver.callback = callback;
  }
}

export default FakeIntersectionObserver;
