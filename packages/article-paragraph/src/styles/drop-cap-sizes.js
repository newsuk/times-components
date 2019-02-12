const fontSize = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: 110,
      medium: 90,
      xlarge: 122
    },
    dropCap: {
      large: 115,
      medium: 105,
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
      large: { bottom: -20, top: 0 },
      medium: { bottom: -30, top: 0 },
      xlarge: { bottom: -22, top: 0 }
    },
    dropCap: {
      large: { bottom: -32, top: 4 },
      medium: { bottom: -30, top: 0 },
      xlarge: { bottom: -34, top: 4 }
    },
    stMagazine: {
      large: { bottom: -26, top: 0 },
      medium: { bottom: -30, top: 0 },
      xlarge: { bottom: -22, top: 0 }
    },
    styleMagazine: {
      large: { bottom: -26, top: 0 },
      medium: { bottom: -30, top: 0 },
      xlarge: { bottom: -22, top: 0 }
    }
  };

  return config[font][scale];
};

export { fontSize, margins };
