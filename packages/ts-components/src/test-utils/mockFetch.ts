export const mockFetch = (mockResponse: any) => {
  (global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse)
    })
  );
};
