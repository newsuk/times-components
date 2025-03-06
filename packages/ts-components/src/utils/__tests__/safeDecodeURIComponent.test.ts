import safeDecodeURIComponent from '../safeDecodeURIComponent';

describe('safeDecodeURIComponent', () => {
  it('will return the decoded URI if it is correctly encoded', () => {
    const URI = safeDecodeURIComponent('This%20Is%20A%20Test%20URI');
    expect(URI).toEqual('This Is A Test URI');
  });
  it('will return the encoded URI if it is incorrectly encoded', () => {
    const URI = safeDecodeURIComponent('This%Is%A%Test%URI');
    expect(URI).toEqual('This%Is%A%Test%URI');
  });
});
