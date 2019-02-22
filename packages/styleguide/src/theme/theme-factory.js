import sectionColours, { secondarySectionColours } from "../colours/section";

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
    mainstandard: {}
  };

  return config[template][section] || defaultFont;
};

const imageCaptionAlignmentPicker = template => {
  if (template === "indepth") {
    return { primary: "center" };
  }

  return {};
};

export default (section, template) => ({
  dropCapFont: magazineFontPicker("dropCap", section, template),
  headlineFont: magazineFontPicker("headline", section, template),
  imageCaptionAlignment: imageCaptionAlignmentPicker(template),
  pullQuoteFont: magazineFontPicker("headlineRegular", section, template),
  sectionColour: sectionColourPicker(section, template)
});
