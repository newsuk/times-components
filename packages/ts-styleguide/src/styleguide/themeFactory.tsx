import { sectionColours, secondarySectionColours } from './colours/section';

const sectionColourPickerConfig: Record<string, Record<string, string>> = {
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
  },
  takeoverpage: {}
};

const magazineSections: Record<string, string> = {
  culture: 'cultureMagazine',
  Culture: 'cultureMagazine',
  style: 'styleMagazine',
  Style: 'styleMagazine',
  'The Sunday Times Magazine': 'stMagazine',
  thesundaytimesmagazine: 'stMagazine',
  'the sunday times magazine': 'stMagazine'
};

const magazineSectionsConfig: Record<string, Record<string, string>> = {
  indepth: magazineSections,
  magazinecomment: magazineSections,
  magazinestandard: magazineSections,
  maincomment: {},
  mainstandard: {},
  takeoverpage: {}
};

type ValueOf<T> = T[keyof T];

const sectionColourPicker = (
  section: keyof ValueOf<typeof sectionColourPickerConfig>,
  template: keyof typeof sectionColourPickerConfig
) => {
  return sectionColourPickerConfig[template][section];
};

const magazineFontPicker = (
  defaultFont: string,
  section: keyof ValueOf<typeof sectionColourPickerConfig>,
  template: keyof typeof magazineSectionsConfig
) => {
  return magazineSectionsConfig[template][section] || defaultFont;
};

const headlineCasePicker = (
  section: keyof typeof magazineSectionsConfig,
  template: keyof typeof magazineSectionsConfig
) =>
  section &&
  section.toLowerCase() === 'style' &&
  ['indepth', 'magazinestandard', 'magazinecomment'].includes(template)
    ? 'none'
    : null;

export default (
  sectionParam?: keyof typeof magazineSectionsConfig,
  templateParam?: keyof typeof magazineSectionsConfig
) => {
  const section = sectionParam || 'default';
  const template = templateParam || 'mainstandard';

  return {
    dropCapFont: magazineFontPicker('dropCap', section, template),
    headlineFont: magazineFontPicker('headline', section, template),
    pullQuoteFont: magazineFontPicker('headlineRegular', section, template),
    sectionColour: sectionColourPicker(section, template),
    headlineCase: headlineCasePicker(section, template)
  };
};
