export interface DateFilter {
  from: DateTime;

  to: DateTime;
}

export interface BookmarkSaveInput {
  /** ID of resource being bookmarked */
  id: Uuid;
}

export interface BookmarkUnsaveInput {
  /** ID of resource being unbookmarked */
  id: Uuid;
}

export interface ArticleInput {
  leadAsset?: MediaInput | null;

  listingAsset?: MediaInput | null;

  authors: Slug[];

  byline: Markup;

  bylines?: (BylineInput | null)[] | null;

  backgroundColour?: ColourInput | null;

  dropcapsDisabled: boolean;

  expirableFlags: ExpirableFlagInput[];

  headline?: string | null;

  shortHeadline?: string | null;

  id: Uuid;

  label?: string | null;

  commentsEnabled: boolean;

  commentsPreModerated?: boolean | null;

  commercialTags: string[];

  commercialSectionTags?: string[] | null;

  section?: SectionName | null;

  publicationName: PublicationName;

  publishedTime: DateTime;

  relatedArticleSlice?: ArticleSliceInput | null;

  textColour?: ColourInput | null;

  savingEnabled: boolean;

  sharingEnabled: boolean;

  slug: Slug;

  standfirst?: string | null;

  strapline?: string | null;

  updatedTime: DateTime;

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

  sourceWidth?: number | null;

  sourceHeight?: number | null;
}

export interface VideoInput {
  id: Uuid;

  caption?: string | null;

  title?: string | null;

  brightcovePolicyKey: string;

  brightcovePlayerId: string;

  brightcoveVideoId: string;

  brightcoveAccountId: string;

  posterImage: ImageInput;

  is360?: boolean | null;
}

export interface BylineInput {
  byline: Markup;

  author?: Slug | null;

  image?: ImageInput | null;
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

export interface ExpirableFlagInput {
  type: Flag;
  /** The number of seconds for which this flag applies following the publishedTime. Null would apply indefinitely. */
  duration?: number | null;
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

export interface ArticleTagScore {
  score: number;

  name: string;

  type: SynonymType;
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

export interface CommentLeadAndCartoonSliceInput {
  lead: TileInput;

  cartoon: TileInput;
}

export interface CommentTwoAndNotebookSliceInput {
  main1: TileInput;

  main2: TileInput;

  notebook: TileInput;
}

export interface CostComplexity {
  min?: number | null;

  max?: number | null;
}

export interface CreateTagInput {
  tagId?: string | null;

  name: string;

  type: SynonymType;
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

  region?: Region | null;

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

export interface StandardSectionSliceInput {
  standardSlice?: StandardSliceInput | null;

  commentLeadAndCartoonSlice?: CommentLeadAndCartoonSliceInput | null;

  letterThundererPodcastSlice?: LetterThundererPodcastSliceInput | null;

  commentTwoAndNotebookSlice?: CommentTwoAndNotebookSliceInput | null;

  focusSlice?: FocusSliceInput | null;

  leadersSlice?: LeadersSliceInput | null;

  leadOneAndFourSlice?: LeadOneAndFourSliceInput | null;

  supplementLeadAndFourStackSlice?: SupplementLeadAndFourStackSliceInput | null;

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

  supplementSecondaryOneAndFourSlice?: SupplementSecondaryOneAndFourSliceInput | null;

  secondaryTwoAndTwoSlice?: SecondaryTwoAndTwoSliceInput | null;

  secondaryTwoNoPicAndTwoSlice?: SecondaryTwoNoPicAndTwoSliceInput | null;

  twoPicAndSixNoPicSlice?: TwoPicAndSixNoPicSliceInput | null;

  puff?: PuffSliceInput | null;

  inTheNews?: InTheNewsSliceInput | null;

  dailyUniversalRegister?: DailyUniversalRegisterInput | null;
}

export interface LetterThundererPodcastSliceInput {
  letter: TileInput;

  thunderer: TileInput;

  podcast: TileInput;
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

export interface SupplementLeadAndFourStackSliceInput {
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

export interface SupplementSecondaryOneAndFourSliceInput {
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

  hideOnMobile?: boolean | null;

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

  supplementLeadAndFourStackSlice?: SupplementLeadAndFourStackSliceInput | null;

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

  supplementSecondaryOneAndFourSlice?: SupplementSecondaryOneAndFourSliceInput | null;

  secondaryTwoAndTwoSlice?: SecondaryTwoAndTwoSliceInput | null;

  secondaryTwoNoPicAndTwoSlice?: SecondaryTwoNoPicAndTwoSliceInput | null;

  twoPicAndSixNoPicSlice?: TwoPicAndSixNoPicSliceInput | null;

  puff?: PuffSliceInput | null;
}

export interface InTheNewsSectionItemInput {
  inTheNews?: InTheNewsSliceInput | null;
}

export interface PaginateArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}

export interface PuffMainLinkInput {
  tile?: TileInput | null;

  namedLink?: NamedLinkInput | null;
}

export interface PuffSectionItemInput {
  puff?: PuffSliceInput | null;
}

export interface PuffTopicLinkInput {
  standardSection?: StandardSectionInput | null;

  puzzleSection?: PuzzleSectionInput | null;

  namedLink?: NamedLinkInput | null;
}

export interface TagUpdateInput {
  description: string;
}

export interface TopicInput {
  name: string;

  slug: Slug;

  description?: RichText | null;
}

export interface TopicTagInput {
  id: Uuid;

  scoreThreshold: number;
}

export interface TopicUpdateInput {
  name: string;

  slug: Slug;

  description: RichText;
}

export enum Flag {
  New = "NEW",
  Exclusive = "EXCLUSIVE",
  Updated = "UPDATED",
  Sponsored = "SPONSORED"
}

export enum SectionName {
  Bricksmortar = "bricksmortar",
  Business = "business",
  Comment = "comment",
  Culture = "culture",
  Home = "home",
  Money = "money",
  News = "news",
  Newsreview = "newsreview",
  Puzzle = "puzzle",
  Register = "register",
  Saturdayreview = "saturdayreview",
  Sport = "sport",
  Style = "style",
  Thedish = "thedish",
  Thegame = "thegame",
  Thesundaytimesmagazine = "thesundaytimesmagazine",
  Thetimesmagazine = "thetimesmagazine",
  Times2 = "times2",
  Travel = "travel",
  Weekend = "weekend",
  World = "world"
}

export enum PublicationName {
  Sundaytimes = "SUNDAYTIMES",
  Times = "TIMES"
}
/** Predefined template names that should be used by all systems interested in templates to denote the template layout */
export enum Template {
  Default = "DEFAULT",
  LeadAndTwo = "LEAD_AND_TWO",
  OpinionAndTwo = "OPINION_AND_TWO"
}

export enum SynonymType {
  Unknown = "UNKNOWN",
  Person = "PERSON",
  Location = "LOCATION",
  Organization = "ORGANIZATION",
  Event = "EVENT",
  WorkOfArt = "WORK_OF_ART",
  ConsumerGood = "CONSUMER_GOOD",
  Other = "OTHER"
}

export enum TemplateType {
  Magazinecomment = "magazinecomment",
  Indepth = "indepth",
  Magazinestandard = "magazinestandard",
  Maincomment = "maincomment",
  Mainstandard = "mainstandard"
}

export enum Region {
  Default = "default",
  Ireland = "ireland"
}

export enum EditionGroupOptions {
  Date = "date"
}

export enum Display {
  Primary = "primary",
  Secondary = "secondary",
  Inline = "inline",
  Fullwidth = "fullwidth"
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** A lower kebab case string */
export type Slug = any;

/** Tiny integer (range of 0-255) */
export type TinyInt = any;

/** Unit interval type (0-1 decimal range) */
export type UnitInterval = any;

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

/** An AST representing cross platform UI */
export type RichText = any;

export type Cursor = any;

/** The `BigInt` scalar type represents non-fractional signed whole numeric values.BigInt can represent values between -(2^53) + 1 and 2^53 - 1. */
export type BigInt = any;

/** Represents a date and time of day in ISO 8601 */
export type ShortDate = any;

/** An dictionary of string-based key-value pairs */
export type Dictionary = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface Byline {
  byline: Markup;

  image?: Image | null;
}

/** A selection of template types that have opinions over how they should bepresented. Usually used within the context of an associated list of articles */
export interface Layout {
  template?: Template | null;
}

export interface ArticleSlice {
  items: Tile[];

  sections: Section[];
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

  tag?: Tag | null;

  tags?: TagConnection | null;

  topic?: Topic | null;

  topics?: TopicConnection | null;
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
  /** Used for indepth templates to define the background colour to be used. */
  backgroundColour?: Colour | null;
  /** An AST of one or more authors that may contain job titles and/or locations */
  byline?: Markup | null;
  /** Text or structured bylines for one or more authors */
  bylines?: (ArticleByline | null)[] | null;
  /** The content for the article in the shape of an AST */
  content?: Markup | null;
  /** The paywalled content for the article in the shape of an AST. After the freecontent, the rest of the markup is wrapped in a paywall element to allowflexible sampling to work with a classname */
  paywalledContent?: Markup | null;
  /** Ability to disable dropcaps even if the given template has them by default */
  dropcapsDisabled?: boolean | null;
  /** A list of time dependent with pair dependencies */
  flags?: (Flag | null)[] | null;
  /** List of time dependent with expiry time */
  expirableFlags?: (ExpirableFlag | null)[] | null;
  /** Whether or not the article contains a video (as a lead asset or an inline video, or both) */
  hasVideo?: boolean | null;
  /** A longer SEO headline. Note this might not be populated so please use 'shortHeadline' as a fallback. */
  headline?: string | null;

  id: Uuid;
  /** A user specific flag that indicates whether the article has been bookmarked(saved) by the user. This property can only be accessed by logged in users. */
  isBookmarked?: boolean | null;
  /** A free piece of text to describe an article */
  label?: string | null;
  /** A flag set outside of the commenting system, usually used for controversial articles */
  commentsEnabled?: boolean | null;
  /** The commenting system moderation policy for this article */
  commentsPreModerated?: boolean | null;
  /** The number of comments an article has */
  commentCount?: number | null;
  /** A rarely populated field that is a list of free text such as ["luxury", "ferrari"] */
  commercialTags?: (string | null)[] | null;
  /** A field that is populated from the article headline, a string delineated withcommas such as ["this", "is", "a", "headline"] */
  keywords: string[];
  /** A shorter headline useful for when space is at a premium. Note this may returnnull so please use `headline` field as a fallback. */
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
  /** Date the article was first published */
  firstPublishedTime?: DateTime | null;

  updatedTime?: DateTime | null;
  /** Curated list of articles selected by editorial that appear at the end of an article */
  relatedArticles?: (Article | null)[] | null;
  /** Presentational information on how the related articles should be displayed */
  relatedArticlesLayout?: Layout | null;
  /** Related article slice */
  relatedArticleSlice?: ArticleSlice | null;

  savingEnabled?: boolean | null;

  sharingEnabled?: boolean | null;
  /** Customisable field in the CMS, that is by default a slugified version of the article title */
  slug?: string | null;
  /** A brief introductory summary, typically appearing immediately after theheadline and typographically distinct from the rest of the article */
  standfirst?: string | null;
  /** A brief introductory summary, typically appearing immediately after the standfirst */
  strapline?: string | null;
  /** A predefined truncated version of the article with a max length of the teaser,can optionally choose a shorter length. Use this to avoid ACS. */
  summary?: Markup | null;
  /** Used for indepth templates to define the text colour to be used. */
  textColour?: Colour | null;
  /** The tiles that this article appears in */
  tiles?: (Tile | null)[] | null;

  title?: string | null;
  /** Used for tokenised article URL */
  tokenisedUrl?: Url | null;
  /** Topics that the requested article belong to */
  topics?: (Topic | null)[] | null;

  url?: Url | null;

  template?: TemplateType | null;

  tags?: ArticleTagConnection | null;

  synonyms: ArticleSynonymConnection;

  topicConnection: ArticleTopicConnection;
}

export interface Colour {
  rgba: Rgba;
}

export interface Rgba {
  red: TinyInt;

  green: TinyInt;

  blue: TinyInt;

  alpha: UnitInterval;
}

export interface TextByline extends Byline {
  byline: Markup;

  image?: Image | null;
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

  relativeHorizontalOffset?: UnitInterval | null;

  relativeVerticalOffset?: UnitInterval | null;

  relativeWidth?: UnitInterval | null;

  relativeHeight?: UnitInterval | null;
}

export interface AuthorByline extends Byline {
  author: Author;

  byline: Markup;

  image?: Image | null;
}

export interface ExpirableFlag {
  type: Flag;

  expiryTime?: DateTime | null;
}

export interface Video {
  id: Uuid;

  caption?: string | null;

  title?: string | null;

  brightcovePolicyKey?: string | null;

  brightcovePlayerId?: string | null;

  brightcoveVideoId?: string | null;

  brightcoveAccountId?: string | null;

  posterImage?: Image | null;

  is360?: boolean | null;
}

/** An article presentation */
export interface Tile {
  articleId: Uuid;

  article: Article;

  headline?: string | null;

  leadAsset?: Media | null;

  strapline?: string | null;

  teaser?: Markup | null;

  slices?: (ArticleSlice | null)[] | null;
}

export interface Topic {
  id?: string | null;

  articles?: TopicArticles | null;
  /** A short sentence to describe the topic */
  description?: RichText | null;

  name: string;

  slug: Slug;

  articleConnection: TopicArticleConnection;

  tagConnection: TopicTagConnection;

  createdAt?: DateTime | null;

  updatedAt?: DateTime | null;
}

export interface TopicArticles {
  /** The number of articles in a given topic */
  count?: number | null;
  /** List of articles associated with that topic */
  list: Article[];
}

export interface TopicArticleConnection {
  nodes: Article[];

  pageInfo?: PageInfo | null;

  totalCount?: number | null;
}

export interface PageInfo {
  startCursor?: Cursor | null;

  endCursor?: Cursor | null;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

export interface TopicTagConnection {
  edges: TopicTagEdge[];

  nodes: Tag[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TopicTagEdge {
  node?: Tag | null;

  cursor?: Cursor | null;

  scoreThreshold?: number | null;
}

export interface Tag {
  id: Uuid;

  primarySynonym: Synonym;

  description?: string | null;

  synonyms: SynonymConnection;

  articles: TagArticleConnection;
}

export interface Synonym {
  id: Uuid;

  tagId: Uuid;

  name: string;

  type: SynonymType;
}

export interface SynonymConnection {
  nodes: (Synonym | null)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TagArticleConnection {
  edges?: (TagArticleEdge | null)[] | null;

  nodes: (Article | null)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TagArticleEdge {
  node: Article;

  cursor: Cursor;

  combinedScore: number;

  scoreOverride?: number | null;
}

export interface ArticleTagConnection {
  edges: (ArticleTagEdge | null)[];

  nodes: (Tag | null)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface ArticleTagEdge {
  node: Tag;

  cursor: Cursor;

  combinedScore: number;

  scoreOverride?: number | null;
}

export interface ArticleSynonymConnection {
  edges: (ArticleSynonymEdge | null)[];

  nodes: (Synonym | null)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface ArticleSynonymEdge {
  node: Synonym;

  cursor: Cursor;

  score: number;
}

export interface ArticleTopicConnection {
  nodes: Topic[];

  pageInfo?: PageInfo | null;

  totalCount?: number | null;
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
  /** The region the edition is intended for */
  region?: Region | null;
  /** The date & time that the edition was published (contrast with `date`) */
  publishedTime?: DateTime | null;

  updatedTime?: DateTime | null;

  sections?: (Section | null)[] | null;
  /** Current version of the edition (used primarily for caching) */
  revision: BigInt;
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

export interface TagConnection {
  nodes: (Tag | null)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TopicConnection {
  nodes: Topic[];

  pageInfo: PageInfo;

  totalCount: number;
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

export interface ArticleTagUpsertResult {
  id: Uuid;
}

export interface ArticleUpsertResult {
  id: Uuid;
}

/** A leading comment article and a cartoon (comment-lead-and-cartoon) */
export interface CommentLeadAndCartoonSlice extends ArticleSlice {
  lead: Tile;

  cartoon: Tile;

  items: Tile[];

  sections: Section[];
}

/** Two comment articles and a notebook article (comment-2-and-notebook) */
export interface CommentTwoAndNotebookSlice extends ArticleSlice {
  main1: Tile;

  main2: Tile;

  notebook: Tile;

  items: Tile[];

  sections: Section[];
}

/** The daily universal register slice */
export interface DailyUniversalRegister {
  briefing: DailyUniversalRegisterItem;

  onThisDay: DailyUniversalRegisterItem;

  natureNotes: DailyUniversalRegisterItem;

  birthdaysToday: DailyUniversalRegisterItem;

  items: DailyUniversalRegisterItem[];
}

/** A piece of the daily universal register */
export interface DailyUniversalRegisterItem {
  title: string;

  byline?: Markup | null;

  content: Markup;
}

/** Any number of articles with no opinion on the layout/importance of any */
export interface Default extends Layout {
  template?: Template | null;
}

export interface EditionUpsertResult {
  id: Uuid;
}

/** A focus article (focus) */
export interface FocusSlice extends ArticleSlice {
  main: Tile;

  items: Tile[];

  sections: Section[];
}

/** A special type of banner containing articles which is displayed at the top the new sections */
export interface InTheNewsSlice {
  items: Tile[];

  sections: Section[];
}

/** Three articles with one that has more importance over the others denoted by themain ID. Would usually be associated with a list of articles */
export interface LeadAndTwo extends Layout {
  template?: Template | null;

  main?: Uuid | null;

  lead?: Uuid | null;
}

/** Three leader articles (leaders) */
export interface LeadersSlice extends ArticleSlice {
  leader1: Tile;

  leader2: Tile;

  leader3: Tile;

  items: Tile[];

  sections: Section[];
}

/** A lead article and four supporting articles (supplement-lead-and-4-stack) */
export interface LeadOneAndFourSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];

  sections: Section[];
}

/** A lead article and a supporting article (lead-1-and-1) */
export interface LeadOneAndOneSlice extends ArticleSlice {
  lead: Tile;

  support: Tile;

  items: Tile[];

  sections: Section[];
}

/** A lead article and two supporting articles. This slice can also represent leadrelated articles slice of the same name (lead-1-and-2-puffs,related-links-lead-and-2) */
export interface LeadOneAndTwoSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
}

/** One full width lead article on its own (lead-1-full-width) */
export interface LeadOneFullWidthSlice extends ArticleSlice {
  lead: Tile;

  items: Tile[];

  sections: Section[];
}

/** A lead module and supporting and portrait modules (lead-1-no-pic-and-1-and-portrait) */
export interface LeadOneNoPicAndOneAndPortraitSlice extends ArticleSlice {
  lead: Tile;

  support: Tile;

  portrait: Tile;

  items: Tile[];

  sections: Section[];
}

/** Two leads without pictures along and a pair of supporting articles (lead-2-no-pic-and-2) */
export interface LeadTwoNoPicAndTwoSlice extends ArticleSlice {
  lead1: Tile;

  lead2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
}

/** Trio of letter, thunderer and podcast articles (comment-1-letters-thunderer) */
export interface LetterThundererPodcastSlice extends ArticleSlice {
  letter: Tile;

  thunderer: Tile;

  podcast: Tile;

  items: Tile[];

  sections: Section[];
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

/** Fallback slice without any prescribed presentation, replaces standard related-links slice (related-links) */
export interface StandardSlice extends ArticleSlice {
  items: Tile[];

  sections: Section[];
}

/** A supplement lead article and four supporting articles (replacing LeadOneAndFourSlice). */
export interface SupplementLeadAndFourStackSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];

  sections: Section[];
}

/** Special obituary lead and two support articles (obituaries-lead-and-2) */
export interface ObituariesLeadAndTwoSlice extends ArticleSlice {
  lead: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
}

/** A lead opinion related articles slice (related-links-opinion-and-2) */
export interface OpinionOneAndTwoSlice extends ArticleSlice {
  opinion: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
}

/** Four secondary modules (secondary-4) */
export interface SecondaryFourSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  secondary3: Tile;

  secondary4: Tile;

  items: Tile[];

  sections: Section[];
}

/** A singular secondary module (secondary-1) */
export interface SecondaryOneSlice extends ArticleSlice {
  secondary: Tile;

  items: Tile[];

  sections: Section[];
}

/** A secondary module and a special supporting columnist module (secondary-1-and-columnist) */
export interface SecondaryOneAndColumnistSlice extends ArticleSlice {
  secondary: Tile;

  columnist: Tile;

  items: Tile[];

  sections: Section[];
}

/** A secondary module and four supporting articles (supplement-secondary-1-and-4) */
export interface SecondaryOneAndFourSlice extends ArticleSlice {
  secondary: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];

  sections: Section[];
}

/** A supplement secondary module and four supporting articles (replacing SecondaryOneAndFourSlice). */
export interface SupplementSecondaryOneAndFourSlice extends ArticleSlice {
  secondary: Tile;

  support1: Tile;

  support2: Tile;

  support3: Tile;

  support4: Tile;

  items: Tile[];

  sections: Section[];
}

/** Two secondary modules and supporting articles (secondary-2-and-2) */
export interface SecondaryTwoAndTwoSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
}

/** Two secondary modules, without an image, and supporting articles (secondary-2-no-pic-and-2) */
export interface SecondaryTwoNoPicAndTwoSlice extends ArticleSlice {
  secondary1: Tile;

  secondary2: Tile;

  support1: Tile;

  support2: Tile;

  items: Tile[];

  sections: Section[];
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

  sections: Section[];
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

  hideOnMobile: boolean;

  image: Image;
}

/** Three articles with one that has more importance over the others denoted by themain ID. Would usually be associated with a list of articles */
export interface OpinionAndTwo extends Layout {
  template?: Template | null;

  main?: Uuid | null;

  opinion?: Uuid | null;
}

export interface SectionUpdateResult {
  id: Uuid;
}

export interface SliceUpdateResult {
  id: Uuid;
}

export interface TagMergeResult {
  primaryTagId?: Uuid | null;
}

export interface TagSplitResult {
  primaryTagId: Uuid;

  secondaryTagId: Uuid;
}

export interface TagUpdateResult {
  id: Uuid;
}

export interface TopicCreateResult {
  topicId: Uuid;
}

export interface TopicRemoveResult {
  slug?: Slug | null;
}

export interface TopicTagLinkResult {
  topicId?: Uuid | null;
}

export interface TopicTagRemoveResult {
  tagId?: Uuid | null;
}

export interface TopicUpdateResult {
  topicId: Uuid;
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

  minRevision?: BigInt | null;
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
export interface TagQueryArgs {
  id: string;
}
export interface TagsQueryArgs {
  ids?: string[] | null;

  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;

  dateFilter?: DateFilter | null;

  term?: string | null;

  isOverflow?: boolean | null;
}
export interface TopicQueryArgs {
  slug?: Slug | null;

  id?: string | null;
}
export interface TopicsQueryArgs {
  cursor?: Cursor | null;

  first?: number | null;
}
export interface ListAuthorArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number | null;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface ContentArticleArgs {
  /** If a teaser is required, use to truncate the article content by words. Ifthe client doesn't have permission for the content, the maximum will be thelesser of the predefined teaser length and requested maximum */
  maxWordCount?: number | null;
  /** If summary text is required, use to truncate the article content bycharacters. If the client doesn't have permission for the content, themaximum will be the lesser of the predefined teaser length and requestedmaximum. Has no effect if maxWordCount is specified */
  maxCharCount?: number | null;
}
export interface SummaryArticleArgs {
  maxCharCount?: number | null;
}
export interface TopicsArticleArgs {
  maxCount?: number | null;
}
export interface TagsArticleArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface SynonymsArticleArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface TopicConnectionArticleArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface CropImageArgs {
  ratio: Ratio;
}
export interface TeaserTileArgs {
  maxCharCount?: number | null;
}
export interface ArticleConnectionTopicArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface TagConnectionTopicArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface ListTopicArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number | null;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number | null;
}
export interface SynonymsTagArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
}
export interface ArticlesTagArgs {
  cursor?: Cursor | null;

  first?: number | null;

  desc?: boolean | null;
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
  /** Grouping options, useful to deduplicate results */
  group?: EditionGroupOptions | null;
  /** Region filter, to get the editions for a specific region */
  region?: Region | null;
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
// Unions
// ====================================================

export type ArticleByline = TextByline | AuthorByline;

export type Media = Image | Video;

export type MagazineSectionSlice =
  | StandardSlice
  | CommentLeadAndCartoonSlice
  | LetterThundererPodcastSlice
  | CommentTwoAndNotebookSlice
  | FocusSlice
  | LeadersSlice
  | LeadOneAndFourSlice
  | SupplementLeadAndFourStackSlice
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
  | SupplementSecondaryOneAndFourSlice
  | SecondaryTwoAndTwoSlice
  | SecondaryTwoNoPicAndTwoSlice
  | TwoPicAndSixNoPicSlice
  | PuffSlice;

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
  | SupplementLeadAndFourStackSlice
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
  | SupplementSecondaryOneAndFourSlice
  | SecondaryTwoAndTwoSlice
  | SecondaryTwoNoPicAndTwoSlice
  | TwoPicAndSixNoPicSlice
  | PuffSlice
  | DailyUniversalRegister;

export type PuzzleSectionSlice = Puzzle | PuffSlice;
