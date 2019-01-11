const fontSize = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: 110,
      medium: 90,
      xlarge: 122
    },
    dropCap: {
      large: 115,
      medium: 96,
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
      large: { bottom: -20, top: -23 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -26 }
    },
    dropCap: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -12 },
      xlarge: { bottom: -22, top: -16 }
    },
    stMagazine: {
      large: { bottom: -26, top: -22 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -24 }
    },
    styleMagazine: {
      large: { bottom: -26, top: -25 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -26 }
    }
  };

  return config[font][scale];
};

export { fontSize, margins };
