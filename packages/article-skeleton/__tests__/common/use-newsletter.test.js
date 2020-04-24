import { renderHook, act } from "@testing-library/react-hooks";

import { useNewsletter } from "../../src/hooks/use-newsletter";

const mockResponse = jest.fn().mockImplementation(async () => ({
  data: { newsletter: {}, subscribeNewsletter: {} }
}));

global.fetch = jest.fn().mockImplementation(async () => ({
  json: mockResponse
}));

describe("useNewsletter", () => {
  test("should get newsletter on load", async () => {
    mockResponse.mockImplementationOnce(async () => ({
      data: { newsletter: { isSubscribed: true } }
    }));

    const { result, waitForNextUpdate } = renderHook(useNewsletter);
    expect(result.current).toEqual(
      expect.objectContaining({
        loading: true,
        isSubscribed: undefined,
        isSubscribedOnLoad: undefined
      })
    );

    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        loading: false,
        isSubscribed: true,
        isSubscribedOnLoad: true
      })
    );
  });

  test("should subscribe to newsletter", async () => {
    mockResponse.mockImplementationOnce(async () => ({
      data: { newsletter: { isSubscribed: false } }
    }));

    const { result, waitForNextUpdate } = renderHook(useNewsletter);

    expect(result.current).toEqual(
      expect.objectContaining({
        subscribing: false,
        isSubscribed: undefined,
        isSubscribedOnLoad: undefined
      })
    );

    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        subscribing: false,
        isSubscribed: false,
        isSubscribedOnLoad: false
      })
    );

    mockResponse.mockImplementationOnce(async () => ({
      data: { subscribeNewsletter: { isSubscribed: true } }
    }));

    act(() => {
      result.current.subscribeNewsletter();
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        subscribing: true,
        isSubscribed: false,
        isSubscribedOnLoad: false
      })
    );

    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        subscribing: false,
        isSubscribed: true,
        isSubscribedOnLoad: false
      })
    );
  });
});
