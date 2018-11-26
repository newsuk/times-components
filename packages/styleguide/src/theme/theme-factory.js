import sectionColours, { secondarySectionColours } from "../colours/section";

const sectionColourPicker = (section, template) => {
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

  return config[template][section] || config[template].default;
};

export default (section, template) => ({
  sectionColour: sectionColourPicker(section, template)
});
