import sectionColours, { secondarySectionColours } from "../colours/section";

const sectionColourPicker = (
  section = "default",
  template = "mainstandard"
) => {
  const config = {
    indepth: {},
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

const headlineCasePicker = (section = "default", template = "mainstandard") =>
  section &&
  section.toLowerCase() === "style" &&
  ["indepth", "magazinestandard", "magazinecomment"].includes(template)
    ? "uppercase"
    : null;

const imageCaptionAlignment = {
  indepth: { primary: "center" }
};

export default (section, template) => ({
  dropCapFont: magazineFontPicker("dropCap", section, template),
  headlineFont: magazineFontPicker("headline", section, template),
  imageCaptionAlignment: imageCaptionAlignment[template] || {},
  pullQuoteFont: magazineFontPicker("headlineRegular", section, template),
  sectionColour: sectionColourPicker(section, template),
  headlineCase: headlineCasePicker(section, template)
});
