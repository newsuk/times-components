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
      ...sectionColours
    },
    magazinestandard: {
      ...sectionColours
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

export default (section, template) => ({
  sectionColour: sectionColourPicker(section, template)
});
