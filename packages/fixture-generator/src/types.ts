/* tslint:disable */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

/** Text or structured bylines for one or more authors */
export type ArticleByline = any;

/** A lower kebab case string */
export type Slug = any;

/** An AST representing cross platform UI */
export type Markup = any;

/** Represents a UUID */
export type Uuid = any;

/** Two floats colon delimited as a string */
export type Ratio = any;

/** Represents a URL */
export type Url = any;

/** Represents a date and time of day in ISO 8601 */
export type DateTime = any;

/** Represents a date and time of day in ISO 8601 */
export type ShortDate = any;

/** An dictionary of string-based key-value pairs */
export type Dictionary = any;

/** An AST representing cross platform UI */
export type RichText = any;

/** Unit interval type (0-1 decimal range) */
export type UnitInterval = any;

/** Tiny integer (range of 0-255) */
export type TinyInt = any;

// ====================================================
// Interfaces
// ====================================================

/** A selection of template types that have opinions over how they should be presented. Usually used within the context of an associated list of articles */
export interface Layout {
  template?: Template | null;
}

export interface ArticleSlice {
  items: Tile[];
}

export interface Section {
  id: Uuid;

  title: string;

  slug: Slug;

  colour: Colour;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** A list of authors */
  author?: Author | null;

  authors?: (Author | null)[] | null;

  article?: Article | null;

  articles?: Articles | null;

  edition?: Edition | null;

  editions?: EditionsPaged | null;

  section?: Section | null;

  sports: Sport[];

  sportCompetition?: SportCompetition | null;

  topic?: Topic | null;
  /** The currently authenticated user */
  viewer?: User | null;
}
/** An author of a piece of writing */
export interface Author {
  id: string;

  articles?: AuthorArticles | null;

  biography?: Markup | null;
  /** URL for the image of an author */
  image?: Url | null;

  jobTitle?: string | null;
  /** The name of the author */
  name: string;
  /** Some authors have poor article lead assets, this flag denotes that the lead assets are useful for presentation purposes */
  hasLeadAssets?: boolean | null;
  /** Twitter handle for an author (can be an empty string) */
  twitter?: string | null;

  slug?: Slug | null;
}

export interface AuthorArticles {
  /** The number of articles written by an author */
  count?: number | null;
  /** List of articles written by an author */
  list?: (Article | null)[] | null;
}

export interface Article {
  /** An AST of one or more authors that may contain job titles and/or locations */
  byline?: Markup | null;
  /** Text or structured bylines for one or more authors */
  bylines?: ArticleByline | null;
  /** The content for the article in the shape of an AST */
  content?: Markup | null;
  /** The paywalled content for the article in the shape of an AST. After the free content, the rest of the markup is wrapped in a paywall element to allow flexible sampling to work with a classname */
  paywalledContent?: Markup | null;
  /** A list of time dependent with pair dependencies */
  flags?: (Flag | null)[] | null;
  /** Whether or not the article contains a video (as a lead asset or an inline video, or both) */
  hasVideo?: boolean | null;
  /** A longer SEO headline. Note this might not be populated so please use 'shortHeadline' as a fallback. */
  headline?: string | null;

  id: Uuid;
  /** A user specific flag that indicates whether the article has been bookmarked (saved) by the user. This property can only be accessed by logged in users. */
  isBookmarked?: boolean | null;
  /** A free piece of text to describe an article */
  label?: string | null;
  /** A flag set outside of the commenting system, usually used for controversial articles */
  commentsEnabled?: boolean | null;

  commentCount?: number | null;
  /** A rarely populated field that is a list of free text such as ["luxury", "ferrari"] */
  commercialTags?: (string | null)[] | null;
  /** A field that is populated from the article headline, a string delineated with commas such as ["this", "is", "a", "headline"] */
  keywords: string[];
  /** A shorter headline useful for when space is at a premium. Note this may return null so please use `headline` field as a fallback. */
  shortHeadline?: string | null;
  /** Hashed version of the article identifier */
  shortIdentifier?: string | null;
  /** The name of the segment that the article appears in, for example Sport in a newspaper */
  section?: SectionName | null;
  /** A field that is a list of free text for commercial section tags */
  commercialSectionTags?: string[] | null;

  leadAsset?: Media | null;

  listingAsset?: Media | null;

  publicationName: PublicationName;

  publishedTime?: DateTime | null;

  updatedTime?: DateTime | null;
  /** Curated list of articles selected by editorial that appear at the end of an article */
  relatedArticles?: (Article | null)[] | null;
  /** Presentational information on how the related articles should be displayed */
  relatedArticlesLayout?: Layout | null;
  /** Related article slice */
  relatedArticleSlice?: ArticleSlice | null;
  /** Customisable field in the CMS, that is by default a slugified version of the article title */
  slug?: string | null;
  /** A brief introductory summary, typically appearing immediately after the headline and typographically distinct from the rest of the article */
  standfirst?: string | null;
  /** A predefined truncated version of the article with a max length of the teaser, can optionally choose a shorter length. Use this to avoid ACS. */
  summary?: Markup | null;

  title?: string | null;
  /** Topics that the requested article belong to */
  topics?: (Topic | null)[] | null;

  url?: Url | null;

  template?: TemplateType | null;
}

export interface Image {
  id: Uuid;

  title?: string | null;

  caption?: string | null;

  credits?: string | null;

  crop?: Crop | null;

  crops: Crop[];
}
/** The selected area for a given image and its ratio */
export interface Crop {
  ratio?: Ratio | null;

  url?: Url | null;
}

export interface Video {
  id: Uuid;

  caption?: string | null;

  brightcovePolicyKey?: string | null;

  brightcovePlayerId?: string | null;

  brightcoveVideoId?: string | null;

  paidOnly?: boolean | null;

  skySports?: boolean | null;

  brightcoveAccountId?: string | null;

  posterImage?: Image | null;
}
/** An article presentation */
export interface Tile {
  article: Article;

  headline?: string | null;

  leadAsset?: Media | null;

  strapline?: string | null;

  teaser?: Markup | null;
}

export interface Topic {
  articles?: TopicArticles | null;
  /** A short sentence to describe the topic */
  description?: Markup | null;

  name: string;

  slug: Slug;
}

export interface TopicArticles {
  /** The number of articles in a given topic */
  count?: number | null;
  /** List of articles associated with that topic */
  list: (Article | null)[];
}

export interface Articles {
  /** The number of articles that satisfy the filter */
  count?: number | null;

  list: (Article | null)[];
}
/** An edition for a single day */
export interface Edition {
  id: Uuid;
  /** Journalist inputted text which denotes the last time an edition was published */
  updateText?: string | null;
  /** The date that the edition is intended for, not necessarily the date it was published (contrast with `publishedTime`) */
  date?: ShortDate | null;

  publicationName: PublicationName;
  /** The date & time that the edition was published (contrast with `date`) */
  publishedTime?: DateTime | null;

  updatedTime?: DateTime | null;

  sections?: (Section | null)[] | null;
}

export interface Colour {
  rgba: Rgba;
}

export interface Rgba {
  red: number;

  green: number;

  blue: number;

  alpha: number;
}
/** A list of editions with pagination meta data */
export interface EditionsPaged {
  list?: (Edition | null)[] | null;
}
/** A sport in the sports video hub */
export interface Sport {
  id: Uuid;

  name: string;
  /** A list of competitions associated to a sport */
  competitions: (SportCompetition | null)[];
}
/** A sport competition in the sports video hub */
export interface SportCompetition {
  id: Uuid;

  name: string;
  /** Poster image of the most recent video of a competition */
  imageUrl?: Url | null;
  /** Non-vector logo for competition */
  logoUrl?: Url | null;
  /** A list of video groupings associated to a sport competition */
  groups: SportVideoGroup[];
}
/** A group of sport videos (e.g. round, match day, extras, ...) */
export interface SportVideoGroup {
  name: string;
  /** A list of sport videos ordered by time of creation */
  brightcoveVideos: BrightcoveSportVideo[];
}
/** A video in the sports video hub. Note that some of these videos are only licensed on mobile applications. */
export interface BrightcoveSportVideo {
  videoId: string;

  title: string;

  subtitle?: string | null;

  posterImageUrl: Url;

  posterImageOverlayUrl?: Url | null;

  publishedTime: DateTime;

  updatedTime: DateTime;

  accountId: string;

  policyKey: string;
}

export interface User {
  /** a code used for Spot.IM's Single Sign On auth. Details here: https://github.com/SpotIM/spotim-integration-docs/blob/master/api/single-sign-on/README.md */
  spotimCodeB?: string | null;

  bookmarks?: PageOfBookmarks | null;
}

export interface PageOfBookmarks {
  bookmarks: Bookmark[];

  total: number;
}

export interface Bookmark {
  id: Uuid;
}

export interface Mutation {
  saveBookmarks: Bookmark[];

  unsaveBookmarks: Uuid[];
}
/** A piece of the daily universal register */
export interface DailyUniversalRegisterItem {
  title: string;

  byline?: Markup | null;

  content: Markup;
}
/** The daily universal register slice */
export interface DailyUniversalRegister {
  briefing: DailyUniversalRegisterItem;

  onThisDay: DailyUniversalRegisterItem;

  natureNotes: DailyUniversalRegisterItem;

  birthdaysToday: DailyUniversalRegisterItem;

  items: DailyUniversalRegisterItem[];
}
/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface LeadAndTwo extends Layout {
  template?: Template | null;

  main?: Uuid | null;

  lead?: Uuid | null;
}
/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface OpinionAndTwo extends Layout {
  template?: Template | null;

  main?: Uuid | null;

  opinion?: Uuid | null;
}
/** Any number of articles with no opinion on the layout/importance of any */
export interface Default extends Layout {
  template?: Template | null;
}

export interface NamedLink {
  name: string;

  url: Url;
}

export interface StandardSection extends Section {
  id: Uuid;

  title: string;

  slug: Slug;

  colour: Colour;

  slices: StandardSectionSlice[];
}
/** Fallback slice without any prescribed presentation, replaces standard related-links slice (related-links) */
export interface StandardSlice extends ArticleSlice {
  items: Tile[];
}
/** A leading comment article and a cartoon (comment-lead-and-cartoon) */
export interface CommentLeadAndCartoonSlice extends ArticleSlice {
  lead: Tile;

  cartoon: Tile;

  items: Tile[];
}
/** A special type of banner containing articles which is displayed at the top the new sections */
export interface InTheNewsSlice {
  items: Tile[];
}
/** Trio of letter, thunderer and podcast articles (comment-1-letters-thunderer) */
export interface LetterThundererPodcastSlice extends ArticleSlice {
  letter: Tile;

  thunderer: Tile;

  podcast: Tile;

  items: Tile[];
}
/** Two comment articles and a notebook article (comment-2-and-notebook) */
export interface CommentTwoAndNotebookSlice extends ArticleSlice {
  main1: Tile;

  main2: Tile;

  notebook: Tile;

  items: Tile[];
}
/** A focus article (focus) */
export interface FocusSlice extends ArticleSlice {
  main: Tile;

  items: Tile[];
}
/** Three leader articles (leaders) */
export interface LeadersSlice extends ArticleSlice {
  leader1: Tile;

  leader2: Tile;

  leader3: Tile;

  items: Tile[];
}
/** A lead article and four supporting articles (supplement-lead-and-4-stack) */
export interface LeadOneAndFourSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];
}
/** A lead article and a supporting article (lead-1-and-1) */
export interface LeadOneAndOneSlice extends ArticleSlice {
  lead: Tile;

  support: Tile;

  items: Tile[];
}
/** A lead article and two supporting articles. This slice can also represent lead related articles slice of the same name (lead-1-and-2-puffs, related-links-lead-and-2) */
export interface LeadOneAndTwoSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** One full width lead article on its own (lead-1-full-width) */
export interface LeadOneFullWidthSlice extends ArticleSlice {
  lead: Tile;

  items: Tile[];
}
/** A lead module and supporting and portrait modules (lead-1-no-pic-and-1-and-portrait) */
export interface LeadOneNoPicAndOneAndPortraitSlice extends ArticleSlice {
  lead: Tile;

  support: Tile;

  portrait: Tile;

  items: Tile[];
}
/** Two leads without pictures along and a pair of supporting articles (lead-2-no-pic-and-2) */
export interface LeadTwoNoPicAndTwoSlice extends ArticleSlice {
  lead1: Tile;

  lead2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** Special obituary lead and two support articles (obituaries-lead-and-2) */
export interface ObituariesLeadAndTwoSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** A lead opinion related articles slice (related-links-opinion-and-2) */
export interface OpinionOneAndTwoSlice extends ArticleSlice {
  opinion: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** Four secondary modules (secondary-4) */
export interface SecondaryFourSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  secondary3: Tile;

  secondary4: Tile;

  items: Tile[];
}
/** A singular secondary module (secondary-1) */
export interface SecondaryOneSlice extends ArticleSlice {
  secondary: Tile;

  items: Tile[];
}
/** A secondary module and a special supporting columnist module (secondary-1-and-columnist) */
export interface SecondaryOneAndColumnistSlice extends ArticleSlice {
  secondary: Tile;

  columnist: Tile;

  items: Tile[];
}
/** A secondary module and four supporting articles (supplement-secondary-1-and-4) */
export interface SecondaryOneAndFourSlice extends ArticleSlice {
  secondary: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];
}
/** Two secondary modules and supporting articles (secondary-2-and-2) */
export interface SecondaryTwoAndTwoSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** Two secondary modules, without an image, and supporting articles (secondary-2-no-pic-and-2) */
export interface SecondaryTwoNoPicAndTwoSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];
}
/** A slice and two leads and six supporting articles (list-2-and-6-no-pic) */
export interface TwoPicAndSixNoPicSlice extends ArticleSlice {
  lead1: Tile;

  lead2: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  support5: Tile;

  support6: Tile;

  items: Tile[];
}
/** A banner containing one or many articles/links */
export interface PuffSlice {
  items: Puff[];
}
/** An article/link which is displayed in a puff */
export interface Puff {
  title: string;

  colour: Colour;

  mainLink: PuffMainLink;

  topicLink: PuffTopicLink;

  major: boolean;
}

export interface PuzzleSection extends Section {
  id: Uuid;

  title: string;

  slug: Slug;

  colour: Colour;

  slices: PuzzleSectionSlice[];
}
/** A representation of a single puzzle for the puzzles section */
export interface Puzzle {
  id: Uuid;

  title: string;

  url: Url;

  image: Image;
}
/** A magazine section, e.g. Culture, Style, ST Magazine */
export interface MagazineSection extends Section {
  id: Uuid;

  title: string;

  slug: Slug;

  colour: Colour;

  cover: Image;

  slices: MagazineSectionSlice[];
}

export interface ArticleUpsertResult {
  id: Uuid;
}

export interface EditionUpsertResult {
  id: Uuid;
}

export interface SectionUpdateResult {
  id: Uuid;
}

export interface SliceUpdateResult {
  id: Uuid;
}

// ====================================================
// InputTypes
// ====================================================

export interface BookmarkSaveInput {
  /** ID of resource being bookmarked */
  id: Uuid;
}

export interface BookmarkUnsaveInput {
  /** ID of resource being unbookmarked */
  id: Uuid;
}

export interface ExpirableFlagInput {
  type: Flag;
  /** The number of seconds for which this flag applies following the publishedTime. Null would apply indefinitely. */
  duration?: number | null;
}

export interface ArticleInput {
  leadAsset?: MediaInput | null;

  listingAsset?: MediaInput | null;

  byline: Markup;

  bylines: ArticleByline;

  authors: Slug[];

  expirableFlags: ExpirableFlagInput[];

  headline?: string | null;

  shortHeadline?: string | null;

  id: Uuid;

  label?: string | null;

  commentsEnabled: boolean;

  commercialTags: string[];

  commercialSectionTags?: string[] | null;

  section?: SectionName | null;

  publicationName: PublicationName;

  publishedTime: DateTime;

  relatedArticleSlice?: ArticleSliceInput | null;

  updatedTime: DateTime;

  slug: Slug;

  standfirst?: string | null;

  isLegacy: boolean;

  content: ContentFragmentInput[];

  template?: TemplateType | null;
}

export interface MediaInput {
  image?: ImageInput | null;

  video?: VideoInput | null;
}

export interface ImageInput {
  id: Uuid;

  title: string;

  caption?: string | null;

  credits?: string | null;

  crops: CropInput[];
}

export interface CropInput {
  imageId: string;

  ratio: Ratio;

  horizontalOffset: number;

  verticalOffset: number;

  width: number;

  height: number;
}

export interface VideoInput {
  id: Uuid;

  caption?: string | null;

  brightcovePolicyKey: string;

  brightcovePlayerId: string;

  brightcoveVideoId: string;

  brightcoveAccountId: string;

  paidOnly: boolean;

  skySports: boolean;

  posterImage: ImageInput;
}

export interface ArticleSliceInput {
  standardSlice?: StandardSliceInput | null;

  leadOneAndTwoSlice?: LeadOneAndTwoSliceInput | null;

  opinionOneAndTwoSlice?: OpinionOneAndTwoSliceInput | null;
}

export interface StandardSliceInput {
  items: TileInput[];
}

export interface TileInput {
  articleId: Uuid;

  headline?: string | null;

  leadAsset?: MediaInput | null;

  strapline?: string | null;

  teaser?: Markup | null;
}

export interface LeadOneAndTwoSliceInput {
  lead: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface OpinionOneAndTwoSliceInput {
  opinion: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface ContentFragmentInput {
  richText?: RichTextFragmentInput | null;

  image?: ImageFragmentInput | null;

  video?: VideoFragmentInput | null;

  interactive?: InteractiveFragmentInput | null;
}

export interface RichTextFragmentInput {
  richText: RichText;
}

export interface ImageFragmentInput {
  metadata: ContentFragmentMetadataInput;

  image: ImageInput;
}

export interface ContentFragmentMetadataInput {
  display?: Display | null;
}

export interface VideoFragmentInput {
  metadata: ContentFragmentMetadataInput;

  video: VideoInput;
}

export interface InteractiveFragmentInput {
  metadata: ContentFragmentMetadataInput;

  interactive: InteractiveInput;
}

export interface InteractiveInput {
  id: Uuid;

  caption?: string | null;

  url: Url;

  element: InteractiveElementInput;
}

export interface InteractiveElementInput {
  attributes: Dictionary;

  value: string;
}

export interface AuthorCreateInput {
  name: string;

  slug: Slug;

  jobTitle: string;

  biography: Markup;
  /** URL for the image of an author */
  image?: Url | null;
  /** Twitter handle for an author */
  twitter?: string | null;

  hasLeadAssets: boolean;
}

export interface AuthorUpdateInput {
  name: string;

  jobTitle: string;

  biography: Markup;
  /** URL for the image of an author */
  image?: Url | null;
  /** Twitter handle for an author */
  twitter?: string | null;

  hasLeadAssets: boolean;
}

export interface DailyUniversalRegisterInput {
  briefing: DailyUniversalRegisterItemInput;

  onThisDay: DailyUniversalRegisterItemInput;

  natureNotes: DailyUniversalRegisterItemInput;

  birthdaysToday: DailyUniversalRegisterItemInput;
}

export interface DailyUniversalRegisterItemInput {
  title: string;

  byline?: Markup | null;

  content: Markup;
}

export interface EditionInput {
  id: Uuid;

  updateText: string;

  date: ShortDate;

  publicationName: PublicationName;

  publishedTime: DateTime;

  updatedTime: DateTime;

  sections?: (SectionInput | null)[] | null;
}

export interface SectionInput {
  standardSection?: StandardSectionInput | null;

  puzzleSection?: PuzzleSectionInput | null;

  magazineSection?: MagazineSectionInput | null;
}

export interface StandardSectionInput {
  id: Uuid;

  title?: string | null;

  slug: Slug;

  colour: ColourInput;

  slices: (StandardSectionSliceInput | null)[];
}

export interface ColourInput {
  rgba: RgbaInput;
}

export interface RgbaInput {
  red: TinyInt;

  green: TinyInt;

  blue: TinyInt;

  alpha: UnitInterval;
}

export interface StandardSectionSliceInput {
  standardSlice?: StandardSliceInput | null;

  commentLeadAndCartoonSlice?: CommentLeadAndCartoonSliceInput | null;

  letterThundererPodcastSlice?: LetterThundererPodcastSliceInput | null;

  commentTwoAndNotebookSlice?: CommentTwoAndNotebookSliceInput | null;

  focusSlice?: FocusSliceInput | null;

  leadersSlice?: LeadersSliceInput | null;

  leadOneAndFourSlice?: LeadOneAndFourSliceInput | null;

  leadOneAndOneSlice?: LeadOneAndOneSliceInput | null;

  leadOneAndTwoSlice?: LeadOneAndTwoSliceInput | null;

  leadOneFullWidthSlice?: LeadOneFullWidthSliceInput | null;

  leadOneNoPicAndOneAndPortraitSlice?: LeadOneNoPicAndOneAndPortraitSliceInput | null;

  leadTwoNoPicAndTwoSlice?: LeadTwoNoPicAndTwoSliceInput | null;

  obituariesLeadAndTwoSlice?: ObituariesLeadAndTwoSliceInput | null;

  opinionOneAndTwoSlice?: OpinionOneAndTwoSliceInput | null;

  secondaryFourSlice?: SecondaryFourSliceInput | null;

  secondaryOneSlice?: SecondaryOneSliceInput | null;

  secondaryOneAndColumnistSlice?: SecondaryOneAndColumnistSliceInput | null;

  secondaryOneAndFourSlice?: SecondaryOneAndFourSliceInput | null;

  secondaryTwoAndTwoSlice?: SecondaryTwoAndTwoSliceInput | null;

  secondaryTwoNoPicAndTwoSlice?: SecondaryTwoNoPicAndTwoSliceInput | null;

  twoPicAndSixNoPicSlice?: TwoPicAndSixNoPicSliceInput | null;

  puff?: PuffSliceInput | null;

  inTheNews?: InTheNewsSliceInput | null;

  dailyUniversalRegister?: DailyUniversalRegisterInput | null;
}

export interface CommentLeadAndCartoonSliceInput {
  lead: TileInput;

  cartoon: TileInput;
}

export interface LetterThundererPodcastSliceInput {
  letter: TileInput;

  thunderer: TileInput;

  podcast: TileInput;
}

export interface CommentTwoAndNotebookSliceInput {
  main1: TileInput;

  main2: TileInput;

  notebook: TileInput;
}

export interface FocusSliceInput {
  main: TileInput;
}

export interface LeadersSliceInput {
  leader1: TileInput;

  leader2: TileInput;

  leader3: TileInput;
}

export interface LeadOneAndFourSliceInput {
  lead: TileInput;

  support1: TileInput;

  support2: TileInput;

  support3: TileInput;

  support4: TileInput;
}

export interface LeadOneAndOneSliceInput {
  lead: TileInput;

  support: TileInput;
}

export interface LeadOneFullWidthSliceInput {
  lead: TileInput;
}

export interface LeadOneNoPicAndOneAndPortraitSliceInput {
  lead: TileInput;

  support: TileInput;

  portrait: TileInput;
}

export interface LeadTwoNoPicAndTwoSliceInput {
  lead1: TileInput;

  lead2: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface ObituariesLeadAndTwoSliceInput {
  lead: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface SecondaryFourSliceInput {
  secondary1: TileInput;

  secondary2: TileInput;

  secondary3: TileInput;

  secondary4: TileInput;
}

export interface SecondaryOneSliceInput {
  secondary: TileInput;
}

export interface SecondaryOneAndColumnistSliceInput {
  secondary: TileInput;

  columnist: TileInput;
}

export interface SecondaryOneAndFourSliceInput {
  secondary: TileInput;

  support1: TileInput;

  support2: TileInput;

  support3: TileInput;

  support4: TileInput;
}

export interface SecondaryTwoAndTwoSliceInput {
  secondary1: TileInput;

  secondary2: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface SecondaryTwoNoPicAndTwoSliceInput {
  secondary1: TileInput;

  secondary2: TileInput;

  support1: TileInput;

  support2: TileInput;
}

export interface TwoPicAndSixNoPicSliceInput {
  lead1: TileInput;

  lead2: TileInput;

  support1: TileInput;

  support2: TileInput;

  support3: TileInput;

  support4: TileInput;

  support5: TileInput;

  support6: TileInput;
}

export interface PuffSliceInput {
  items: PuffInput[];
}

export interface PuffInput {
  title: string;

  colour: ColourInput;

  mainLink: NamedLinkInput;

  topicLink: NamedLinkInput;

  major: boolean;
}

export interface NamedLinkInput {
  name: string;

  url: Url;
}

export interface InTheNewsSliceInput {
  items: TileInput[];
}

export interface PuzzleSectionInput {
  id: Uuid;

  title?: string | null;

  slug: Slug;

  colour: ColourInput;

  slices: (PuzzleSectionSliceInput | null)[];
}

export interface PuzzleSectionSliceInput {
  puzzle?: PuzzleInput | null;

  puff?: PuffSliceInput | null;
}

export interface PuzzleInput {
  id: Uuid;

  title: string;

  url: Url;

  image: ImageInput;
}

export interface MagazineSectionInput {
  id: Uuid;

  title?: string | null;

  slug: Slug;

  colour: ColourInput;

  cover: ImageInput;

  slices: (MagazineSectionSliceInput | null)[];
}

export interface MagazineSectionSliceInput {
  standardSlice?: StandardSliceInput | null;

  commentLeadAndCartoonSlice?: CommentLeadAndCartoonSliceInput | null;

  letterThundererPodcastSlice?: LetterThundererPodcastSliceInput | null;

  commentTwoAndNotebookSlice?: CommentTwoAndNotebookSliceInput | null;

  focusSlice?: FocusSliceInput | null;

  leadersSlice?: LeadersSliceInput | null;

  leadOneAndFourSlice?: LeadOneAndFourSliceInput | null;

  leadOneAndOneSlice?: LeadOneAndOneSliceInput | null;

  leadOneAndTwoSlice?: LeadOneAndTwoSliceInput | null;

  leadOneFullWidthSlice?: LeadOneFullWidthSliceInput | null;

  leadOneNoPicAndOneAndPortraitSlice?: LeadOneNoPicAndOneAndPortraitSliceInput | null;

  leadTwoNoPicAndTwoSlice?: LeadTwoNoPicAndTwoSliceInput | null;

  obituariesLeadAndTwoSlice?: ObituariesLeadAndTwoSliceInput | null;

  opinionOneAndTwoSlice?: OpinionOneAndTwoSliceInput | null;

  secondaryFourSlice?: SecondaryFourSliceInput | null;

  secondaryOneSlice?: SecondaryOneSliceInput | null;

  secondaryOneAndColumnistSlice?: SecondaryOneAndColumnistSliceInput | null;

  secondaryOneAndFourSlice?: SecondaryOneAndFourSliceInput | null;

  secondaryTwoAndTwoSlice?: SecondaryTwoAndTwoSliceInput | null;

  secondaryTwoNoPicAndTwoSlice?: SecondaryTwoNoPicAndTwoSliceInput | null;

  twoPicAndSixNoPicSlice?: TwoPicAndSixNoPicSliceInput | null;

  puff?: PuffSliceInput | null;
}

export interface PuffMainLinkInput {
  tile?: TileInput | null;

  namedLink?: NamedLinkInput | null;
}

export interface PuffTopicLinkInput {
  standardSection?: StandardSectionInput | null;

  puzzleSection?: PuzzleSectionInput | null;

  namedLink?: NamedLinkInput | null;
}

export interface PuffSectionItemInput {
  puff?: PuffSliceInput | null;
}

export interface InTheNewsSectionItemInput {
  inTheNews?: InTheNewsSliceInput | null;
}

// ====================================================
// Arguments
// ====================================================

export interface AuthorQueryArgs {
  /** An author's URL slug */
  slug: Slug;
}
export interface ArticleQueryArgs {
  id: string;
}
export interface ArticlesQueryArgs {
  updatedSince?: DateTime | null;

  ids?: string[] | null;

  shortIdentifier?: string | null;
}
export interface EditionQueryArgs {
  id: string;
}
export interface EditionsQueryArgs {
  updatedSince?: DateTime | null;

  ids?: string[] | null;
}
export interface SectionQueryArgs {
  id: string;
}
export interface SportCompetitionQueryArgs {
  id: string;
}
export interface TopicQueryArgs {
  slug?: Slug | null;
}
export interface ListAuthorArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number | null;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface ContentArticleArgs {
  /** If a teaser is required, use to truncate the article content by words. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum */
  maxWordCount?: number | null;
  /** If summary text is required, use to truncate the article content by characters. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum. Has no effect if maxWordCount is specified */
  maxCharCount?: number | null;
}
export interface SummaryArticleArgs {
  maxCharCount?: number | null;
}
export interface TopicsArticleArgs {
  maxCount?: number | null;
}
export interface CropImageArgs {
  ratio: Ratio;
}
export interface TeaserTileArgs {
  maxCharCount?: number | null;
}
export interface ListTopicArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number | null;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface ListArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number | null;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface ListEditionsPagedArgs {
  /** The maximum number of editions you want to take, defaults to 10 */
  first?: number | null;
  /** The number of editions to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface SpotimCodeBUserArgs {
  codeA: string;
}
export interface BookmarksUserArgs {
  first?: number | null;

  skip?: number | null;
}
export interface SaveBookmarksMutationArgs {
  bookmarks: BookmarkSaveInput[];
}
export interface UnsaveBookmarksMutationArgs {
  bookmarks: BookmarkUnsaveInput[];
}

// ====================================================
// Enums
// ====================================================

export enum Flag {
  NEW = "NEW",
  EXCLUSIVE = "EXCLUSIVE",
  UPDATED = "UPDATED",
  SPONSORED = "SPONSORED"
}

export enum SectionName {
  bricksmortar = "bricksmortar",
  business = "business",
  comment = "comment",
  culture = "culture",
  home = "home",
  money = "money",
  news = "news",
  newsreview = "newsreview",
  puzzle = "puzzle",
  register = "register",
  saturdayreview = "saturdayreview",
  sport = "sport",
  style = "style",
  thedish = "thedish",
  thegame = "thegame",
  thesundaytimesmagazine = "thesundaytimesmagazine",
  thetimesmagazine = "thetimesmagazine",
  times2 = "times2",
  travel = "travel",
  weekend = "weekend",
  world = "world"
}

export enum PublicationName {
  SUNDAYTIMES = "SUNDAYTIMES",
  TIMES = "TIMES"
}
/** Predefined template names that should be used by all systems interested in templates to denote the template layout */
export enum Template {
  DEFAULT = "DEFAULT",
  LEAD_AND_TWO = "LEAD_AND_TWO",
  OPINION_AND_TWO = "OPINION_AND_TWO"
}

export enum TemplateType {
  magazinecomment = "magazinecomment",
  indepth = "indepth",
  magazinestandard = "magazinestandard",
  maincomment = "maincomment",
  mainstandard = "mainstandard"
}

export enum Display {
  primary = "primary",
  secondary = "secondary",
  inline = "inline",
  fullwidth = "fullwidth"
}

// ====================================================
// Unions
// ====================================================

export type Media = Image | Video;

export type PuffMainLink = Tile | NamedLink;

export type PuffTopicLink = StandardSection | PuzzleSection | NamedLink;

export type StandardSectionSlice =
  | StandardSlice
  | CommentLeadAndCartoonSlice
  | InTheNewsSlice
  | LetterThundererPodcastSlice
  | CommentTwoAndNotebookSlice
  | FocusSlice
  | LeadersSlice
  | LeadOneAndFourSlice
  | LeadOneAndOneSlice
  | LeadOneAndTwoSlice
  | LeadOneFullWidthSlice
  | LeadOneNoPicAndOneAndPortraitSlice
  | LeadTwoNoPicAndTwoSlice
  | ObituariesLeadAndTwoSlice
  | OpinionOneAndTwoSlice
  | SecondaryFourSlice
  | SecondaryOneSlice
  | SecondaryOneAndColumnistSlice
  | SecondaryOneAndFourSlice
  | SecondaryTwoAndTwoSlice
  | SecondaryTwoNoPicAndTwoSlice
  | TwoPicAndSixNoPicSlice
  | PuffSlice
  | DailyUniversalRegister;

export type PuzzleSectionSlice = Puzzle | PuffSlice;

export type MagazineSectionSlice =
  | StandardSlice
  | CommentLeadAndCartoonSlice
  | LetterThundererPodcastSlice
  | CommentTwoAndNotebookSlice
  | FocusSlice
  | LeadersSlice
  | LeadOneAndFourSlice
  | LeadOneAndOneSlice
  | LeadOneAndTwoSlice
  | LeadOneFullWidthSlice
  | LeadOneNoPicAndOneAndPortraitSlice
  | LeadTwoNoPicAndTwoSlice
  | ObituariesLeadAndTwoSlice
  | OpinionOneAndTwoSlice
  | SecondaryFourSlice
  | SecondaryOneSlice
  | SecondaryOneAndColumnistSlice
  | SecondaryOneAndFourSlice
  | SecondaryTwoAndTwoSlice
  | SecondaryTwoNoPicAndTwoSlice
  | TwoPicAndSixNoPicSlice
  | PuffSlice;

// ====================================================
// END: Typescript template
// ====================================================
