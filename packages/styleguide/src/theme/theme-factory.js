import sectionColours, { secondarySectionColours } from "../colours/section";
import fonts from "../fonts/fonts";

const sectionColourPicker = (
  section = "default",
  template = "mainstandard"
) => {
  const config = {
    indepth: {
      ...sectionColours,
      ...secondarySectionColours
    },
    magazinecomment: {
      ...sectionColours,
      ...secondarySectionColours
    },
    magazinestandard: {
      ...sectionColours,
      ...secondarySectionColours
    },
    maincomment: {
      ...sectionColours
    },
    mainstandard: {
      ...sectionColours
    }
  };

  return config[template][section];
};

const magazineFontPicker = (
  defaultFont,
  section = "default",
  template = "mainstandard"
) => {
  const config = {
    indepth: {
      culture: fonts.cultureMagazine,
      style: fonts.styleMagazine,
      thesundaytimesmagazine: fonts.stMagazine
    },
    magazinecomment: {
      culture: fonts.cultureMagazine,
      style: fonts.styleMagazine,
      thesundaytimesmagazine: fonts.stMagazine
    },
    magazinestandard: {
      culture: fonts.cultureMagazine,
      style: fonts.styleMagazine,
      thesundaytimesmagazine: fonts.stMagazine
    },
    maincomment: {},
    mainstandard: {
      culture: fonts.cultureMagazine,
      style: fonts.styleMagazine,
      thesundaytimesmagazine: fonts.stMagazine
    }
  };

  return config[template][section] || defaultFont;
};

export default (section, template) => ({
  dropCapFont: magazineFontPicker(fonts.dropCap, section, template),
  headlineFont: magazineFontPicker(fonts.headline, section, template),
  pullQuoteFont: magazineFontPicker(fonts.headlineRegular, section, template),
  sectionColour: sectionColourPicker(section, template)
});
