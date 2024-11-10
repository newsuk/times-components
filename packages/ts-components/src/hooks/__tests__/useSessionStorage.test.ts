import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useSessionStorage } from '../useSessionStorage';

describe('useSessionStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValue';

  beforeEach(() => {
    // Clear all mocks and reset sessionStorage
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should initialize with the value from sessionStorage if available', () => {
    // Set up sessionStorage to have a stored value before the hook runs
    sessionStorage.setItem(key, JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useSessionStorage<string>(key, initialValue)
    );

    expect(result.current.value).toBe('storedValue');
  });

  it('should initialize with the initial value if sessionStorage is empty', () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>(key, initialValue)
    );

    expect(result.current.value).toBe(initialValue);
  });

  it('should update the sessionStorage and state when setItem is called', () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>(key, initialValue)
    );

    act(() => {
      result.current.setItem('newValue');
    });

    expect(result.current.value).toBe('newValue');
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });

  it('should get the current value from sessionStorage when getItem is called', () => {
    sessionStorage.setItem(key, JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useSessionStorage<string>(key, initialValue)
    );

    expect(result.current.getItem()).toBe('storedValue');
  });

  it('should remove the item from sessionStorage and reset state when removeItem is called', () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>(key, initialValue)
    );

    act(() => {
      result.current.setItem('newValue');
      result.current.removeItem();
    });

    expect(result.current.value).toBe(initialValue);
    expect(sessionStorage.getItem(key)).toBe(null);
  });

  it('should handle non-string initial values', () => {
    const numericInitialValue = 42;

    const { result } = renderHook(() =>
      useSessionStorage<number>(key, numericInitialValue)
    );

    expect(result.current.value).toBe(numericInitialValue);

    act(() => {
      result.current.setItem(100);
    });

    expect(result.current.value).toBe(100);
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify(100));
  });
});
