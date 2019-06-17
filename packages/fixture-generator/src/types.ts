export type Maybe<T> = T | null;

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
  leadAsset?: Maybe<MediaInput>;

  listingAsset?: Maybe<MediaInput>;

  authors: Slug[];

  byline: Markup;

  bylines?: Maybe<(Maybe<BylineInput>)[]>;

  backgroundColour?: Maybe<ColourInput>;

  dropcapsDisabled: boolean;

  expirableFlags: ExpirableFlagInput[];

  headline?: Maybe<string>;

  shortHeadline?: Maybe<string>;

  id: Uuid;

  label?: Maybe<string>;

  commentsEnabled: boolean;

  commentsPreModerated?: Maybe<boolean>;

  commercialTags: string[];

  commercialSectionTags?: Maybe<string[]>;

  section?: Maybe<SectionName>;

  publicationName: PublicationName;

  publishedTime: DateTime;

  relatedArticleSlice?: Maybe<ArticleSliceInput>;

  textColour?: Maybe<ColourInput>;

  savingEnabled: boolean;

  sharingEnabled: boolean;

  slug: Slug;

  standfirst?: Maybe<string>;

  strapline?: Maybe<string>;

  updatedTime: DateTime;

  isLegacy: boolean;

  content: ContentFragmentInput[];

  template?: Maybe<TemplateType>;
}

export interface MediaInput {
  image?: Maybe<ImageInput>;

  video?: Maybe<VideoInput>;
}

export interface ImageInput {
  id: Uuid;

  title: string;

  caption?: Maybe<string>;

  credits?: Maybe<string>;

  crops: CropInput[];
}

export interface CropInput {
  imageId: string;

  ratio: Ratio;

  horizontalOffset: number;

  verticalOffset: number;

  width: number;

  height: number;

  sourceWidth?: Maybe<number>;

  sourceHeight?: Maybe<number>;
}

export interface VideoInput {
  id: Uuid;

  caption?: Maybe<string>;

  title?: Maybe<string>;

  brightcovePolicyKey: string;

  brightcovePlayerId: string;

  brightcoveVideoId: string;

  brightcoveAccountId: string;

  paidOnly: boolean;

  skySports: boolean;

  posterImage: ImageInput;

  is360?: Maybe<boolean>;
}

export interface BylineInput {
  byline: Markup;

  author?: Maybe<Slug>;

  image?: Maybe<ImageInput>;
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
  duration?: Maybe<number>;
}

export interface ArticleSliceInput {
  standardSlice?: Maybe<StandardSliceInput>;

  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;

  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;
}

export interface StandardSliceInput {
  items: TileInput[];
}

export interface TileInput {
  articleId: Uuid;

  headline?: Maybe<string>;

  leadAsset?: Maybe<MediaInput>;

  strapline?: Maybe<string>;

  teaser?: Maybe<Markup>;
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
  richText?: Maybe<RichTextFragmentInput>;

  image?: Maybe<ImageFragmentInput>;

  video?: Maybe<VideoFragmentInput>;

  interactive?: Maybe<InteractiveFragmentInput>;
}

export interface RichTextFragmentInput {
  richText: RichText;
}

export interface ImageFragmentInput {
  metadata: ContentFragmentMetadataInput;

  image: ImageInput;
}

export interface ContentFragmentMetadataInput {
  display?: Maybe<Display>;
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

  caption?: Maybe<string>;

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
  image?: Maybe<Url>;
  /** Twitter handle for an author */
  twitter?: Maybe<string>;

  hasLeadAssets: boolean;
}

export interface AuthorUpdateInput {
  name: string;

  jobTitle: string;

  biography: Markup;
  /** URL for the image of an author */
  image?: Maybe<Url>;
  /** Twitter handle for an author */
  twitter?: Maybe<string>;

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
  min?: number;

  max?: Maybe<number>;
}

export interface CreateTagInput {
  tagId?: Maybe<string>;

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

  byline?: Maybe<Markup>;

  content: Markup;
}

export interface EditionInput {
  id: Uuid;

  updateText: string;

  date: ShortDate;

  publicationName: PublicationName;

  region?: Maybe<Region>;

  publishedTime: DateTime;

  updatedTime: DateTime;

  sections?: Maybe<(Maybe<SectionInput>)[]>;
}

export interface SectionInput {
  standardSection?: Maybe<StandardSectionInput>;

  puzzleSection?: Maybe<PuzzleSectionInput>;

  magazineSection?: Maybe<MagazineSectionInput>;
}

export interface StandardSectionInput {
  id: Uuid;

  title?: Maybe<string>;

  slug: Slug;

  colour: ColourInput;

  slices: (Maybe<StandardSectionSliceInput>)[];
}

export interface StandardSectionSliceInput {
  standardSlice?: Maybe<StandardSliceInput>;

  commentLeadAndCartoonSlice?: Maybe<CommentLeadAndCartoonSliceInput>;

  letterThundererPodcastSlice?: Maybe<LetterThundererPodcastSliceInput>;

  commentTwoAndNotebookSlice?: Maybe<CommentTwoAndNotebookSliceInput>;

  focusSlice?: Maybe<FocusSliceInput>;

  leadersSlice?: Maybe<LeadersSliceInput>;

  leadOneAndFourSlice?: Maybe<LeadOneAndFourSliceInput>;

  supplementLeadAndFourStackSlice?: Maybe<SupplementLeadAndFourStackSliceInput>;

  leadOneAndOneSlice?: Maybe<LeadOneAndOneSliceInput>;

  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;

  leadOneFullWidthSlice?: Maybe<LeadOneFullWidthSliceInput>;

  leadOneNoPicAndOneAndPortraitSlice?: Maybe<
    LeadOneNoPicAndOneAndPortraitSliceInput
  >;

  leadTwoNoPicAndTwoSlice?: Maybe<LeadTwoNoPicAndTwoSliceInput>;

  obituariesLeadAndTwoSlice?: Maybe<ObituariesLeadAndTwoSliceInput>;

  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;

  secondaryFourSlice?: Maybe<SecondaryFourSliceInput>;

  secondaryOneSlice?: Maybe<SecondaryOneSliceInput>;

  secondaryOneAndColumnistSlice?: Maybe<SecondaryOneAndColumnistSliceInput>;

  secondaryOneAndFourSlice?: Maybe<SecondaryOneAndFourSliceInput>;

  supplementSecondaryOneAndFourSlice?: Maybe<
    SupplementSecondaryOneAndFourSliceInput
  >;

  secondaryTwoAndTwoSlice?: Maybe<SecondaryTwoAndTwoSliceInput>;

  secondaryTwoNoPicAndTwoSlice?: Maybe<SecondaryTwoNoPicAndTwoSliceInput>;

  twoPicAndSixNoPicSlice?: Maybe<TwoPicAndSixNoPicSliceInput>;

  puff?: Maybe<PuffSliceInput>;

  inTheNews?: Maybe<InTheNewsSliceInput>;

  dailyUniversalRegister?: Maybe<DailyUniversalRegisterInput>;
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

  title?: Maybe<string>;

  slug: Slug;

  colour: ColourInput;

  slices: (Maybe<PuzzleSectionSliceInput>)[];
}

export interface PuzzleSectionSliceInput {
  puzzle?: Maybe<PuzzleInput>;

  puff?: Maybe<PuffSliceInput>;
}

export interface PuzzleInput {
  id: Uuid;

  title: string;

  url: Url;

  hideOnMobile?: Maybe<boolean>;

  image: ImageInput;
}

export interface MagazineSectionInput {
  id: Uuid;

  title?: Maybe<string>;

  slug: Slug;

  colour: ColourInput;

  cover: ImageInput;

  slices: (Maybe<MagazineSectionSliceInput>)[];
}

export interface MagazineSectionSliceInput {
  standardSlice?: Maybe<StandardSliceInput>;

  commentLeadAndCartoonSlice?: Maybe<CommentLeadAndCartoonSliceInput>;

  letterThundererPodcastSlice?: Maybe<LetterThundererPodcastSliceInput>;

  commentTwoAndNotebookSlice?: Maybe<CommentTwoAndNotebookSliceInput>;

  focusSlice?: Maybe<FocusSliceInput>;

  leadersSlice?: Maybe<LeadersSliceInput>;

  leadOneAndFourSlice?: Maybe<LeadOneAndFourSliceInput>;

  supplementLeadAndFourStackSlice?: Maybe<SupplementLeadAndFourStackSliceInput>;

  leadOneAndOneSlice?: Maybe<LeadOneAndOneSliceInput>;

  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;

  leadOneFullWidthSlice?: Maybe<LeadOneFullWidthSliceInput>;

  leadOneNoPicAndOneAndPortraitSlice?: Maybe<
    LeadOneNoPicAndOneAndPortraitSliceInput
  >;

  leadTwoNoPicAndTwoSlice?: Maybe<LeadTwoNoPicAndTwoSliceInput>;

  obituariesLeadAndTwoSlice?: Maybe<ObituariesLeadAndTwoSliceInput>;

  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;

  secondaryFourSlice?: Maybe<SecondaryFourSliceInput>;

  secondaryOneSlice?: Maybe<SecondaryOneSliceInput>;

  secondaryOneAndColumnistSlice?: Maybe<SecondaryOneAndColumnistSliceInput>;

  secondaryOneAndFourSlice?: Maybe<SecondaryOneAndFourSliceInput>;

  supplementSecondaryOneAndFourSlice?: Maybe<
    SupplementSecondaryOneAndFourSliceInput
  >;

  secondaryTwoAndTwoSlice?: Maybe<SecondaryTwoAndTwoSliceInput>;

  secondaryTwoNoPicAndTwoSlice?: Maybe<SecondaryTwoNoPicAndTwoSliceInput>;

  twoPicAndSixNoPicSlice?: Maybe<TwoPicAndSixNoPicSliceInput>;

  puff?: Maybe<PuffSliceInput>;
}

export interface InTheNewsSectionItemInput {
  inTheNews?: Maybe<InTheNewsSliceInput>;
}

export interface PaginateArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}

export interface PuffMainLinkInput {
  tile?: Maybe<TileInput>;

  namedLink?: Maybe<NamedLinkInput>;
}

export interface PuffSectionItemInput {
  puff?: Maybe<PuffSliceInput>;
}

export interface PuffTopicLinkInput {
  standardSection?: Maybe<StandardSectionInput>;

  puzzleSection?: Maybe<PuzzleSectionInput>;

  namedLink?: Maybe<NamedLinkInput>;
}

export interface TagUpdateInput {
  description: string;
}

export interface TopicInput {
  name: string;

  slug: Slug;

  description?: Maybe<RichText>;
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

/** The `BigInt` scalar type represents non-fractional signed whole numeric values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1. */
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

  image?: Maybe<Image>;
}

/** A selection of template types that have opinions over how they should be presented. Usually used within the context of an associated list of articles */
export interface Layout {
  template?: Maybe<Template>;
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
  author?: Maybe<Author>;

  authors?: Maybe<(Maybe<Author>)[]>;

  article?: Maybe<Article>;

  articles?: Maybe<Articles>;

  edition?: Maybe<Edition>;

  editions?: Maybe<EditionsPaged>;

  section?: Maybe<Section>;

  sports: Sport[];

  sportCompetition?: Maybe<SportCompetition>;

  tag?: Maybe<Tag>;

  tags?: Maybe<TagConnection>;

  topic?: Maybe<Topic>;

  topics?: Maybe<TopicConnection>;
  /** The currently authenticated user */
  viewer?: Maybe<User>;
}

/** An author of a piece of writing */
export interface Author {
  id: string;

  articles?: Maybe<AuthorArticles>;

  biography?: Maybe<Markup>;
  /** URL for the image of an author */
  image?: Maybe<Url>;

  jobTitle?: Maybe<string>;
  /** The name of the author */
  name: string;
  /** Some authors have poor article lead assets, this flag denotes that the lead assets are useful for presentation purposes */
  hasLeadAssets?: Maybe<boolean>;
  /** Twitter handle for an author (can be an empty string) */
  twitter?: Maybe<string>;

  slug?: Maybe<Slug>;
}

export interface AuthorArticles {
  /** The number of articles written by an author */
  count?: Maybe<number>;
  /** List of articles written by an author */
  list?: Maybe<(Maybe<Article>)[]>;
}

export interface Article {
  /** Used for indepth templates to define the background colour to be used. */
  backgroundColour?: Maybe<Colour>;
  /** An AST of one or more authors that may contain job titles and/or locations */
  byline?: Maybe<Markup>;
  /** Text or structured bylines for one or more authors */
  bylines?: Maybe<(Maybe<ArticleByline>)[]>;
  /** The content for the article in the shape of an AST */
  content?: Maybe<Markup>;
  /** The paywalled content for the article in the shape of an AST. After the free content, the rest of the markup is wrapped in a paywall element to allow flexible sampling to work with a classname */
  paywalledContent?: Maybe<Markup>;
  /** Ability to disable dropcaps even if the given template has them by default */
  dropcapsDisabled?: Maybe<boolean>;
  /** A list of time dependent with pair dependencies */
  flags?: Maybe<(Maybe<Flag>)[]>;
  /** List of time dependent with expiry time */
  expirableFlags?: Maybe<(Maybe<ExpirableFlag>)[]>;
  /** Whether or not the article contains a video (as a lead asset or an inline video, or both) */
  hasVideo?: Maybe<boolean>;
  /** A longer SEO headline. Note this might not be populated so please use 'shortHeadline' as a fallback. */
  headline?: Maybe<string>;

  id: Uuid;
  /** A user specific flag that indicates whether the article has been bookmarked (saved) by the user. This property can only be accessed by logged in users. */
  isBookmarked?: Maybe<boolean>;
  /** A free piece of text to describe an article */
  label?: Maybe<string>;
  /** A flag set outside of the commenting system, usually used for controversial articles */
  commentsEnabled?: Maybe<boolean>;
  /** The commenting system moderation policy for this article */
  commentsPreModerated?: Maybe<boolean>;
  /** The number of comments an article has */
  commentCount?: Maybe<number>;
  /** A rarely populated field that is a list of free text such as ["luxury", "ferrari"] */
  commercialTags?: Maybe<(Maybe<string>)[]>;
  /** A field that is populated from the article headline, a string delineated with commas such as ["this", "is", "a", "headline"] */
  keywords: string[];
  /** A shorter headline useful for when space is at a premium. Note this may return null so please use `headline` field as a fallback. */
  shortHeadline?: Maybe<string>;
  /** Hashed version of the article identifier */
  shortIdentifier?: Maybe<string>;
  /** The name of the segment that the article appears in, for example Sport in a newspaper */
  section?: Maybe<SectionName>;
  /** A field that is a list of free text for commercial section tags */
  commercialSectionTags?: Maybe<string[]>;

  leadAsset?: Maybe<Media>;

  listingAsset?: Maybe<Media>;

  publicationName: PublicationName;

  publishedTime?: Maybe<DateTime>;
  /** Date the article was first published */
  firstPublishedTime?: Maybe<DateTime>;

  updatedTime?: Maybe<DateTime>;
  /** Curated list of articles selected by editorial that appear at the end of an article */
  relatedArticles?: Maybe<(Maybe<Article>)[]>;
  /** Presentational information on how the related articles should be displayed */
  relatedArticlesLayout?: Maybe<Layout>;
  /** Related article slice */
  relatedArticleSlice?: Maybe<ArticleSlice>;

  savingEnabled?: Maybe<boolean>;

  sharingEnabled?: Maybe<boolean>;
  /** Customisable field in the CMS, that is by default a slugified version of the article title */
  slug?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the headline and typographically distinct from the rest of the article */
  standfirst?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the standfirst */
  strapline?: Maybe<string>;
  /** A predefined truncated version of the article with a max length of the teaser, can optionally choose a shorter length. Use this to avoid ACS. */
  summary?: Maybe<Markup>;
  /** Used for indepth templates to define the text colour to be used. */
  textColour?: Maybe<Colour>;
  /** The tiles that this article appears in */
  tiles?: Maybe<(Maybe<Tile>)[]>;

  title?: Maybe<string>;
  /** Used for tokenised article URL */
  tokenisedUrl?: Maybe<Url>;
  /** Topics that the requested article belong to */
  topics?: Maybe<(Maybe<Topic>)[]>;

  url?: Maybe<Url>;

  template?: Maybe<TemplateType>;

  tags?: Maybe<ArticleTagConnection>;

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

  image?: Maybe<Image>;
}

export interface Image {
  id: Uuid;

  title?: Maybe<string>;

  caption?: Maybe<string>;

  credits?: Maybe<string>;

  crop?: Maybe<Crop>;

  crops: Crop[];
}

/** The selected area for a given image and its ratio */
export interface Crop {
  ratio?: Maybe<Ratio>;

  url?: Maybe<Url>;

  relativeHorizontalOffset?: Maybe<UnitInterval>;

  relativeVerticalOffset?: Maybe<UnitInterval>;

  relativeWidth?: Maybe<UnitInterval>;

  relativeHeight?: Maybe<UnitInterval>;
}

export interface AuthorByline extends Byline {
  author: Author;

  byline: Markup;

  image?: Maybe<Image>;
}

export interface ExpirableFlag {
  type: Flag;

  expiryTime?: Maybe<DateTime>;
}

export interface Video {
  id: Uuid;

  caption?: Maybe<string>;

  title?: Maybe<string>;

  brightcovePolicyKey?: Maybe<string>;

  brightcovePlayerId?: Maybe<string>;

  brightcoveVideoId?: Maybe<string>;

  paidOnly?: Maybe<boolean>;

  skySports?: Maybe<boolean>;

  brightcoveAccountId?: Maybe<string>;

  posterImage?: Maybe<Image>;

  is360?: Maybe<boolean>;
}

/** An article presentation */
export interface Tile {
  articleId: Uuid;

  article: Article;

  headline?: Maybe<string>;

  leadAsset?: Maybe<Media>;

  strapline?: Maybe<string>;

  teaser?: Maybe<Markup>;

  slices?: Maybe<(Maybe<ArticleSlice>)[]>;
}

export interface Topic {
  id?: Maybe<string>;

  articles?: Maybe<TopicArticles>;
  /** A short sentence to describe the topic */
  description?: Maybe<RichText>;

  name: string;

  slug: Slug;

  articleConnection: TopicArticleConnection;

  tagConnection: TopicTagConnection;

  createdAt?: Maybe<DateTime>;

  updatedAt?: Maybe<DateTime>;
}

export interface TopicArticles {
  /** The number of articles in a given topic */
  count?: Maybe<number>;
  /** List of articles associated with that topic */
  list: Article[];
}

export interface TopicArticleConnection {
  nodes: Article[];

  pageInfo?: Maybe<PageInfo>;

  totalCount?: Maybe<number>;
}

export interface PageInfo {
  startCursor?: Maybe<Cursor>;

  endCursor?: Maybe<Cursor>;

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
  node?: Maybe<Tag>;

  cursor?: Maybe<Cursor>;

  scoreThreshold?: Maybe<number>;
}

export interface Tag {
  id: Uuid;

  primarySynonym: Synonym;

  description?: Maybe<string>;

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
  nodes: (Maybe<Synonym>)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TagArticleConnection {
  edges?: Maybe<(Maybe<TagArticleEdge>)[]>;

  nodes: (Maybe<Article>)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface TagArticleEdge {
  node: Article;

  cursor: Cursor;

  combinedScore: number;

  scoreOverride?: Maybe<number>;
}

export interface ArticleTagConnection {
  edges: (Maybe<ArticleTagEdge>)[];

  nodes: (Maybe<Tag>)[];

  pageInfo: PageInfo;

  totalCount: number;
}

export interface ArticleTagEdge {
  node: Tag;

  cursor: Cursor;

  combinedScore: number;

  scoreOverride?: Maybe<number>;
}

export interface ArticleSynonymConnection {
  edges: (Maybe<ArticleSynonymEdge>)[];

  nodes: (Maybe<Synonym>)[];

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

  pageInfo?: Maybe<PageInfo>;

  totalCount?: Maybe<number>;
}

export interface Articles {
  /** The number of articles that satisfy the filter */
  count?: Maybe<number>;

  list: (Maybe<Article>)[];
}

/** An edition for a single day */
export interface Edition {
  id: Uuid;
  /** Journalist inputted text which denotes the last time an edition was published */
  updateText?: Maybe<string>;
  /** The date that the edition is intended for, not necessarily the date it was published (contrast with `publishedTime`) */
  date?: Maybe<ShortDate>;

  publicationName: PublicationName;
  /** The region the edition is intended for */
  region?: Maybe<Region>;
  /** The date & time that the edition was published (contrast with `date`) */
  publishedTime?: Maybe<DateTime>;

  updatedTime?: Maybe<DateTime>;

  sections?: Maybe<(Maybe<Section>)[]>;
  /** Current version of the edition (used primarily for caching) */
  revision: BigInt;
}

/** A list of editions with pagination meta data */
export interface EditionsPaged {
  list?: Maybe<(Maybe<Edition>)[]>;
}

/** A sport in the sports video hub */
export interface Sport {
  id: Uuid;

  name: string;
  /** A list of competitions associated to a sport */
  competitions: (Maybe<SportCompetition>)[];
}

/** A sport competition in the sports video hub */
export interface SportCompetition {
  id: Uuid;

  name: string;
  /** Poster image of the most recent video of a competition */
  imageUrl?: Maybe<Url>;
  /** Non-vector logo for competition */
  logoUrl?: Maybe<Url>;
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

  subtitle?: Maybe<string>;

  posterImageUrl: Url;

  posterImageOverlayUrl?: Maybe<Url>;

  publishedTime: DateTime;

  updatedTime: DateTime;

  accountId: string;

  policyKey: string;
}

export interface TagConnection {
  nodes: (Maybe<Tag>)[];

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
  spotimCodeB?: Maybe<string>;

  bookmarks?: Maybe<PageOfBookmarks>;
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

  byline?: Maybe<Markup>;

  content: Markup;
}

/** Any number of articles with no opinion on the layout/importance of any */
export interface Default extends Layout {
  template?: Maybe<Template>;
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

/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface LeadAndTwo extends Layout {
  template?: Maybe<Template>;

  main?: Maybe<Uuid>;

  lead?: Maybe<Uuid>;
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

/** A lead article and two supporting articles. This slice can also represent lead related articles slice of the same name (lead-1-and-2-puffs, related-links-lead-and-2) */
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

/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface OpinionAndTwo extends Layout {
  template?: Maybe<Template>;

  main?: Maybe<Uuid>;

  opinion?: Maybe<Uuid>;
}

export interface SectionUpdateResult {
  id: Uuid;
}

export interface SliceUpdateResult {
  id: Uuid;
}

export interface TagMergeResult {
  primaryTagId?: Maybe<Uuid>;
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
  slug?: Maybe<Slug>;
}

export interface TopicTagLinkResult {
  topicId?: Maybe<Uuid>;
}

export interface TopicTagRemoveResult {
  tagId?: Maybe<Uuid>;
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
  updatedSince?: Maybe<DateTime>;

  ids?: Maybe<string[]>;

  shortIdentifier?: Maybe<string>;
}
export interface EditionQueryArgs {
  id: string;

  minRevision?: Maybe<BigInt>;
}
export interface EditionsQueryArgs {
  updatedSince?: Maybe<DateTime>;

  ids?: Maybe<string[]>;
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
  ids?: Maybe<string[]>;

  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;

  dateFilter?: Maybe<DateFilter>;

  term?: Maybe<string>;

  isOverflow?: Maybe<boolean>;
}
export interface TopicQueryArgs {
  slug?: Maybe<Slug>;

  id?: Maybe<string>;
}
export interface TopicsQueryArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;
}
export interface ListAuthorArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ContentArticleArgs {
  /** If a teaser is required, use to truncate the article content by words. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum */
  maxWordCount?: Maybe<number>;
  /** If summary text is required, use to truncate the article content by characters. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum. Has no effect if maxWordCount is specified */
  maxCharCount?: Maybe<number>;
}
export interface SummaryArticleArgs {
  maxCharCount?: Maybe<number>;
}
export interface TopicsArticleArgs {
  maxCount?: Maybe<number>;
}
export interface TagsArticleArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface SynonymsArticleArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface TopicConnectionArticleArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface CropImageArgs {
  ratio: Ratio;
}
export interface TeaserTileArgs {
  maxCharCount?: Maybe<number>;
}
export interface ArticleConnectionTopicArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface TagConnectionTopicArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface ListTopicArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface SynonymsTagArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface ArticlesTagArgs {
  cursor?: Maybe<Cursor>;

  first?: Maybe<number>;

  desc?: Maybe<boolean>;
}
export interface ListArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ListEditionsPagedArgs {
  /** The maximum number of editions you want to take, defaults to 10 */
  first?: number;
  /** The number of editions to skip over, useful for paging, defaults to 0 */
  skip?: number;
  /** Grouping options, useful to deduplicate results */
  group?: Maybe<EditionGroupOptions>;
  /** Region filter, to get the editions for a specific region */
  region?: Maybe<Region>;
}
export interface SpotimCodeBUserArgs {
  codeA: string;
}
export interface BookmarksUserArgs {
  first?: number;

  skip?: number;
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
