import data from '../in-article-info-card';

describe('Data Structure Tests', () => {
  it('should have the correct top-level keys', () => {
    const keys = Object.keys(data);
    expect(keys).toEqual(
      expect.arrayContaining(['43603', '43606', '43614', '43961'])
    );
  });

  it('should validate the structure of fields for 43603', () => {
    const { fields } = data[43603];
    expect(fields).toEqual({
      label: 'Venezuelan Politics',
      headline: 'With a new president officially in place, what will happen?',
      size: '4042'
    });
  });

  it('should validate the body data for 43603', () => {
    const { body } = data[43603];
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('card');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          subtitle: expect.any(String),
          copy: expect.any(String)
        })
      );
    });
  });

  it('should validate the structure of fields for 43606', () => {
    const { fields } = data[43606];
    expect(fields).toEqual({
      label: 'Best places to stay',
      headline: 'The Sunday Times best British hotels',
      size: '4043',
      subtitles: 'True'
    });
  });

  it('should validate the body data for 43606', () => {
    const { body } = data[43606];
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('card');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          subtitle: expect.any(String),
          copy: expect.any(String)
        })
      );
    });
  });

  it('should validate entries with non-empty images in 43614', () => {
    const { body } = data[43614];
    body.data.forEach((item: any) => {
      expect(item.data.image).toMatch(/^https?:\/\/.+/);
      expect(item.data.subtitle).toBeTruthy();
      expect(item.data.copy).toBeTruthy();
    });
  });

  it('should validate the structure of fields for 43961', () => {
    const { fields } = data[43961];
    expect(fields).toEqual({
      label: 'Best places to stay',
      headline: 'The Sunday Times best British hotels',
      size: '4043'
    });
  });

  it('should validate the body data for 43961', () => {
    const { body } = data[43961];
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((item: any) => {
      expect(item.type).toBe('card');
      expect(item.data).toEqual(
        expect.objectContaining({
          image: expect.any(String),
          subtitle: expect.any(String),
          copy: expect.any(String)
        })
      );
    });
  });

  it('should handle entries with empty images gracefully', () => {
    const { body } = data[43603];
    body.data.forEach((item: any) => {
      if (!item.data.image) {
        expect(item.data.subtitle).toBe('');
        expect(item.data.copy).toBeTruthy();
      }
    });
  });
});
