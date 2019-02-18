const fontSize = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: 110,
      medium: 90,
      xlarge: 122
    },
    dropCap: {
      large: 115,
      medium: 100,
      xlarge: 124
    },
    stMagazine: {
      large: 113,
      medium: 90,
      xlarge: 120
    },
    styleMagazine: {
      large: 112,
      medium: 90,
      xlarge: 119
    }
  };

  return config[font][scale];
};

const margins = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: { bottom: -32, top: -30 },
      medium: { bottom: -30, top: -26 },
      xlarge: { bottom: -28, top: -38 }
    },
    dropCap: {
      large: { bottom: -33, top: -14 },
      medium: { bottom: -22, top: -12 },
      xlarge: { bottom: -34, top: -16 }
    },
    stMagazine: {
      large: { bottom: -26, top: -17 },
      medium: { bottom: -30, top: -16 },
      xlarge: { bottom: -22, top: -18 }
    },
    styleMagazine: {
      large: { bottom: -26, top: -26 },
      medium: { bottom: -30, top: -18 },
      xlarge: { bottom: -30, top: -26 }
    }
  };

  return config[font][scale];
};

export { fontSize, margins };
