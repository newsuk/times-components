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
  const magazineSections = {
    culture: "cultureMagazine",
    Culture: "cultureMagazine",
    style: "styleMagazine",
    Style: "styleMagazine",
    "The Sunday Times Magazine": "stMagazine",
    thesundaytimesmagazine: "stMagazine"
  };

  const config = {
    indepth: magazineSections,
    magazinecomment: magazineSections,
    magazinestandard: magazineSections,
    maincomment: {},
    mainstandard: magazineSections
  };

  return config[template][section] || defaultFont;
};

export default (section, template) => ({
  dropCapFont: magazineFontPicker("dropCap", section, template),
  headlineFont: magazineFontPicker("headline", section, template),
  pullQuoteFont: magazineFontPicker("headlineRegular", section, template),
  sectionColour: sectionColourPicker(section, template)
});
