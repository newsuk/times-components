export const getStandardTemplateCrop = ({
  crop169,
  crop32,
  crop1251,
  crop11,
  crop45,
  crop23
}) => crop169 || crop32 || crop1251 || crop11 || crop45 || crop23;

export const getMagazineTemplateCrop = leadAsset =>
  leadAsset.crop2251 || getStandardTemplateCrop(leadAsset);
