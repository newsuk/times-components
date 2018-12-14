const fontSize = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: 115,
      medium: 90,
      xlarge: 124
    },
    dropCap: {
      large: 115,
      medium: 96,
      xlarge: 124
    },
    stMagazine: {
      large: 115,
      medium: 90,
      xlarge: 124
    },
    styleMagazine: {
      large: 115,
      medium: 90,
      xlarge: 124
    }
  };

  return config[font][scale];
};

const margins = (font, scale) => {
  const config = {
    cultureMagazine: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -16 }
    },
    dropCap: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -12 },
      xlarge: { bottom: -22, top: -16 }
    },
    stMagazine: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -16 }
    },
    styleMagazine: {
      large: { bottom: -26, top: -14 },
      medium: { bottom: -30, top: -17 },
      xlarge: { bottom: -22, top: -16 }
    }
  };

  return config[font][scale];
};

export { fontSize, margins };
