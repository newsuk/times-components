import { renderHook } from '@testing-library/react-hooks';
import { useConsent } from '../useConsent';

describe('useConsent hook', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('should return the initial state correctly', () => {
    const { result } = renderHook(() => useConsent());
    const [
      isSocialEmbedAllowed,
      setIsSocialEmbedAllowed,
      isAllowedOnce
    ] = result.current;

    expect(isSocialEmbedAllowed).toBe(false);
    expect(isAllowedOnce).toBe(false);
    expect(typeof setIsSocialEmbedAllowed).toBe('function');
  });

  it('should update isAllowedOnce to false if consentedVendors do not exist', () => {
    const { result } = renderHook(() => useConsent());
    expect(result.current[2]).toBe(false); // isAllowedOnce should be false
  });

  it('should clean up storage event listener on unmount', () => {
    const { unmount } = renderHook(() => useConsent());

    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function)
    );
  });
});
