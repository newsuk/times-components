const paths = [
  'thetimes.co.uk/imageserver',
  'thetimes.co.uk/tto/archive/frame',
  /thetimes\.co\.uk\/([a-z0-9-]+\/)+[a-z0-9-]+-([bcdfghjklmnpqrstvwxz23567890]{9,11}$)/g,
];

const subdomains = [/login.(.*?)thetimes.co.uk/g];

export const getDomainSpecificUrl = (host, url) => {
  if (host.includes('thetimes.com')) {
      if ([...paths, ...subdomains].some((match) => url.match(match))) {
          return url.replace('.co.uk', '.com');
      }
  }

  return url;
};
