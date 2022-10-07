export const capitaliseFirstCharacter = (stringToCapitalise?: string) => {
  if (!stringToCapitalise) {
    return;
  }

  const firstCharacter = stringToCapitalise.charAt(0);
  const restOfString = stringToCapitalise.split(firstCharacter);
  return `${firstCharacter.toUpperCase()}${restOfString[1]}`;
};
