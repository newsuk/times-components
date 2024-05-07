const paths = [
  "thetimes.co.uk/imageserver",
  "thetimes.co.uk/tto/archive/frame",
  "thetimes.co.uk/assets/optimizely/custom",
  /thetimes\.co\.uk\/([a-z0-9-]+\/)+[a-z0-9-]+-([bcdfghjklmnpqrstvwxz23567890]{9,11}$)/g
];

const subdomains = [/home.(.*?)thetimes.co.uk/g, /login.(.*?)thetimes.co.uk/g];

const getDomainSpecificUrl = (host, url) => {
  if (host.includes("thetimes.com")) {
    if ([...paths, ...subdomains].some(match => url.match(match))) {
      return url.replace(".co.uk", ".com");
    }
  }

  return url;
};

export default getDomainSpecificUrl;
