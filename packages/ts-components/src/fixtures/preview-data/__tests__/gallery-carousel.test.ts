import data from '../gallery-carousel';

describe('Data Structure Tests', () => {
  it('should have the correct keys', () => {
    const keys = Object.keys(data);
    expect(keys).toEqual(expect.arrayContaining(['43434', '43484', '43486']));
  });

  it('should have the correct fields structure for 43434', () => {
    const { fields } = data[43434];
    expect(fields).toEqual({
      label: expect.any(String),
      headline: expect.any(String),
      size: expect.any(String)
    });
  });

  it('should have the correct body structure for 43434', () => {
    const { body } = data[43434];
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('image');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          credit: expect.any(String),
          title: expect.any(String),
          copy: expect.any(String),
          imageTitle: expect.any(String)
        })
      );
    });
  });

  it('should validate the data for 43484', () => {
    const { fields, body } = data[43484];
    expect(fields).toEqual({
      label: 'Swimming Pools',
      headline: 'The Sunday Times Best Swimming Pools',
      size: '4034'
    });
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('image');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          credit: expect.any(String),
          imageTitle: expect.any(String),
          copy: expect.any(String)
        })
      );
    });
  });

  it('should validate the data for 43486', () => {
    const { fields, body } = data[43486];
    expect(fields).toEqual({
      label: 'Profile',
      headline: 'David Attenborough: life on screen',
      size: '4035'
    });
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('image');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          credit: expect.any(String),
          imageTitle: expect.any(String),
          copy: expect.any(String)
        })
      );
    });
  });
});
