const resizeMap = [760, 660, 560, 480, 380, 320, 270, 230, 180, 120, 80];

const getResizeWidth = (minWidth: number) =>
  resizeMap.reduce(
    (acc, width) => (minWidth <= width ? width : acc),
    resizeMap[0]
  );

const getResizeImage = (url: string, width: number) => {
  const resizeWidth = getResizeWidth(width);
  const resize = resizeWidth * window.devicePixelRatio;

  const api = new URL(url);
  const params = new URLSearchParams(api.search.slice(1));
  params.set('resize', resize.toString());

  const origin =
    api.origin === 'https://www.uat-thetimes.co.uk'
      ? 'https://www.thetimes.co.uk'
      : api.origin;

  return `${origin}${api.pathname}?${params.toString()}`;
};

export const resizeImage = (url: string, width: number) =>
  url.includes('thetimes.co.uk/imageserver') ? getResizeImage(url, width) : url;
