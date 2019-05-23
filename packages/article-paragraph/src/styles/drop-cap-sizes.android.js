const fontSize = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: 110,
      medium: 100,
      xlarge: 122
    },
    dropCap: {
      large: 115,
      medium: 110,
      xlarge: 124
    },
    stMagazine: {
      large: 100,
      medium: 100,
      xlarge: 110
    },
    styleMagazine: {
      large: 112,
      medium: 100,
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
      xlarge: { bottom: -22, top: -28 }
    },
    dropCap: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -16 }
    },
    stMagazine: {
      large: { bottom: -26, top: -19 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -19 }
    },
    styleMagazine: {
      large: { bottom: -26, top: -25 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -28 }
    }
  };

  return config[font][scale];
};

export { fontSize, margins };
