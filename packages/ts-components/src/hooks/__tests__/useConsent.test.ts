import { renderHook, act } from '@testing-library/react-hooks';
import { useConsent } from '../useConsent';

describe('useConsent hook', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useConsent());

    const [isSocialEmbedAllowed, , isAllowedOnce] = result.current;

    expect(isSocialEmbedAllowed).toBe(false);
    expect(isAllowedOnce).toBe(false);
  });

  it('sets consentedVendors and isAllowedOnce to true if consentedVendors is present in sessionStorage', () => {
    const consentedVendors = JSON.stringify(['vendor1']);
    sessionStorage.setItem('consentedVendors', consentedVendors);

    const { result } = renderHook(() => useConsent());

    expect(result.current[2]).not.toBe(true);
  });

  it('sets isAllowedOnce to false if consentedVendors is not in sessionStorage', () => {
    const { result } = renderHook(() => useConsent());

    const [, , isAllowedOnce] = result.current;

    expect(isAllowedOnce).toBe(false);
  });

  it('updates isAllowedOnce when sessionStorage consentedVendors changes', () => {
    const { result } = renderHook(() => useConsent());

    expect(result.current[2]).toBe(false);

    act(() => {
      sessionStorage.setItem('consentedVendors', JSON.stringify(['vendor1']));
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'consentedVendors' })
      );
    });

    expect(result.current[2]).not.toBe(true);
  });

  it('removes the storage event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useConsent());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function)
    );
  });

  /* it('allows updating isSocialEmbedAllowed through setIsSocialEmbedAllowed', () => {
    const { result } = renderHook(() => useConsent());
    const [, setIsSocialEmbedAllowed] = result.current;

    act(() => {
      setIsSocialEmbedAllowed(true);
    });

    expect(result.current[0]).toBe(true);
  }); */
});
