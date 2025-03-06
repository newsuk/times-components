const primaryColoursBase = {
  artsfeatures: '#622956',
  bricksmortar: '#006469',
  business: '#005B8D',
  comment: '#850029',
  culture: '#7B0046',
  default: '#1D1D1B',
  defcon: '#FF1D25',
  driving: '#C04605',
  focus: '#CC0000',
  gardening: '#00313B',
  home: '#8D724D',
  ireland: '#004E45',
  law: '#691D26',
  money: '#006A74',
  news: '#13354E',
  newsreview: '#004D6D',
  puzzle: '#C74600',
  register: '#6C6C69',
  saturdayreview: '#A31D24',
  scotland: '#00233E',
  sport: '#008347',
  style: '#BC3385',
  techgames: '#1A1F24',
  thedish: '#DB133B',
  thegame: '#006469',
  thesundaytimesmagazine: '#1D1D1D',
  thetimesmagazine: '#1D1D1D',
  times2: '#622956',
  todaysmagazines: '#1D1D1B',
  travel: '#2C79AD',
  weekend: '#05829A',
  world: '#636C17'
};

const primaryColours = {
  'Arts & Features': primaryColoursBase.artsfeatures,
  'Bricks & Mortar': primaryColoursBase.bricksmortar,
  Business: primaryColoursBase.business,
  Comment: primaryColoursBase.comment,
  Culture: primaryColoursBase.culture,
  Driving: primaryColoursBase.driving,
  Focus: primaryColoursBase.focus,
  Gardening: primaryColoursBase.gardening,
  Home: primaryColoursBase.home,
  Ireland: primaryColoursBase.ireland,
  Law: primaryColoursBase.law,
  Money: primaryColoursBase.money,
  News: primaryColoursBase.news,
  'News Review': primaryColoursBase.newsreview,
  Puzzles: primaryColoursBase.puzzle,
  Register: primaryColoursBase.register,
  'Saturday Review': primaryColoursBase.saturdayreview,
  Scotland: primaryColoursBase.scotland,
  Sport: primaryColoursBase.sport,
  Style: primaryColoursBase.style,
  'Tech & Games': primaryColoursBase.techgames,
  'The Dish': primaryColoursBase.thedish,
  'The Game': primaryColoursBase.thegame,
  'The Sunday Times Magazine': primaryColoursBase.thesundaytimesmagazine,
  'The Times Magazine': primaryColoursBase.thetimesmagazine,
  Times2: primaryColoursBase.times2,
  "Today's Magazines": primaryColoursBase.todaysmagazines,
  Travel: primaryColoursBase.travel,
  Weekend: primaryColoursBase.weekend,
  World: primaryColoursBase.world
};

const secondaryColoursBase = {
  thesundaytimesmagazine: '#F13D00'
};

const secondaryColours = {
  'The Sunday Times Magazine': secondaryColoursBase.thesundaytimesmagazine
};

export const sectionColours = { ...primaryColoursBase, ...primaryColours };
export const secondarySectionColours = {
  ...secondaryColoursBase,
  ...secondaryColours
};
