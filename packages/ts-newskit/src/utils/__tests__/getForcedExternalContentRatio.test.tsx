import { getForcedExternalContentRatio } from '../index';

describe('getForcedExternalContentRatio', () => {
  const IMAGE = {
    url: 'test.com',
    ratio: '*'
  };

  it('returns forced ratio', () => {
    expect(getForcedExternalContentRatio(IMAGE, '1:1')).toStrictEqual({
      aspectRatio: '1/1',
      ratio: '1:1'
    });
  });

  it('returns forced ratio', () => {
    expect(getForcedExternalContentRatio(IMAGE, '3:2')).toStrictEqual({
      aspectRatio: '3/2',
      ratio: '3:2'
    });
  });
});
