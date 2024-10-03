export type Maybe<T> = T | null;


export interface ArticleCategoryInput {
  
  id: Uuid;
  
  type?: Maybe<CategoryType>;
}

export interface ArticleInput {
  
  authors: Slug[];
  
  backgroundColour?: Maybe<ColourInput>;
  
  byline: Markup;
  
  bylines?: Maybe<(Maybe<BylineInput>)[]>;
  
  catchline?: Maybe<string>;
  
  categories?: Maybe<(Maybe<ArticleCategoryInput>)[]>;
  
  commentsEnabled: boolean;
  
  commentsPreModerated?: Maybe<boolean>;
  
  commercialSection?: Maybe<string>;
  
  commercialSectionTags?: Maybe<string[]>;
  
  commercialTags: string[];
  
  content: ContentFragmentInput[];
  
  contentType?: Maybe<ArticleContentType>;
  
  dataSource?: Maybe<DataSource>;
  
  dropcapsDisabled: boolean;
  
  embeddedContent?: Maybe<EmbeddedContentInput>;
  
  escenicId?: Maybe<number>;
  
  expirableFlags: ExpirableFlagInput[];
  
  headline?: Maybe<string>;
  
  id: Uuid;
  
  isLegacy: boolean;
  
  label?: Maybe<string>;
  
  leadAsset?: Maybe<MediaInput>;
  
  listingAsset?: Maybe<MediaInput>;
  
  parentId?: Maybe<Uuid>;
  
  publicationName: PublicationName;
  
  publishedTime: DateTime;
  
  relatedArticleSlice?: Maybe<ArticleSliceInput>;
  
  savingEnabled: boolean;
  
  section?: Maybe<SectionName>;
  
  seoDescription?: Maybe<string>;
  
  sharingEnabled: boolean;
  
  shortHeadline?: Maybe<string>;
  
  slug: Slug;
  
  standfirst?: Maybe<string>;
  
  strapline?: Maybe<string>;
  
  template?: Maybe<TemplateType>;
  
  textColour?: Maybe<ColourInput>;
  
  updatedTime: DateTime;
  
  workDesk?: Maybe<WorkDeskName>;
}

export interface ArticleRefInput {
  
  articleId: Uuid;
}

export interface ArticleSliceInput {
  
  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;
  
  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;
  
  standardSlice?: Maybe<StandardSliceInput>;
}

export interface ArticleTagScore {
  
  externalId: string;
  
  name: string;
  
  score: number;
  
  type: SynonymType;
}

export interface ArticleUpdateLinksInput {
  
  dateBefore: DateTime;
  
  dateSince: DateTime;
}

export interface AuthorBookmarkSaveInput {
  /** ID of resource being bookmarked */
  id: Uuid;
}

export interface AuthorBookmarkUnsaveInput {
  /** ID of resource being unbookmarked */
  id: Uuid;
}

export interface AuthorCreateInput {
  
  biography: Markup;
  
  contractualTitle?: Maybe<string>;
  
  hasLeadAssets: boolean;
  /** URL for the image of an author */
  image?: Maybe<Url>;
  
  jobTitle: string;
  
  metaDescription?: Maybe<string>;
  
  name: string;
  
  slug: Slug;
  /** Twitter handle for an author */
  twitter?: Maybe<string>;
}

export interface AuthorUpdateInput {
  
  biography: Markup;
  
  contractualTitle?: Maybe<string>;
  
  hasLeadAssets: boolean;
  /** URL for the image of an author */
  image?: Maybe<Url>;
  
  jobTitle: string;
  
  metaDescription?: Maybe<string>;
  
  name: string;
  /** Twitter handle for an author */
  twitter?: Maybe<string>;
}

export interface BookmarkSaveInput {
  /** ID of resource being bookmarked */
  id: Uuid;
}

export interface BookmarkUnsaveInput {
  /** ID of resource being unbookmarked */
  id: Uuid;
}

export interface BylineInput {
  
  author?: Maybe<Slug>;
  
  byline: Markup;
  
  image?: Maybe<ImageInput>;
}

export interface CategoryArticleRefInput {
  
  category: Slug;
  
  isComment?: Maybe<boolean>;
}

export interface CategoryHierarchyInput {
  
  categories: CategoryInput[];
}

export interface CategoryInput {
  
  id: Uuid;
  
  parent?: Maybe<Uuid>;
  
  slug: Slug;
  
  title: string;
}

export interface CollectionGroupInput {
  
  name: string;
  
  type: string;
}

export interface CollectionInput {
  
  category?: Maybe<Slug>;
  
  children?: Maybe<StandardPageSliceInput[]>;
  
  expireAt?: Maybe<DateTime>;
  
  group?: Maybe<CollectionGroupInput>;
  
  id?: Maybe<Uuid>;
  
  inheritedCollectionUuid?: Maybe<Uuid>;
  
  link?: Maybe<CollectionLinkInput>;
  
  publishAt?: Maybe<DateTime>;
  
  slices?: Maybe<StandardSectionSliceInput[]>;
  
  title?: Maybe<string>;
  
  topic?: Maybe<Slug>;
}

export interface CollectionLinkInput {
  
  linkSlug?: Maybe<Slug>;
  
  linkTitle?: Maybe<string>;
  
  linkType?: Maybe<CollectionLinkType>;
  
  url?: Maybe<string>;
}

export interface ColourInput {
  
  rgba: RgbaInput;
}

export interface CommentLeadAndCartoonSliceInput {
  
  cartoon: TileInput;
  
  lead: TileInput;
}

export interface CommentTwoAndNotebookSliceInput {
  
  main1: TileInput;
  
  main2: TileInput;
  
  notebook: TileInput;
}

export interface ContainerSliceInput {
  
  collection: CollectionInput;
}

export interface ContentFragmentInput {
  
  image?: Maybe<ImageFragmentInput>;
  
  interactive?: Maybe<InteractiveFragmentInput>;
  
  richText?: Maybe<RichTextFragmentInput>;
  
  video?: Maybe<VideoFragmentInput>;
}

export interface ContentFragmentMetadataInput {
  
  display?: Maybe<Display>;
}

export interface CostComplexity {
  
  max?: Maybe<number>;
  
  min?: number;
}

export interface CreateTagInput {
  
  externalId: string;
  
  name: string;
  
  tagId?: Maybe<string>;
  
  type: SynonymType;
}

export interface CropInput {
  
  chpId?: Maybe<string>;
  
  height: number;
  
  horizontalOffset: UnsignedInt;
  
  imageId: string;
  
  ratio: Ratio;
  
  sourceHeight?: Maybe<number>;
  
  sourceWidth?: Maybe<number>;
  
  verticalOffset: UnsignedInt;
  
  width: number;
}

export interface CustomComponentInput {
  
  name: string;
  
  parameters?: Maybe<string>;
  
  url: string;
}

export interface DailyUniversalRegisterInput {
  
  birthdaysToday: DailyUniversalRegisterItemInput;
  
  briefing: DailyUniversalRegisterItemInput;
  
  natureNotes: DailyUniversalRegisterItemInput;
  
  onThisDay: DailyUniversalRegisterItemInput;
}

export interface DailyUniversalRegisterItemInput {
  
  byline?: Maybe<Markup>;
  
  content: Markup;
  
  title: string;
}

export interface DateFilter {
  
  from: DateTime;
  
  to: DateTime;
}
/** all the booleans were left as we can default them to false/true in Ingest depending on the field arrays were left as required because we can supply empty ones these comments should be deleted before merging!!! */
export interface DraftArticleInput {
  
  authors: Slug[];
  
  backgroundColour?: Maybe<ColourInput>;
  
  byline?: Maybe<Markup>;
  
  bylines?: Maybe<BylineInput[]>;
  
  catchline?: Maybe<string>;
  
  categories?: Maybe<(Maybe<ArticleCategoryInput>)[]>;
  
  commentsEnabled: boolean;
  
  commentsPreModerated?: Maybe<boolean>;
  
  commercialSection?: Maybe<string>;
  
  commercialSectionTags?: Maybe<string[]>;
  
  commercialTags: string[];
  /** same thing as with ArticleSliceInput, there is an ImageInput which has a required title which we may default to an empty string */
  content: ContentFragmentInput[];
  
  contentType?: Maybe<ArticleContentType>;
  
  dataSource?: Maybe<DataSource>;
  
  dropcapsDisabled: boolean;
  /** we can use this field if we are ok with the required content which we could default to an empty string in Ingest */
  embeddedContent?: Maybe<EmbeddedContentInput>;
  
  escenicId?: Maybe<number>;
  
  expirableFlags: ExpirableFlagInput[];
  
  headline?: Maybe<string>;
  
  id: Uuid;
  
  isLegacy: boolean;
  
  label?: Maybe<string>;
  /** we can use MediaInput only if we are ok with the required title */
  leadAsset?: Maybe<MediaInput>;
  
  listingAsset?: Maybe<MediaInput>;
  
  parentId?: Maybe<Uuid>;
  
  publicationName: PublicationName;
  /** may appear when previewing a published article */
  publishedTime?: Maybe<DateTime>;
  /** we can use the same input as it only specifies articles by UUID the only problem is MediaInput which has a required 'title' field which we could default to an empty string in Ingest */
  relatedArticleSlice?: Maybe<DraftArticleSliceInput>;
  
  savingEnabled: boolean;
  
  scheduledTime?: Maybe<DateTime>;
  
  section?: Maybe<SectionName>;
  
  seoDescription?: Maybe<string>;
  
  sharingEnabled: boolean;
  
  shortHeadline?: Maybe<string>;
  
  slug?: Maybe<Slug>;
  
  standfirst?: Maybe<string>;
  
  strapline?: Maybe<string>;
  
  template?: Maybe<TemplateType>;
  
  textColour?: Maybe<ColourInput>;
  /** always available from Methode */
  updatedTime: DateTime;
  
  workDesk?: Maybe<WorkDeskName>;
}

export interface DraftArticleSliceInput {
  
  leadOneAndTwoSlice?: Maybe<DraftLeadOneAndTwoSliceInput>;
  
  opinionOneAndTwoSlice?: Maybe<DraftOpinionOneAndTwoSliceInput>;
  
  standardSlice?: Maybe<DraftStandardSliceInput>;
}

export interface DraftLeadOneAndTwoSliceInput {
  
  lead: DraftTileInput;
  
  support1: DraftTileInput;
  
  support2: DraftTileInput;
}

export interface DraftOpinionOneAndTwoSliceInput {
  
  opinion: DraftTileInput;
  
  support1: DraftTileInput;
  
  support2: DraftTileInput;
}

export interface DraftStandardSliceInput {
  
  items: DraftTileInput[];
}

export interface DraftTileInput {
  
  articleId?: Maybe<Uuid>;
  
  draftArticleId?: Maybe<Uuid>;
  
  headline?: Maybe<string>;
  
  leadAsset?: Maybe<MediaInput>;
  
  strapline?: Maybe<string>;
  
  teaser?: Maybe<Markup>;
}

export interface EditionInput {
  
  date: ShortDate;
  
  forceUpdate?: Maybe<boolean>;
  
  id: Uuid;
  
  publicationName: PublicationName;
  
  publishedTime: DateTime;
  
  region?: Maybe<Region>;
  
  sections?: Maybe<(Maybe<SectionInput>)[]>;
  
  updateText: string;
  
  updatedTime: DateTime;
}

export interface EmbeddedComponentResourceInput {
  
  name: string;
  
  url: string;
}

export interface EmbeddedContentElementInput {
  
  content: string;
  
  head?: Maybe<string>;
  
  scripts: EmbeddedComponentResourceInput[];
}

export interface EmbeddedContentInput {
  
  authorised: EmbeddedContentElementInput;
  
  unauthorised: EmbeddedContentElementInput;
}

export interface ExpirableFlagInput {
  /** The number of seconds for which this flag applies following the publishedTime. Null would apply indefinitely. */
  duration?: Maybe<number>;
  
  type: Flag;
}

export interface ExternalRefImageInput {
  
  height: number;
  
  resizeUrl: string;
  
  url: string;
  
  width: number;
}

export interface ExternalRefInput {
  
  authorId?: Maybe<Uuid>;
  
  headline: string;
  
  image?: Maybe<ExternalRefImageInput>;
  
  label?: Maybe<string>;
  
  url: string;
}

export interface FocusSliceInput {
  
  main: TileInput;
}

export interface ImageFragmentInput {
  
  image: ImageInput;
  
  metadata: ContentFragmentMetadataInput;
}

export interface ImageInput {
  
  caption?: Maybe<string>;
  
  credits?: Maybe<string>;
  
  crops: CropInput[];
  
  id: Uuid;
  
  title: string;
}

export interface InTheNewsSectionItemInput {
  
  inTheNews?: Maybe<InTheNewsSliceInput>;
}

export interface InTheNewsSliceInput {
  
  items: PuffLiteInput[];
}

export interface InheritedArticleRefInput {
  
  isComment?: Maybe<boolean>;
}

export interface InteractiveElementInput {
  
  attributes: Dictionary;
  
  value: string;
}

export interface InteractiveFragmentInput {
  
  interactive: InteractiveInput;
  
  metadata: ContentFragmentMetadataInput;
}

export interface InteractiveInput {
  
  caption?: Maybe<string>;
  
  element: InteractiveElementInput;
  
  id: Uuid;
  
  url: Url;
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
  
  leadBullet1?: Maybe<TileInput>;
  
  leadBullet2?: Maybe<TileInput>;
  
  leadBullet3?: Maybe<TileInput>;
  
  support: TileInput;
}

export interface LeadOneAndTwoSliceInput {
  
  lead: TileInput;
  
  support1: TileInput;
  
  support2: TileInput;
}

export interface LeadOneFullWidthSliceInput {
  
  lead: TileInput;
}

export interface LeadOneNoPicAndOneAndPortraitSliceInput {
  
  lead: TileInput;
  
  portrait: TileInput;
  
  support: TileInput;
}

export interface LeadTwoNoPicAndTwoSliceInput {
  
  lead1: TileInput;
  
  lead1Bullet1?: Maybe<TileInput>;
  
  lead1Bullet2?: Maybe<TileInput>;
  
  lead1Bullet3?: Maybe<TileInput>;
  
  lead2: TileInput;
  
  support1: TileInput;
  
  support2: TileInput;
}

export interface LeadersSliceInput {
  
  leader1: TileInput;
  
  leader2: TileInput;
  
  leader3: TileInput;
}

export interface LetterThundererPodcastSliceInput {
  
  letter: TileInput;
  
  podcast: TileInput;
  
  thunderer: TileInput;
}

export interface MagazineSectionInput {
  
  colour: ColourInput;
  
  cover: ImageInput;
  
  id: Uuid;
  
  slices: (Maybe<MagazineSectionSliceInput>)[];
  
  slug: Slug;
  
  title?: Maybe<string>;
}

export interface MagazineSectionSliceInput {
  
  commentLeadAndCartoonSlice?: Maybe<CommentLeadAndCartoonSliceInput>;
  
  commentTwoAndNotebookSlice?: Maybe<CommentTwoAndNotebookSliceInput>;
  
  containerSlice?: Maybe<ContainerSliceInput>;
  
  focusSlice?: Maybe<FocusSliceInput>;
  
  leadOneAndFourSlice?: Maybe<LeadOneAndFourSliceInput>;
  
  leadOneAndOneSlice?: Maybe<LeadOneAndOneSliceInput>;
  
  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;
  
  leadOneFullWidthSlice?: Maybe<LeadOneFullWidthSliceInput>;
  
  leadOneNoPicAndOneAndPortraitSlice?: Maybe<LeadOneNoPicAndOneAndPortraitSliceInput>;
  
  leadTwoNoPicAndTwoSlice?: Maybe<LeadTwoNoPicAndTwoSliceInput>;
  
  leadersSlice?: Maybe<LeadersSliceInput>;
  
  letterThundererPodcastSlice?: Maybe<LetterThundererPodcastSliceInput>;
  
  obituariesLeadAndTwoSlice?: Maybe<ObituariesLeadAndTwoSliceInput>;
  
  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;
  
  puff?: Maybe<PuffSliceInput>;
  
  secondaryFourSlice?: Maybe<SecondaryFourSliceInput>;
  
  secondaryOneAndColumnistSlice?: Maybe<SecondaryOneAndColumnistSliceInput>;
  
  secondaryOneAndFourSlice?: Maybe<SecondaryOneAndFourSliceInput>;
  
  secondaryOneSlice?: Maybe<SecondaryOneSliceInput>;
  
  secondaryTwoAndTwoSlice?: Maybe<SecondaryTwoAndTwoSliceInput>;
  
  secondaryTwoNoPicAndTwoSlice?: Maybe<SecondaryTwoNoPicAndTwoSliceInput>;
  
  standardSlice?: Maybe<StandardSliceInput>;
  
  supplementLeadAndFourStackSlice?: Maybe<SupplementLeadAndFourStackSliceInput>;
  
  supplementSecondaryOneAndFourSlice?: Maybe<SupplementSecondaryOneAndFourSliceInput>;
  
  twoPicAndSixNoPicSlice?: Maybe<TwoPicAndSixNoPicSliceInput>;
}

export interface MediaInput {
  
  image?: Maybe<ImageInput>;
  
  video?: Maybe<VideoInput>;
}

export interface ObituariesLeadAndTwoSliceInput {
  
  lead: TileInput;
  
  support1: TileInput;
  
  support2: TileInput;
}

export interface OpinionOneAndTwoSliceInput {
  
  opinion: TileInput;
  
  support1: TileInput;
  
  support2: TileInput;
}

export interface PageBlockInput {
  
  collection?: Maybe<CollectionInput>;
}

export interface PageInput {
  
  body: PageBlockInput[];
  
  categoryId?: Maybe<Uuid>;
  
  datePublished: DateTime;
  
  dateUpdated: DateTime;
  
  description: string;
  
  id: Uuid;
  
  slug: Slug;
  
  socialCardImage: string;
  
  title: string;
  
  titleSeo: string;
}

export interface PageSliceInput {
  
  children: PageTileInput[];
  
  name: string;
}

export interface PageTileInput {
  
  articleRef?: Maybe<ArticleRefInput>;
  
  categoryArticleRef?: Maybe<CategoryArticleRefInput>;
  
  customComponent?: Maybe<CustomComponentInput>;
  
  externalRef?: Maybe<ExternalRefInput>;
  
  inheritedArticleRef?: Maybe<InheritedArticleRefInput>;
  
  topicArticleRef?: Maybe<TopicArticleRefInput>;
}

export interface PaginateArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}

export interface PaginatedPageSliceInput {
  
  name: string;
}

export interface PuffInput {
  
  colour: ColourInput;
  
  leadImage?: Maybe<ImageInput>;
  
  mainLink: PuffMainLinkInput;
  
  major: boolean;
  
  secondaryLink: PuffSecondaryLinkInput;
  
  strapline?: Maybe<string>;
  
  title: string;
}

export interface PuffLiteInput {
  
  leadImage: ImageInput;
  
  mainLink: PuffMainLinkInput;
  
  strapline: string;
  
  title: string;
}

export interface PuffMainLinkInput {
  
  articleId?: Maybe<Uuid>;
  
  link?: Maybe<string>;
}

export interface PuffSecondaryLinkInput {
  
  anchor?: Maybe<string>;
  
  articleId?: Maybe<Uuid>;
  
  label: string;
  
  link?: Maybe<string>;
}

export interface PuffSectionItemInput {
  
  puff?: Maybe<PuffSliceInput>;
}

export interface PuffSliceInput {
  
  items: PuffInput[];
}

export interface PuzzleInput {
  
  date?: Maybe<ShortDate>;
  
  difficulty?: Maybe<string>;
  
  group?: Maybe<string>;
  
  hideOnMobile?: Maybe<boolean>;
  
  id: Uuid;
  
  image: ImageInput;
  
  index?: Maybe<number>;
  
  shortIdentifier?: Maybe<string>;
  
  slug?: Maybe<string>;
  
  title: string;
  
  type?: Maybe<string>;
  
  url: Url;
}

export interface PuzzleSectionInput {
  
  colour: ColourInput;
  
  id: Uuid;
  
  slices: (Maybe<PuzzleSectionSliceInput>)[];
  
  slug: Slug;
  
  title?: Maybe<string>;
}

export interface PuzzleSectionSliceInput {
  
  puffSlice?: Maybe<PuffSliceInput>;
  
  puzzle?: Maybe<PuzzleInput>;
}

export interface RgbaInput {
  
  alpha: UnitInterval;
  
  blue: TinyInt;
  
  green: TinyInt;
  
  red: TinyInt;
}

export interface RichTextFragmentInput {
  
  richText: RichText;
}

export interface SecondaryFourSliceInput {
  
  secondary1: TileInput;
  
  secondary2: TileInput;
  
  secondary3: TileInput;
  
  secondary4: TileInput;
}

export interface SecondaryOneAndColumnistSliceInput {
  
  columnist: TileInput;
  
  secondary: TileInput;
}

export interface SecondaryOneAndFourSliceInput {
  
  secondary: TileInput;
  
  support1: TileInput;
  
  support2: TileInput;
  
  support3: TileInput;
  
  support4: TileInput;
}

export interface SecondaryOneSliceInput {
  
  secondary: TileInput;
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

export interface SectionInput {
  
  magazineSection?: Maybe<MagazineSectionInput>;
  
  puzzleSection?: Maybe<PuzzleSectionInput>;
  
  standardSection?: Maybe<StandardSectionInput>;
}

export interface StandardPageSliceInput {
  
  pageSlice?: Maybe<PageSliceInput>;
  
  paginatedPageSlice?: Maybe<PaginatedPageSliceInput>;
  
  topicAuthorSlice?: Maybe<TopicAuthorSliceInput>;
}

export interface StandardSectionInput {
  
  colour: ColourInput;
  
  id: Uuid;
  
  slices: (Maybe<StandardSectionSliceInput>)[];
  
  slug: Slug;
  
  title?: Maybe<string>;
}

export interface StandardSectionSliceInput {
  
  commentLeadAndCartoonSlice?: Maybe<CommentLeadAndCartoonSliceInput>;
  
  commentTwoAndNotebookSlice?: Maybe<CommentTwoAndNotebookSliceInput>;
  
  containerSlice?: Maybe<ContainerSliceInput>;
  
  dailyUniversalRegister?: Maybe<DailyUniversalRegisterInput>;
  
  focusSlice?: Maybe<FocusSliceInput>;
  
  inTheNewsSlice?: Maybe<InTheNewsSliceInput>;
  
  leadOneAndFourSlice?: Maybe<LeadOneAndFourSliceInput>;
  
  leadOneAndOneSlice?: Maybe<LeadOneAndOneSliceInput>;
  
  leadOneAndTwoSlice?: Maybe<LeadOneAndTwoSliceInput>;
  
  leadOneFullWidthSlice?: Maybe<LeadOneFullWidthSliceInput>;
  
  leadOneNoPicAndOneAndPortraitSlice?: Maybe<LeadOneNoPicAndOneAndPortraitSliceInput>;
  
  leadTwoNoPicAndTwoSlice?: Maybe<LeadTwoNoPicAndTwoSliceInput>;
  
  leadersSlice?: Maybe<LeadersSliceInput>;
  
  letterThundererPodcastSlice?: Maybe<LetterThundererPodcastSliceInput>;
  
  obituariesLeadAndTwoSlice?: Maybe<ObituariesLeadAndTwoSliceInput>;
  
  opinionOneAndTwoSlice?: Maybe<OpinionOneAndTwoSliceInput>;
  
  puffSlice?: Maybe<PuffSliceInput>;
  
  secondaryFourSlice?: Maybe<SecondaryFourSliceInput>;
  
  secondaryOneAndColumnistSlice?: Maybe<SecondaryOneAndColumnistSliceInput>;
  
  secondaryOneAndFourSlice?: Maybe<SecondaryOneAndFourSliceInput>;
  
  secondaryOneSlice?: Maybe<SecondaryOneSliceInput>;
  
  secondaryTwoAndTwoSlice?: Maybe<SecondaryTwoAndTwoSliceInput>;
  
  secondaryTwoNoPicAndTwoSlice?: Maybe<SecondaryTwoNoPicAndTwoSliceInput>;
  
  standardSlice?: Maybe<StandardSliceInput>;
  
  supplementLeadAndFourStackSlice?: Maybe<SupplementLeadAndFourStackSliceInput>;
  
  supplementSecondaryOneAndFourSlice?: Maybe<SupplementSecondaryOneAndFourSliceInput>;
  
  twoPicAndSixNoPicSlice?: Maybe<TwoPicAndSixNoPicSliceInput>;
}

export interface StandardSliceInput {
  
  items: TileInput[];
}

export interface SupplementLeadAndFourStackSliceInput {
  
  lead: TileInput;
  
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

export interface TagUpdateInput {
  
  description: string;
}

export interface TileInput {
  
  articleId: Uuid;
  
  headline?: Maybe<string>;
  
  leadAsset?: Maybe<MediaInput>;
  
  strapline?: Maybe<string>;
  
  teaser?: Maybe<Markup>;
}

export interface TopicArticleRefInput {
  
  isComment?: Maybe<boolean>;
  
  topic: Slug;
}

export interface TopicAuthorSliceInput {
  
  topic: Slug;
}

export interface TopicInput {
  
  description?: Maybe<RichText>;
  
  leadImage?: Maybe<ImageInput>;
  
  metaDescription?: Maybe<string>;
  
  name: string;
  
  slug: Slug;
}

export interface TopicTagInput {
  
  id: Uuid;
  
  scoreThreshold: number;
}

export interface TopicUpdateInput {
  
  description: RichText;
  
  leadImage?: Maybe<ImageInput>;
  
  metaDescription?: Maybe<string>;
  
  name: string;
  
  slug: Slug;
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

export interface VideoFragmentInput {
  
  metadata: ContentFragmentMetadataInput;
  
  video: VideoInput;
}

export interface VideoInput {
  
  brightcoveAccountId: string;
  
  brightcovePlayerId: string;
  
  brightcovePolicyKey: string;
  
  brightcoveVideoId: string;
  
  caption?: Maybe<string>;
  
  id: Uuid;
  
  is360?: Maybe<boolean>;
  
  paidOnly: boolean;
  
  posterImage: ImageInput;
  
  skySports: boolean;
  
  title?: Maybe<string>;
}

  export enum AccountSubscriptionCancellationAccessExpiry {
    EndOfCurrentBillingPeriod = "endOfCurrentBillingPeriod",
    EndOfNextBillingPeriod = "endOfNextBillingPeriod",
    Immediate = "immediate",
  }

  export enum ArticleContentType {
    Analysis = "analysis",
    Comment = "comment",
    Dispatch = "dispatch",
    Explainer = "explainer",
    Extract = "extract",
    Feature = "feature",
    Firstperson = "firstperson",
    Indepth = "indepth",
    Inpictures = "inpictures",
    Interview = "interview",
    Investigation = "investigation",
    Listicle = "listicle",
    Live = "live",
    Match = "match",
    News = "news",
    Obituary = "obituary",
    Podcast = "podcast",
    Preview = "preview",
    Profile = "profile",
    Qna = "qna",
    Recipe = "recipe",
    Report = "report",
    Review = "review",
    Sketch = "sketch",
    Special = "special",
    Timeline = "timeline",
    Video = "video",
    Visualstorytelling = "visualstorytelling",
  }

  export enum CacheControlScope {
    Private = "PRIVATE",
    Public = "PUBLIC",
  }

  export enum CategoryType {
    Primary = "PRIMARY",
    Secondary = "SECONDARY",
  }

  export enum CollectionLinkType {
    CustomLink = "CUSTOM_LINK",
    PageLink = "PAGE_LINK",
    TopicLink = "TOPIC_LINK",
  }

  export enum DataSource {
    Methode = "METHODE",
    Newspress = "NEWSPRESS",
  }

  export enum Display {
    Fullwidth = "fullwidth",
    Inline = "inline",
    Primary = "primary",
    Secondary = "secondary",
  }

  export enum EditionGroupOptions {
    Date = "date",
  }

  export enum Flag {
    Breaking = "BREAKING",
    Exclusive = "EXCLUSIVE",
    Live = "LIVE",
    New = "NEW",
    Sponsored = "SPONSORED",
    Updated = "UPDATED",
  }

  export enum PageSliceType {
    PageSlice = "PAGE_SLICE",
    TopicAuthorSlice = "TOPIC_AUTHOR_SLICE",
  }

  export enum PageStatus {
    Preview = "PREVIEW",
    Published = "PUBLISHED",
  }

  export enum PageTileType {
    ArticleReference = "ARTICLE_REFERENCE",
    CategoryArticleReference = "CATEGORY_ARTICLE_REFERENCE",
    CustomComponent = "CUSTOM_COMPONENT",
    TopicArticleReference = "TOPIC_ARTICLE_REFERENCE",
  }

  export enum PublicationName {
    Sundaytimes = "SUNDAYTIMES",
    Times = "TIMES",
  }

  export enum Region {
    Default = "default",
    Ireland = "ireland",
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
    World = "world",
  }

  export enum SynonymType {
    Band = "BAND",
    Brand = "BRAND",
    Campaign = "CAMPAIGN",
    Category = "CATEGORY",
    Competition = "COMPETITION",
    Concept = "CONCEPT",
    ConsumerGood = "CONSUMER_GOOD",
    ContentType = "CONTENT_TYPE",
    Country = "COUNTRY",
    Event = "EVENT",
    Group = "GROUP",
    Identifier = "IDENTIFIER",
    Location = "LOCATION",
    Organization = "ORGANIZATION",
    Other = "OTHER",
    Person = "PERSON",
    Sport = "SPORT",
    Subject = "SUBJECT",
    Team = "TEAM",
    Unknown = "UNKNOWN",
    WorkOfArt = "WORK_OF_ART",
  }
/** Predefined template names that should be used by all systems interested in templates to denote the template layout */
  export enum Template {
    Default = "DEFAULT",
    LeadAndTwo = "LEAD_AND_TWO",
    OpinionAndTwo = "OPINION_AND_TWO",
  }

  export enum TemplateType {
    Indepth = "indepth",
    Magazinecomment = "magazinecomment",
    Magazinestandard = "magazinestandard",
    Maincomment = "maincomment",
    Mainstandard = "mainstandard",
    Takeoverpage = "takeoverpage",
  }

  export enum WorkDeskName {
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
    World = "world",
  }

/** The `BigInt` scalar type represents non-fractional signed whole numeric values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1. */
export type BigInt = any;


export type Cursor = any;

/** Represents a date and time of day in ISO 8601 */
export type DateTime = any;

/** An dictionary of string-based key-value pairs */
export type Dictionary = any;

/** An AST representing cross platform UI */
export type Markup = any;

/** Two floats colon delimited as a string */
export type Ratio = any;

/** An AST representing cross platform UI */
export type RichText = any;

/** Represents a date and time of day in ISO 8601 */
export type ShortDate = any;

/** A lower kebab case string */
export type Slug = any;

/** Tiny integer (range of 0-255) */
export type TinyInt = any;

/** Represents a URL */
export type Url = any;

/** Represents a UUID */
export type Uuid = any;

/** Unit interval type (0-1 decimal range) */
export type UnitInterval = any;

/** Unsigned integer (range of 0 - MAX_SAFE_INTEGER) */
export type UnsignedInt = any;







// ====================================================
// Scalars
// ====================================================





// ====================================================
// Interfaces
// ====================================================


/** This interface will be shared by Article and DraftArticle it will allow us to query their common fields in union types */
export interface ArticleInterface {
  
  backgroundColour?: Maybe<Colour>;
  
  byline?: Maybe<Markup>;
  
  bylines?: Maybe<(Maybe<ArticleByline>)[]>;
  
  catchline?: Maybe<string>;
  
  commentsEnabled?: Maybe<boolean>;
  
  commentsPreModerated?: Maybe<boolean>;
  
  commercialSection?: Maybe<string>;
  
  commercialSectionTags?: Maybe<string[]>;
  
  commercialTags?: Maybe<(Maybe<string>)[]>;
  
  content?: Maybe<Markup>;
  
  contentType?: Maybe<ArticleContentType>;
  
  dataSource?: Maybe<DataSource>;
  
  dropcapsDisabled?: Maybe<boolean>;
  
  escenicId?: Maybe<number>;
  
  expirableFlags?: Maybe<(Maybe<ExpirableFlag>)[]>;
  
  hasVideo?: Maybe<boolean>;
  
  headline?: Maybe<string>;
  
  id: Uuid;
  
  inlineImages: Image[];
  
  keywords: string[];
  
  label?: Maybe<string>;
  
  leadAsset?: Maybe<Media>;
  
  listingAsset?: Maybe<Media>;
  
  parentId?: Maybe<Uuid>;
  
  publicationName: PublicationName;
  
  publishedTime?: Maybe<DateTime>;
  
  savingEnabled?: Maybe<boolean>;
  
  section?: Maybe<SectionName>;
  
  seoDescription?: Maybe<string>;
  
  sharingEnabled?: Maybe<boolean>;
  
  shortHeadline?: Maybe<string>;
  
  shortIdentifier?: Maybe<string>;
  
  slug?: Maybe<string>;
  
  standfirst?: Maybe<string>;
  
  strapline?: Maybe<string>;
  
  summary?: Maybe<Markup>;
  
  template?: Maybe<TemplateType>;
  
  textColour?: Maybe<Colour>;
  
  updatedTime?: Maybe<DateTime>;
  
  url?: Maybe<Url>;
  
  workDesk?: Maybe<WorkDeskName>;
}


export interface ArticleSlice {
  
  items: Tile[];
  
  sections: Section[];
}


export interface Byline {
  
  byline: Markup;
  
  image?: Maybe<Image>;
}


export interface DraftArticleSlice {
  
  items: DraftTile[];
}

/** A selection of template types that have opinions over how they should be presented. Usually used within the context of an associated list of articles */
export interface Layout {
  
  template?: Maybe<Template>;
}


export interface Section {
  
  colour: Colour;
  
  id: Uuid;
  
  slug: Slug;
  
  title: string;
}




// ====================================================
// Types
// ====================================================



export interface Account {
  
  activeSubscription?: Maybe<AccountSubscription>;
  
  billing?: Maybe<AccountBilling>;
  
  cpn: string;
  
  id: string;
  
  region?: Maybe<string>;
}


export interface AccountBilling {
  
  nextBillingDate?: Maybe<DateTime>;
}


export interface AccountSubscription {
  
  cancellation?: Maybe<AccountSubscriptionCancellation>;
  
  description?: Maybe<string>;
  
  id?: Maybe<string>;
  
  productAccess?: Maybe<AccountSubscriptionProductAccess>;
  
  status?: Maybe<string>;
}


export interface AccountSubscriptionCancellation {
  
  accessExpiry?: Maybe<AccountSubscriptionCancellationAccessExpiry>;
  
  accessExpiryDate?: Maybe<DateTime>;
  
  offer?: Maybe<AccountSubscriptionCancellationOffer>;
  
  reasons: (Maybe<string>)[];
}


export interface AccountSubscriptionCancellationOffer {
  
  discountedPrice: number;
  
  friendlyName: string;
  
  id: string;
  
  termInMonths?: Maybe<number>;
}


export interface AccountSubscriptionProductAccess {
  
  phoneApp: AccountSubscriptionProductAccessOptions;
  
  timesPlus: AccountSubscriptionProductAccessOptions;
  
  timesWebsite: AccountSubscriptionProductAccessOptions;
}


export interface AccountSubscriptionProductAccessOptions {
  
  active: boolean;
}

/** HTML anchor */
export interface Anchor {
  
  value: string;
}


export interface Article extends ArticleInterface {
  /** Used for indepth templates to define the background colour to be used. */
  backgroundColour?: Maybe<Colour>;
  /** An AST of one or more authors that may contain job titles and/or locations */
  byline?: Maybe<Markup>;
  /** Text or structured bylines for one or more authors */
  bylines?: Maybe<(Maybe<ArticleByline>)[]>;
  /** A field returning catchline for article */
  catchline?: Maybe<string>;
  /** Categories that the requested article belong to */
  categoryConnection: ArticleCategoryConnection;
  /** categoryPath includes category in path structure */
  categoryPath?: Maybe<string>;
  /** The number of comments an article has */
  commentCount?: Maybe<number>;
  /** A flag set outside of the commenting system, usually used for controversial articles */
  commentsEnabled?: Maybe<boolean>;
  /** The commenting system moderation policy for this article */
  commentsPreModerated?: Maybe<boolean>;
  /** The name of the commercial segment that the article appears in, for special commercial campaign */
  commercialSection?: Maybe<string>;
  /** A field that is a list of free text for commercial section tags */
  commercialSectionTags?: Maybe<string[]>;
  /** A rarely populated field that is a list of free text such as ["luxury", "ferrari"] */
  commercialTags?: Maybe<(Maybe<string>)[]>;
  /** The content for the article in the shape of an AST */
  content?: Maybe<Markup>;
  /** The Content Type of the article.  The list of possible values would be extended over time, so client applications should handle this possibility. */
  contentType?: Maybe<ArticleContentType>;
  /** The source of the article: Newspress or Methode */
  dataSource?: Maybe<DataSource>;
  /** Ability to disable dropcaps even if the given template has them by default */
  dropcapsDisabled?: Maybe<boolean>;
  /** A field for take-over pages to use instead of content */
  embeddedContent?: Maybe<EmbeddedContent>;
  /** A field returning escenicId for article */
  escenicId?: Maybe<number>;
  /** List of time dependent with expiry time */
  expirableFlags?: Maybe<(Maybe<ExpirableFlag>)[]>;
  /** Date the article was first published */
  firstPublishedTime?: Maybe<DateTime>;
  /** A list of time dependent with pair dependencies */
  flags?: Maybe<(Maybe<Flag>)[]>;
  /** Whether or not the article contains a video (as a lead asset or an inline video, or both) */
  hasVideo?: Maybe<boolean>;
  /** A longer SEO headline. Note this might not be populated so please use 'shortHeadline' as a fallback. */
  headline?: Maybe<string>;
  
  id: Uuid;
  /** Returns a list of images from article content */
  inlineImages: Image[];
  /** A user specific flag that indicates whether the article has been bookmarked (saved) by the user. This property can only be accessed by logged in users. */
  isBookmarked?: Maybe<boolean>;
  /** A user specific flag that indicates whether the article's content is returned in full or teased only */
  isTeased: boolean;
  /** A field that is populated from the article headline, a string delineated with commas such as ["this", "is", "a", "headline"] */
  keywords: string[];
  /** A free piece of text to describe an article */
  label?: Maybe<string>;
  
  leadAsset?: Maybe<Media>;
  
  listingAsset?: Maybe<Media>;
  
  longRead?: Maybe<boolean>;
  
  parentId?: Maybe<Uuid>;
  /** The paywalled content for the article in the shape of an AST. After the free content, the rest of the markup is wrapped in a paywall element to allow flexible sampling to work with a classname */
  paywalledContent?: Maybe<Markup>;
  
  publicationName: PublicationName;
  
  publishedTime?: Maybe<DateTime>;
  /** Related article slice */
  relatedArticleSlice?: Maybe<ArticleSlice>;
  /** Curated list of articles selected by editorial that appear at the end of an article */
  relatedArticles?: Maybe<(Maybe<Article>)[]>;
  /** Presentational information on how the related articles should be displayed */
  relatedArticlesLayout?: Maybe<Layout>;
  
  savingEnabled?: Maybe<boolean>;
  /** The name of the segment that the article appears in, for example Sport in a newspaper */
  section?: Maybe<SectionName>;
  /** A field returning SEO description of the article content */
  seoDescription?: Maybe<string>;
  
  sharingEnabled?: Maybe<boolean>;
  /** A shorter headline useful for when space is at a premium. Note this may return null so please use `headline` field as a fallback. */
  shortHeadline?: Maybe<string>;
  /** Hashed version of the article identifier */
  shortIdentifier?: Maybe<string>;
  /** Customisable field in the CMS, that is by default a slugified version of the article title */
  slug?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the headline and typographically distinct from the rest of the article */
  standfirst?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the standfirst */
  strapline?: Maybe<string>;
  /** A predefined truncated version of the article with a max length of the teaser, can optionally choose a shorter length. Use this to avoid ACS. */
  summary?: Maybe<Markup>;
  
  synonyms: ArticleSynonymConnection;
  
  tags?: Maybe<ArticleTagConnection>;
  
  tagsUpdatedTime?: Maybe<DateTime>;
  
  template?: Maybe<TemplateType>;
  /** Used for indepth templates to define the text colour to be used. */
  textColour?: Maybe<Colour>;
  /** The tiles that this article appears in */
  tiles?: Maybe<(Maybe<Tile>)[]>;
  
  title?: Maybe<string>;
  /** Used for tokenised article URL */
  tokenisedUrl?: Maybe<Url>;
  
  topicConnection: ArticleTopicConnection;
  /** Topics that the requested article belong to */
  topics?: Maybe<(Maybe<Topic>)[]>;
  
  updatedTime?: Maybe<DateTime>;
  
  url?: Maybe<Url>;
  /** The name of the segment that the article appears in, for example Sport in a newspaper */
  workDesk?: Maybe<WorkDeskName>;
}


export interface ArticleCategoryConnection {
  
  nodes: Category[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface ArticleCategoryUpdateResult {
  
  id: Uuid;
  
  type?: Maybe<CategoryType>;
}


export interface ArticleLink {
  
  article?: Maybe<Article>;
  
  articleId?: Maybe<Uuid>;
}


export interface ArticleReference {
  
  article: Article;
  
  articleId: Uuid;
}


export interface ArticleSynonymConnection {
  
  edges: (Maybe<ArticleSynonymEdge>)[];
  
  nodes: (Maybe<Synonym>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface ArticleSynonymEdge {
  
  cursor: Cursor;
  
  node: Synonym;
  
  score: number;
}


export interface ArticleTagConnection {
  
  edges: (Maybe<ArticleTagEdge>)[];
  
  nodes: (Maybe<Tag>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface ArticleTagEdge {
  
  combinedScore: number;
  
  cursor: Cursor;
  
  node: Tag;
  
  scoreOverride?: Maybe<number>;
}


export interface ArticleTagRemoveResult {
  
  tagId?: Maybe<Uuid>;
}


export interface ArticleTagUpsertResult {
  
  id: Uuid;
}


export interface ArticleTopicConnection {
  
  nodes: Topic[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface ArticleUpdateLinksResult {
  
  message?: Maybe<string>;
}


export interface ArticleUpsertResult {
  
  id: Uuid;
}


export interface Articles {
  /** The number of articles that satisfy the filter */
  count?: Maybe<number>;
  
  list: (Maybe<Article>)[];
}

/** An author of a piece of writing */
export interface Author {
  
  articles?: Maybe<AuthorArticles>;
  
  biography?: Maybe<Markup>;
  
  contractualTitle?: Maybe<string>;
  /** Some authors have poor article lead assets, this flag denotes that the lead assets are useful for presentation purposes */
  hasLeadAssets?: Maybe<boolean>;
  
  id: string;
  /** URL for the image of an author */
  image?: Maybe<Url>;
  
  jobTitle?: Maybe<string>;
  
  metaDescription?: Maybe<string>;
  /** The name of the author */
  name: string;
  
  slug?: Maybe<Slug>;
  /** Twitter handle for an author (can be an empty string) */
  twitter?: Maybe<string>;
}


export interface AuthorArticles {
  /** The number of articles written by an author */
  count?: Maybe<number>;
  /** List of articles written by an author */
  list?: Maybe<(Maybe<Article>)[]>;
}


export interface AuthorByline extends Byline {
  
  author: Author;
  
  byline: Markup;
  
  image?: Maybe<Image>;
}


export interface Bookmark {
  
  id: Uuid;
}

/** A video in the sports video hub. Note that some of these videos are only licensed on mobile applications. */
export interface BrightcoveSportVideo {
  
  accountId: string;
  
  policyKey: string;
  
  posterImageOverlayUrl?: Maybe<Url>;
  
  posterImageUrl: Url;
  
  publishedTime: DateTime;
  
  subtitle?: Maybe<string>;
  
  title: string;
  
  updatedTime: DateTime;
  
  videoId: string;
}


export interface Category {
  
  categoryType?: Maybe<CategoryType>;
  
  id?: Maybe<Uuid>;
  
  page?: Maybe<Page>;
  
  parent?: Maybe<ParentCategory>;
  
  slug?: Maybe<Slug>;
  
  title?: Maybe<string>;
}


export interface CategoryArticles {
  /** List of articles associated with that category */
  list: Article[];
}


export interface CategoryConnection {
  
  nodes: (Maybe<HierarchyCategory>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface CategoryHierarchyUpsertResult {
  
  updatedTime: DateTime;
}


export interface Collection {
  
  children: StandardPageSlice[];
  
  collectionId: number;
  
  expireAt?: Maybe<DateTime>;
  
  group?: Maybe<CollectionGroup>;
  
  id?: Maybe<Uuid>;
  
  link: CollectionLink;
  
  publishAt?: Maybe<DateTime>;
  
  slices: StandardSectionSlice[];
  
  title?: Maybe<string>;
}


export interface CollectionGroup {
  
  name?: Maybe<string>;
  
  type?: Maybe<string>;
}


export interface CollectionUpdateResult {
  
  id: Uuid;
}


export interface Colour {
  
  rgba: Rgba;
}

/** A leading comment article and a cartoon (comment-lead-and-cartoon) */
export interface CommentLeadAndCartoonSlice extends ArticleSlice {
  
  cartoon: Tile;
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
}

/** Two comment articles and a notebook article (comment-2-and-notebook) */
export interface CommentTwoAndNotebookSlice extends ArticleSlice {
  
  items: Tile[];
  
  main1: Tile;
  
  main2: Tile;
  
  notebook: Tile;
  
  sections: Section[];
}

/** A special type of slice containing a collection of slices */
export interface ContainerSlice {
  
  collection: Collection;
  
  items: Collection[];
  
  sections: Section[];
}

/** The selected area for a given image and its ratio */
export interface Crop {
  
  chpId?: Maybe<string>;
  
  ratio?: Maybe<Ratio>;
  
  relativeHeight?: Maybe<UnitInterval>;
  
  relativeHorizontalOffset?: Maybe<UnitInterval>;
  
  relativeVerticalOffset?: Maybe<UnitInterval>;
  
  relativeWidth?: Maybe<UnitInterval>;
  
  url?: Maybe<Url>;
}


export interface CustomComponent {
  
  name?: Maybe<string>;
  
  parameters?: Maybe<string>;
  
  url?: Maybe<string>;
}


export interface CustomLink {
  
  text?: Maybe<string>;
  
  url?: Maybe<Url>;
}

/** The daily universal register slice */
export interface DailyUniversalRegister {
  
  birthdaysToday: DailyUniversalRegisterItem;
  
  briefing: DailyUniversalRegisterItem;
  
  items: DailyUniversalRegisterItem[];
  
  natureNotes: DailyUniversalRegisterItem;
  
  onThisDay: DailyUniversalRegisterItem;
}

/** A piece of the daily universal register */
export interface DailyUniversalRegisterItem {
  
  byline?: Maybe<Markup>;
  
  content: Markup;
  
  title: string;
}

/** Any number of articles with no opinion on the layout/importance of any */
export interface Default extends Layout {
  
  template?: Maybe<Template>;
}


export interface DraftArticle extends ArticleInterface {
  /** Used for indepth templates to define the background colour to be used. */
  backgroundColour?: Maybe<Colour>;
  /** An AST of one or more authors that may contain job titles and/or locations */
  byline?: Maybe<Markup>;
  /** Text or structured bylines for one or more authors */
  bylines?: Maybe<(Maybe<ArticleByline>)[]>;
  /** A field returning catchline for article */
  catchline?: Maybe<string>;
  /** Topics that the requested article belong to Categories that the requested article belong to */
  categoryConnection: DraftArticleCategoryConnection;
  /** A flag set outside of the commenting system, usually used for controversial articles */
  commentsEnabled?: Maybe<boolean>;
  /** The commenting system moderation policy for this article */
  commentsPreModerated?: Maybe<boolean>;
  /** The name of the commercial segment that the article appears in, for special commercial campaign */
  commercialSection?: Maybe<string>;
  /** A field that is a list of free text for commercial section tags */
  commercialSectionTags?: Maybe<string[]>;
  /** A rarely populated field that is a list of free text such as ["luxury", "ferrari"] */
  commercialTags?: Maybe<(Maybe<string>)[]>;
  /** The content for the article in the shape of an AST */
  content?: Maybe<Markup>;
  /** The Content Type of the article.  The list of possible values would be extended over time, so client applications should handle this possibility. */
  contentType?: Maybe<ArticleContentType>;
  /** The source of the draft article: Newspress or Methode */
  dataSource?: Maybe<DataSource>;
  /** Ability to disable dropcaps even if the given template has them by default */
  dropcapsDisabled?: Maybe<boolean>;
  /** A field for take-over pages to use instead of content */
  embeddedContent?: Maybe<DraftEmbeddedContent>;
  /** A field returning escenicId for article */
  escenicId?: Maybe<number>;
  /** List of time dependent with expiry time */
  expirableFlags?: Maybe<(Maybe<ExpirableFlag>)[]>;
  /** Whether or not the article contains a video (as a lead asset or an inline video, or both) */
  hasVideo?: Maybe<boolean>;
  /** A longer SEO headline. Note this might not be populated so please use 'shortHeadline' as a fallback. */
  headline?: Maybe<string>;
  
  id: Uuid;
  /** Returns a list of images from article content */
  inlineImages: Image[];
  /** A field that is populated from the article headline, a string delineated with commas such as ["this", "is", "a", "headline"] */
  keywords: string[];
  /** A free piece of text to describe an article */
  label?: Maybe<string>;
  
  leadAsset?: Maybe<Media>;
  
  listingAsset?: Maybe<Media>;
  
  parentId?: Maybe<Uuid>;
  
  publicationName: PublicationName;
  
  publishedTime?: Maybe<DateTime>;
  /** Related article slice */
  relatedArticleSlice?: Maybe<DraftArticleSlice>;
  
  savingEnabled?: Maybe<boolean>;
  /** The time when a draft article is supposed to be published */
  scheduledTime?: Maybe<DateTime>;
  /** The name of the segment that the article appears in, for example Sport in a newspaper */
  section?: Maybe<SectionName>;
  /** A field returning SEO description of the article content */
  seoDescription?: Maybe<string>;
  
  sharingEnabled?: Maybe<boolean>;
  /** A shorter headline useful for when space is at a premium. Note this may return null so please use `headline` field as a fallback. */
  shortHeadline?: Maybe<string>;
  /** Hashed version of the article identifier */
  shortIdentifier?: Maybe<string>;
  /** Customisable field in the CMS, that is by default a slugified version of the article title */
  slug?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the headline and typographically distinct from the rest of the article */
  standfirst?: Maybe<string>;
  /** A brief introductory summary, typically appearing immediately after the standfirst */
  strapline?: Maybe<string>;
  /** A predefined truncated version of the article with a max length of the teaser, can optionally choose a shorter length. Use this to avoid ACS. */
  summary?: Maybe<Markup>;
  
  synonyms: ArticleSynonymConnection;
  
  tags?: Maybe<ArticleTagConnection>;
  
  tagsUpdatedTime?: Maybe<DateTime>;
  
  template?: Maybe<TemplateType>;
  /** Used for indepth templates to define the text colour to be used. */
  textColour?: Maybe<Colour>;
  
  topicConnection: DraftArticleTopicConnection;
  /** Topics that the requested article belong to */
  topics?: Maybe<(Maybe<Topic>)[]>;
  
  updatedTime?: Maybe<DateTime>;
  
  url?: Maybe<Url>;
  
  workDesk?: Maybe<WorkDeskName>;
}


export interface DraftArticleCategoryConnection {
  
  nodes: Category[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface DraftArticleTagRemoveResult {
  
  tagId?: Maybe<Uuid>;
}


export interface DraftArticleTopicConnection {
  
  nodes: Topic[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface DraftArticleUpsertResult {
  
  id: Uuid;
}


export interface DraftArticles {
  
  list: DraftArticle[];
}


export interface DraftEmbeddedContent {
  
  authorised?: Maybe<EmbeddedContent>;
  
  unauthorised?: Maybe<EmbeddedContent>;
}

/** A lead article and two supporting articles. This slice can also represent lead related articles slice of the same name (lead-1-and-2-puffs, related-links-lead-and-2) */
export interface DraftLeadOneAndTwoSlice extends DraftArticleSlice {
  
  items: DraftTile[];
  
  lead: DraftTile;
  
  support1: DraftTile;
  
  support2: DraftTile;
}

/** A lead opinion related articles slice (related-links-opinion-and-2) */
export interface DraftOpinionOneAndTwoSlice extends DraftArticleSlice {
  
  items: DraftTile[];
  
  opinion: DraftTile;
  
  support1: DraftTile;
  
  support2: DraftTile;
}

/** Fallback slice without any prescribed presentation, replaces standard related-links slice (related-links) */
export interface DraftStandardSlice extends DraftArticleSlice {
  
  items: DraftTile[];
}

/** An article presentation */
export interface DraftTile {
  
  article: DraftTileArticle;
  
  articleId?: Maybe<Uuid>;
  
  draftArticleId?: Maybe<Uuid>;
  
  headline?: Maybe<string>;
  
  leadAsset?: Maybe<Media>;
  
  strapline?: Maybe<string>;
  
  teaser?: Maybe<Markup>;
}

/** An edition for a single day */
export interface Edition {
  /** The date that the edition is intended for, not necessarily the date it was published (contrast with `publishedTime`) */
  date: ShortDate;
  
  id: Uuid;
  /** List of images in the edition */
  images: ImagesPaged;
  
  publicationName: PublicationName;
  /** The date & time that the edition was published (contrast with `date`) */
  publishedTime: DateTime;
  /** The region the edition is intended for */
  region: Region;
  /** Current version of the edition (used primarily for caching) */
  revision: BigInt;
  
  sections?: Maybe<(Maybe<Section>)[]>;
  /** Journalist inputted text which denotes the last time an edition was published */
  updateText?: Maybe<string>;
  
  updatedTime: DateTime;
}


export interface EditionUpsertResult {
  
  id: Uuid;
}

/** A list of editions with pagination meta data */
export interface EditionsPaged {
  
  list?: Maybe<(Maybe<Edition>)[]>;
}


export interface EmbeddedComponentResource {
  
  name: string;
  
  url: string;
}


export interface EmbeddedContent {
  
  content: string;
  
  head?: Maybe<string>;
  
  scripts: EmbeddedComponentResource[];
}


export interface EmptyCategoryReference {
  
  category: Slug;
}


export interface EmptyInheritedReference {
  
  sourceCollectionTitle: string;
  
  sourcePageTitle: string;
  
  sourceUuid: Uuid;
}


export interface EmptyReference {
  
  sourceSlug: Slug;
  
  sourceType: string;
}


export interface EmptyTopicReference {
  
  topic: Slug;
}


export interface ExpirableFlag {
  
  duration?: Maybe<number>;
  
  expiryTime?: Maybe<DateTime>;
  
  type: Flag;
}


export interface ExternalReference {
  
  author?: Maybe<Author>;
  
  headline?: Maybe<string>;
  
  image?: Maybe<PageImage>;
  
  label?: Maybe<string>;
  
  url?: Maybe<string>;
}

/** A focus article (focus) */
export interface FocusSlice extends ArticleSlice {
  
  items: Tile[];
  
  main: Tile;
  
  sections: Section[];
}


export interface FrontPageSection extends Section {
  
  colour: Colour;
  
  id: Uuid;
  
  slices: FrontPageSectionSlice[];
  
  slug: Slug;
  
  title: string;
}


export interface HierarchyCategory {
  
  articles?: Maybe<CategoryArticles>;
  
  id?: Maybe<Uuid>;
  
  page?: Maybe<Page>;
  
  parent?: Maybe<ParentCategory>;
  
  slug?: Maybe<Slug>;
  
  title?: Maybe<string>;
}


export interface Image {
  
  caption?: Maybe<string>;
  
  credits?: Maybe<string>;
  
  crop?: Maybe<Crop>;
  
  crops: Crop[];
  
  id: Uuid;
  
  title?: Maybe<string>;
}


export interface ImagesPaged {
  
  list: Image[];
}

/** A special type of banner containing references to articles or URLs which is displayed at the top the news section */
export interface InTheNewsSlice {
  
  items: PuffLite[];
  
  sections: Section[];
}

/** An interactive */
export interface Interactive {
  
  caption?: Maybe<string>;
  
  element: InteractiveElement;
  
  id: string;
  /** URL for the interactive */
  url: Url;
}


export interface InteractiveElement {
  
  attributes?: Maybe<Dictionary>;
  
  value?: Maybe<string>;
}

/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface LeadAndTwo extends Layout {
  
  lead?: Maybe<Uuid>;
  
  main?: Maybe<Uuid>;
  
  template?: Maybe<Template>;
}

/** A lead article and four supporting articles (supplement-lead-and-4-stack) */
export interface LeadOneAndFourSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
  
  support3: Tile;
  
  support4: Tile;
}

/** A lead article and a supporting article (lead-1-and-1) for the Front section */
export interface LeadOneAndOneFrontSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
  
  support: Tile;
}

/** A lead article and a supporting article (lead-1-and-1) */
export interface LeadOneAndOneSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  leadBullet1?: Maybe<Tile>;
  
  leadBullet2?: Maybe<Tile>;
  
  leadBullet3?: Maybe<Tile>;
  
  sections: Section[];
  
  support: Tile;
}

/** A lead article and two supporting articles. This slice can also represent lead related articles slice of the same name (lead-1-and-2-puffs, related-links-lead-and-2) */
export interface LeadOneAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** One full width lead article on its own (lead-1-full-width) for the Front section */
export interface LeadOneFullWidthFrontSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
}

/** One full width lead article on its own (lead-1-full-width) */
export interface LeadOneFullWidthSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
}

/** A lead module and supporting and portrait modules (lead-1-no-pic-and-1-and-portrait) */
export interface LeadOneNoPicAndOneAndPortraitSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  portrait: Tile;
  
  sections: Section[];
  
  support: Tile;
}

/** Two lead articles for the Front section */
export interface LeadTwoFrontSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead1: Tile;
  
  lead2: Tile;
  
  sections: Section[];
}

/** Two lead articles and two supporting ones for the Front section */
export interface LeadTwoNoPicAndTwoFrontSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead1: Tile;
  
  lead2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** Two leads without pictures along, a pair of supporting articles and 3 nullable bullets (lead-2-no-pic-and-2) */
export interface LeadTwoNoPicAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead1: Tile;
  
  lead1Bullet1?: Maybe<Tile>;
  
  lead1Bullet2?: Maybe<Tile>;
  
  lead1Bullet3?: Maybe<Tile>;
  
  lead2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** Three leader articles (leaders) */
export interface LeadersSlice extends ArticleSlice {
  
  items: Tile[];
  
  leader1: Tile;
  
  leader2: Tile;
  
  leader3: Tile;
  
  sections: Section[];
}

/** Trio of letter, thunderer and podcast articles (comment-1-letters-thunderer) */
export interface LetterThundererPodcastSlice extends ArticleSlice {
  
  items: Tile[];
  
  letter: Tile;
  
  podcast: Tile;
  
  sections: Section[];
  
  thunderer: Tile;
}


export interface Link {
  
  url?: Maybe<Url>;
}

/** A magazine section, e.g. Culture, Style, ST Magazine */
export interface MagazineSection extends Section {
  
  colour: Colour;
  
  cover: Image;
  
  id: Uuid;
  
  slices: MagazineSectionSlice[];
  
  slug: Slug;
  
  title: string;
}


export interface Menu {
  
  id: Uuid;
  
  items: MenuItem[];
  
  link: Link;
  
  type: string;
}


export interface MenuItem {
  
  id: Uuid;
  
  link: Link;
  
  page?: Maybe<Page>;
  
  parent?: Maybe<MenuItemParent>;
  
  title: string;
  
  type: string;
}


export interface MenuItemParent {
  
  id: Uuid;
  
  type: string;
  
  url: Url;
}


export interface Mutation {
  
  applyOfferToSubscription?: Maybe<AccountSubscription>;
  
  cancelSubscription?: Maybe<AccountSubscription>;
  
  saveAuthorBookmarks: Bookmark[];
  
  saveBookmarks: Bookmark[];
  
  subscribeNewsletter?: Maybe<Newsletter>;
  
  unsaveAuthorBookmarks: Uuid[];
  
  unsaveBookmarks: Uuid[];
  
  unsubscribeNewsletter?: Maybe<Newsletter>;
}


export interface Newsletter {
  
  code: string;
  
  description: string;
  
  frequency: string;
  
  id: string;
  
  isSubscribed: boolean;
  
  title: string;
}

/** Special obituary lead and two support articles (obituaries-lead-and-2) */
export interface ObituariesLeadAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** Three articles with one that has more importance over the others denoted by the main ID. Would usually be associated with a list of articles */
export interface OpinionAndTwo extends Layout {
  
  main?: Maybe<Uuid>;
  
  opinion?: Maybe<Uuid>;
  
  template?: Maybe<Template>;
}

/** A lead opinion related articles slice (related-links-opinion-and-2) */
export interface OpinionOneAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  opinion: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** A document which describes the structure of a web page */
export interface Page {
  /** Body content - array of blocks */
  body?: Maybe<(Maybe<PageBlock>)[]>;
  /** The Category this page is connected to */
  category?: Maybe<Category>;
  /** The date-time this page was first published */
  datePublished: DateTime;
  /** The date-time this page was last updated */
  dateUpdated: DateTime;
  /** The description of the page, typically used for display purposes */
  description?: Maybe<string>;
  /** Unique identifier for this page. */
  id: string;
  /** A hash representing the page as whole; used for frontend caching purposes only. Note that `currentRevision` should also be provided for the Page query for consistent behaviour. */
  pageRevision?: Maybe<string>;
  /** A kebab-case literal identifier for this page */
  slug: Slug;
  /** The social card image URL for the page */
  socialCardImage?: Maybe<string>;
  /** The title for this page ex. Sport */
  title: string;
  /** The meta page title for SEO purposes */
  titleSeo: string;
}


export interface PageImage {
  
  url?: Maybe<Url>;
}


export interface PageInfo {
  
  endCursor?: Maybe<Cursor>;
  
  hasNextPage: boolean;
  
  hasPreviousPage: boolean;
  
  startCursor?: Maybe<Cursor>;
}


export interface PageLink {
  
  page?: Maybe<Page>;
}


export interface PageOfBookmarks {
  
  bookmarks: Bookmark[];
  
  total: number;
}


export interface PageSlice {
  
  children?: Maybe<(Maybe<PageTile>)[]>;
  
  name: string;
}


export interface PageTileConnection {
  
  nodes: PageTile[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface PageUpsertResult {
  
  id: Uuid;
}


export interface PaginatedPageSlice {
  
  childConnection: PageTileConnection;
  
  name: string;
}


export interface ParentCategory {
  
  id?: Maybe<Uuid>;
  
  page?: Maybe<Page>;
  
  parent?: Maybe<ParentCategory>;
  
  slug?: Maybe<Slug>;
  
  title?: Maybe<string>;
}


export interface PreviewCollectionUpdateResult {
  
  id: Uuid;
}

/** A document which describes the structure of a web page */
export interface PreviewPage {
  /** Body content - array of blocks */
  body?: Maybe<(Maybe<PageBlock>)[]>;
  /** The date-time this page was first published */
  datePublished: DateTime;
  /** The date-time this page was last updated */
  dateUpdated: DateTime;
  /** The description of the page, typically used for display purposes */
  description?: Maybe<string>;
  /** Unique identifier for this page. */
  id: string;
  /** A kebab-case literal identifier for this page */
  slug: Slug;
  /** The social card image URL for the page */
  socialCardImage?: Maybe<string>;
  /** The title for this page ex. Sport */
  title: string;
  /** The meta page title for SEO purposes */
  titleSeo: string;
}


export interface PreviewPageUpsertResult {
  
  id: Uuid;
}

/** An article/link which is displayed in a puff */
export interface Puff {
  
  colour: Colour;
  
  leadImage?: Maybe<Image>;
  
  mainLink: PuffMainLinkRef;
  
  major: boolean;
  
  secondaryLink: PuffSecondaryLink;
  
  strapline?: Maybe<string>;
  
  title: string;
}

/** An article/link which is displayed in a light puff */
export interface PuffLite {
  
  leadImage: Image;
  
  mainLink: PuffMainLinkRef;
  
  strapline: string;
  
  title: string;
}


export interface PuffSecondaryLink {
  
  label: string;
  
  link: PuffSecondaryLinkRef;
}

/** A banner containing one or many articles/links */
export interface PuffSlice {
  
  items: Puff[];
}

/** A representation of a single puzzle for the puzzles section */
export interface Puzzle {
  
  date?: Maybe<ShortDate>;
  
  difficulty?: Maybe<string>;
  
  group?: Maybe<string>;
  
  hideOnMobile: boolean;
  
  id: Uuid;
  
  image: Image;
  
  index?: Maybe<number>;
  
  shortIdentifier?: Maybe<string>;
  
  slug?: Maybe<string>;
  
  title: string;
  
  type?: Maybe<string>;
  
  url: Url;
}


export interface PuzzleSection extends Section {
  
  colour: Colour;
  
  id: Uuid;
  
  slices: PuzzleSectionSlice[];
  
  slug: Slug;
  
  title: string;
}


export interface Puzzles {
  /** The number of puzzles that satisfy the filter count: Int! */
  list: Puzzle[];
}


export interface Query {
  
  account?: Maybe<Account>;
  
  article?: Maybe<Article>;
  
  articles?: Maybe<Articles>;
  /** A list of authors */
  author?: Maybe<Author>;
  
  authors?: Maybe<(Maybe<Author>)[]>;
  
  categories?: Maybe<CategoryConnection>;
  
  category?: Maybe<HierarchyCategory>;
  
  draftArticle?: Maybe<DraftArticle>;
  
  draftArticles?: Maybe<DraftArticles>;
  
  edition?: Maybe<Edition>;
  
  editions?: Maybe<EditionsPaged>;
  
  interactive?: Maybe<Interactive>;
  
  menu?: Maybe<Menu>;
  
  newsletter?: Maybe<Newsletter>;
  
  newsletters?: Maybe<(Maybe<Newsletter>)[]>;
  
  page?: Maybe<Page>;
  
  previewPage?: Maybe<PreviewPage>;
  
  puzzle?: Maybe<Puzzle>;
  
  puzzles?: Maybe<Puzzles>;
  
  section?: Maybe<Section>;
  
  sportCompetition?: Maybe<SportCompetition>;
  
  sports: Sport[];
  
  tag?: Maybe<Tag>;
  
  tags?: Maybe<TagConnection>;
  
  tiles?: Maybe<Tiles>;
  
  topic?: Maybe<Topic>;
  /** Returns topics using a cursor and a defined number of desired results and allows filtering by case-insensitive, partially matched term */
  topics?: Maybe<TopicConnection>;
  /** The currently authenticated user */
  viewer?: Maybe<User>;
}


export interface Rgba {
  
  alpha: UnitInterval;
  
  blue: TinyInt;
  
  green: TinyInt;
  
  red: TinyInt;
}

/** Four secondary modules (secondary-4) */
export interface SecondaryFourSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  secondary3: Tile;
  
  secondary4: Tile;
  
  sections: Section[];
}

/** A secondary module and a special supporting columnist module (secondary-1-and-columnist) */
export interface SecondaryOneAndColumnistSlice extends ArticleSlice {
  
  columnist: Tile;
  
  items: Tile[];
  
  secondary: Tile;
  
  sections: Section[];
}

/** A secondary module and four supporting articles (supplement-secondary-1-and-4) */
export interface SecondaryOneAndFourSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
  
  support3: Tile;
  
  support4: Tile;
}

/** A singular secondary module (secondary-1) */
export interface SecondaryOneSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary: Tile;
  
  sections: Section[];
}

/** Two secondary modules and supporting articles (secondary-2-and-2) */
export interface SecondaryTwoAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** Two secondary modules, without an image, and supporting articles (secondary-2-no-pic-and-2) */
export interface SecondaryTwoNoPicAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}


export interface SectionUpdateResult {
  
  id: Uuid;
}


export interface SliceUpdateResult {
  
  id: Uuid;
}

/** A sport in the sports video hub */
export interface Sport {
  /** A list of competitions associated to a sport */
  competitions: (Maybe<SportCompetition>)[];
  
  id: Uuid;
  
  name: string;
}

/** A sport competition in the sports video hub */
export interface SportCompetition {
  /** A list of video groupings associated to a sport competition */
  groups: SportVideoGroup[];
  
  id: Uuid;
  /** Poster image of the most recent video of a competition */
  imageUrl?: Maybe<Url>;
  /** Non-vector logo for competition */
  logoUrl?: Maybe<Url>;
  
  name: string;
}

/** A group of sport videos (e.g. round, match day, extras, ...) */
export interface SportVideoGroup {
  /** A list of sport videos ordered by time of creation */
  brightcoveVideos: BrightcoveSportVideo[];
  
  name: string;
}


export interface StandardSection extends Section {
  
  colour: Colour;
  
  id: Uuid;
  
  slices: StandardSectionSlice[];
  
  slug: Slug;
  
  title: string;
}

/** Fallback slice without any prescribed presentation, replaces standard related-links slice (related-links) */
export interface StandardSlice extends ArticleSlice {
  
  items: Tile[];
  
  sections: Section[];
}

/** A supplement lead article and four supporting articles (replacing LeadOneAndFourSlice). */
export interface SupplementLeadAndFourStackSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
  
  support3: Tile;
  
  support4: Tile;
}

/** A supplement secondary module and four supporting articles (replacing SecondaryOneAndFourSlice). */
export interface SupplementSecondaryOneAndFourSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
  
  support3: Tile;
  
  support4: Tile;
}


export interface Synonym {
  
  id: Uuid;
  
  name: string;
  
  tagId: Uuid;
  
  type: SynonymType;
}


export interface SynonymConnection {
  
  nodes: (Maybe<Synonym>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface Tag {
  
  articles: TagArticleConnection;
  
  description?: Maybe<string>;
  
  draftArticles: TagDraftArticleConnection;
  
  externalId?: Maybe<string>;
  
  id: Uuid;
  
  primarySynonym: Synonym;
  
  synonyms: SynonymConnection;
}


export interface TagArticleConnection {
  
  edges?: Maybe<(Maybe<TagArticleEdge>)[]>;
  
  nodes: (Maybe<Article>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface TagArticleEdge {
  
  combinedScore: number;
  
  cursor: Cursor;
  
  node: Article;
  
  scoreOverride?: Maybe<number>;
}


export interface TagConnection {
  
  nodes: (Maybe<Tag>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface TagDraftArticleConnection {
  
  edges?: Maybe<(Maybe<TagDraftArticleEdge>)[]>;
  
  nodes: (Maybe<DraftArticle>)[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface TagDraftArticleEdge {
  
  combinedScore: number;
  
  cursor: Cursor;
  
  node: DraftArticle;
  
  scoreOverride?: Maybe<number>;
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


export interface TextByline extends Byline {
  
  byline: Markup;
  
  image?: Maybe<Image>;
}

/** An article presentation */
export interface Tile {
  
  article: Article;
  
  articleId: Uuid;
  
  headline?: Maybe<string>;
  
  leadAsset?: Maybe<Media>;
  
  slices?: Maybe<(Maybe<ArticleSlice>)[]>;
  
  strapline?: Maybe<string>;
  
  teaser?: Maybe<Markup>;
}


export interface Tiles {
  /** Sort the results in a descending order */
  desc?: Maybe<boolean>;
  /** The maximum number of tiles to be retrieved */
  first?: Maybe<number>;
}

/** Four secondary modules (secondary-4) at the top of News section */
export interface TopSecondaryFourSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  secondary3: Tile;
  
  secondary4: Tile;
  
  sections: Section[];
}

/** Two secondary modules and supporting articles (secondary-2-and-2) at the top of News section */
export interface TopSecondaryTwoAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}

/** Two secondary modules, without an image, and supporting articles (secondary-2-no-pic-and-2) at the top of News section */
export interface TopSecondaryTwoNoPicAndTwoSlice extends ArticleSlice {
  
  items: Tile[];
  
  secondary1: Tile;
  
  secondary2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
}


export interface Topic {
  
  articleConnection: TopicArticleConnection;
  
  articles?: Maybe<TopicArticles>;
  
  createdAt?: Maybe<DateTime>;
  /** A short sentence to describe the topic */
  description?: Maybe<RichText>;
  
  draftArticleConnection: TopicDraftArticleConnection;
  
  draftArticles?: Maybe<TopicDraftArticles>;
  
  id?: Maybe<string>;
  
  leadImage?: Maybe<Image>;
  
  metaDescription?: Maybe<string>;
  
  name: string;
  
  slug: Slug;
  
  tagConnection: TopicTagConnection;
  
  updatedAt?: Maybe<DateTime>;
}


export interface TopicArticleConnection {
  
  nodes: Article[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface TopicArticles {
  /** The number of articles in a given topic */
  count?: Maybe<number>;
  
  ids?: Maybe<(Maybe<Uuid>)[]>;
  /** List of articles associated with that topic */
  list: Article[];
}


export interface TopicAuthorSlice {
  
  articles?: Maybe<(Maybe<PageTile>)[]>;
  
  topic: string;
}


export interface TopicConnection {
  
  nodes: Topic[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface TopicCreateResult {
  
  topicId: Uuid;
}


export interface TopicDraftArticleConnection {
  
  nodes: DraftArticle[];
  
  pageInfo?: Maybe<PageInfo>;
  
  totalCount?: Maybe<number>;
}


export interface TopicDraftArticles {
  /** The number of articles in a given topic */
  count?: Maybe<number>;
  
  ids?: Maybe<(Maybe<Uuid>)[]>;
  /** List of articles associated with that topic */
  list: DraftArticle[];
}


export interface TopicLink {
  
  topic: Slug;
}


export interface TopicRemoveResult {
  
  slug?: Maybe<Slug>;
}


export interface TopicTagConnection {
  
  edges: TopicTagEdge[];
  
  nodes: Tag[];
  
  pageInfo: PageInfo;
  
  totalCount: number;
}


export interface TopicTagEdge {
  
  cursor?: Maybe<Cursor>;
  
  node?: Maybe<Tag>;
  
  scoreThreshold?: Maybe<number>;
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

/** A slice and two leads and six supporting articles (list-2-and-6-no-pic) */
export interface TwoPicAndSixNoPicSlice extends ArticleSlice {
  
  items: Tile[];
  
  lead1: Tile;
  
  lead2: Tile;
  
  sections: Section[];
  
  support1: Tile;
  
  support2: Tile;
  
  support3: Tile;
  
  support4: Tile;
  
  support5: Tile;
  
  support6: Tile;
}


export interface User {
  
  authorBookmarks?: Maybe<PageOfBookmarks>;
  
  bookmarks?: Maybe<PageOfBookmarks>;
  /** a code used for Spot.IM's Single Sign On auth. Details here: https://github.com/SpotIM/spotim-integration-docs/blob/master/api/single-sign-on/README.md */
  spotimCodeB?: Maybe<string>;
}


export interface Video {
  
  brightcoveAccountId?: Maybe<string>;
  
  brightcovePlayerId?: Maybe<string>;
  
  brightcovePolicyKey?: Maybe<string>;
  
  brightcoveVideoId?: Maybe<string>;
  
  caption?: Maybe<string>;
  
  id: Uuid;
  
  is360?: Maybe<boolean>;
  
  paidOnly?: Maybe<boolean>;
  
  posterImage?: Maybe<Image>;
  
  skySports?: Maybe<boolean>;
  
  title?: Maybe<string>;
}



// ====================================================
// Arguments
// ====================================================

export interface OfferAccountSubscriptionCancellationArgs {
  
  offerId: string;
}
export interface CategoryConnectionArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface ContentArticleArgs {
  /** If summary text is required, use to truncate the article content by characters. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum. Has no effect if maxWordCount is specified */
  maxCharCount?: Maybe<number>;
  /** If a teaser is required, use to truncate the article content by words. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum */
  maxWordCount?: Maybe<number>;
}
export interface SummaryArticleArgs {
  
  maxCharCount?: Maybe<number>;
}
export interface SynonymsArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TagsArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TilesArticleArgs {
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TopicConnectionArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TopicsArticleArgs {
  
  maxCount?: Maybe<number>;
}
export interface ListArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ListAuthorArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ListCategoryArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface CategoryConnectionDraftArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface ContentDraftArticleArgs {
  /** If summary text is required, use to truncate the article content by characters. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum. Has no effect if maxWordCount is specified */
  maxCharCount?: Maybe<number>;
  /** If a teaser is required, use to truncate the article content by words. If the client doesn't have permission for the content, the maximum will be the lesser of the predefined teaser length and requested maximum */
  maxWordCount?: Maybe<number>;
}
export interface SummaryDraftArticleArgs {
  
  maxCharCount?: Maybe<number>;
}
export interface SynonymsDraftArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TagsDraftArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TopicConnectionDraftArticleArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TopicsDraftArticleArgs {
  
  maxCount?: Maybe<number>;
}
export interface ListDraftArticlesArgs {
  /** The maximum number of draft articles you want to take, defaults to 10 */
  first?: number;
  /** The number of draft articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface TeaserDraftTileArgs {
  
  maxCharCount?: Maybe<number>;
}
export interface SectionsEditionArgs {
  
  includeFrontPage?: boolean;
}
export interface ListEditionsPagedArgs {
  /** The maximum number of editions you want to take, defaults to 10 */
  first?: number;
  /** Grouping options, useful to deduplicate results */
  group?: Maybe<EditionGroupOptions>;
  /** Region filter, to get the editions for a specific region */
  region?: Maybe<Region>;
  /** The number of editions to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ArticlesHierarchyCategoryArgs {
  
  templates?: Maybe<(Maybe<TemplateType>)[]>;
}
export interface CropImageArgs {
  
  ratio: Ratio;
}
export interface ApplyOfferToSubscriptionMutationArgs {
  
  offerId: string;
  
  subscriptionId: string;
}
export interface CancelSubscriptionMutationArgs {
  
  id: string;
  
  reason: string;
}
export interface SaveAuthorBookmarksMutationArgs {
  
  bookmarks: BookmarkSaveInput[];
}
export interface SaveBookmarksMutationArgs {
  
  bookmarks: BookmarkSaveInput[];
}
export interface SubscribeNewsletterMutationArgs {
  
  code: string;
}
export interface UnsaveAuthorBookmarksMutationArgs {
  
  bookmarks: BookmarkUnsaveInput[];
}
export interface UnsaveBookmarksMutationArgs {
  
  bookmarks: BookmarkUnsaveInput[];
}
export interface UnsubscribeNewsletterMutationArgs {
  
  code: string;
}
export interface ChildConnectionPaginatedPageSliceArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: boolean;
  
  first?: Maybe<number>;
}
export interface SlicesPuzzleSectionArgs {
  
  includePuffSlices?: boolean;
}
export interface ListPuzzlesArgs {
  /** The maximum number of puzzles you want to take, defaults to 10 */
  first?: number;
  /** The number of puzzles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ArticleQueryArgs {
  
  id: string;
}
export interface ArticlesQueryArgs {
  
  escenicId?: Maybe<number>;
  
  ids?: Maybe<string[]>;
  
  parentId?: Maybe<string>;
  
  publishedBefore?: Maybe<DateTime>;
  
  publishedSince?: Maybe<DateTime>;
  
  shortIdentifier?: Maybe<string>;
  
  updatedBefore?: Maybe<DateTime>;
  
  updatedSince?: Maybe<DateTime>;
  
  updatedSysdateSince?: Maybe<DateTime>;
}
export interface AuthorQueryArgs {
  /** An author's URL slug */
  slug: Slug;
}
export interface CategoriesQueryArgs {
  
  cursor?: Maybe<Cursor>;
  
  first?: Maybe<number>;
  
  term?: Maybe<string>;
}
export interface CategoryQueryArgs {
  
  id?: Maybe<string>;
  
  slug?: Maybe<Slug>;
}
export interface DraftArticleQueryArgs {
  
  id: string;
}
export interface DraftArticlesQueryArgs {
  
  ids?: Maybe<string[]>;
  
  publishedBefore?: Maybe<DateTime>;
  
  publishedSince?: Maybe<DateTime>;
  
  updatedBefore?: Maybe<DateTime>;
  
  updatedSince?: Maybe<DateTime>;
}
export interface EditionQueryArgs {
  
  id: string;
  
  minRevision?: Maybe<BigInt>;
}
export interface EditionsQueryArgs {
  
  date?: Maybe<ShortDate>;
  
  ids?: Maybe<string[]>;
  
  updatedSince?: Maybe<DateTime>;
}
export interface InteractiveQueryArgs {
  
  id: string;
}
export interface MenuQueryArgs {
  
  id: string;
}
export interface NewsletterQueryArgs {
  
  code: string;
}
export interface PageQueryArgs {
  
  currentRevision?: Maybe<string>;
  
  slug: Slug;
}
export interface PreviewPageQueryArgs {
  
  slug: Slug;
}
export interface PuzzleQueryArgs {
  
  shortIdentifier: string;
}
export interface PuzzlesQueryArgs {
  
  dateBefore?: Maybe<ShortDate>;
  
  dateSince?: Maybe<ShortDate>;
  
  group?: Maybe<string>;
  
  type?: Maybe<string>;
}
export interface SectionQueryArgs {
  
  id: string;
}
export interface SportCompetitionQueryArgs {
  
  id: string;
}
export interface TagQueryArgs {
  
  externalId?: Maybe<string>;
  
  id?: Maybe<string>;
}
export interface TagsQueryArgs {
  
  cursor?: Maybe<Cursor>;
  
  dateFilter?: Maybe<DateFilter>;
  
  desc?: Maybe<boolean>;
  
  externalId?: Maybe<string>;
  
  first?: Maybe<number>;
  
  ids?: Maybe<string[]>;
  
  isOverflow?: Maybe<boolean>;
  
  term?: Maybe<string>;
}
export interface TilesQueryArgs {
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TopicQueryArgs {
  
  id?: Maybe<string>;
  
  slug?: Maybe<Slug>;
}
export interface TopicsQueryArgs {
  
  cursor?: Maybe<Cursor>;
  
  first?: Maybe<number>;
  
  term?: Maybe<string>;
}
export interface SlicesStandardSectionArgs {
  
  enableContainers?: boolean;
}
export interface ArticlesTagArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface DraftArticlesTagArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface SynonymsTagArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface TeaserTileArgs {
  
  maxCharCount?: Maybe<number>;
}
export interface ArticleConnectionTopicArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface ArticlesTopicArgs {
  
  templates?: Maybe<(Maybe<TemplateType>)[]>;
}
export interface DraftArticleConnectionTopicArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface DraftArticlesTopicArgs {
  
  templates?: Maybe<(Maybe<TemplateType>)[]>;
}
export interface TagConnectionTopicArgs {
  
  cursor?: Maybe<Cursor>;
  
  desc?: Maybe<boolean>;
  
  first?: Maybe<number>;
}
export interface IdsTopicArticlesArgs {
  
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ListTopicArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface IdsTopicDraftArticlesArgs {
  
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface ListTopicDraftArticlesArgs {
  /** The maximum number of articles you want to take, defaults to 10 */
  first?: number;
  /** The number of articles to skip over, useful for paging, defaults to 0 */
  skip?: number;
}
export interface AuthorBookmarksUserArgs {
  
  first?: number;
  
  skip?: number;
}
export interface BookmarksUserArgs {
  
  first?: number;
  
  skip?: number;
}
export interface SpotimCodeBUserArgs {
  
  codeA: string;
}


// ====================================================
// Unions
// ====================================================



export type ArticleByline = AuthorByline | TextByline;


export type CollectionLink = CustomLink | Link | PageLink | TopicLink;


export type DraftTileArticle = Article | DraftArticle;


export type FrontPageSectionSlice = InTheNewsSlice | LeadOneAndOneFrontSlice | LeadOneFullWidthFrontSlice | LeadTwoFrontSlice | LeadTwoNoPicAndTwoFrontSlice;


export type MagazineSectionSlice = CommentLeadAndCartoonSlice | CommentTwoAndNotebookSlice | ContainerSlice | FocusSlice | LeadOneAndFourSlice | LeadOneAndOneSlice | LeadOneAndTwoSlice | LeadOneFullWidthSlice | LeadOneNoPicAndOneAndPortraitSlice | LeadTwoNoPicAndTwoSlice | LeadersSlice | LetterThundererPodcastSlice | ObituariesLeadAndTwoSlice | OpinionOneAndTwoSlice | PuffSlice | SecondaryFourSlice | SecondaryOneAndColumnistSlice | SecondaryOneAndFourSlice | SecondaryOneSlice | SecondaryTwoAndTwoSlice | SecondaryTwoNoPicAndTwoSlice | StandardSlice | SupplementLeadAndFourStackSlice | SupplementSecondaryOneAndFourSlice | TwoPicAndSixNoPicSlice;


export type Media = Image | Video;


export type PageBlock = Collection;


export type PageTile = ArticleReference | CustomComponent | EmptyCategoryReference | EmptyInheritedReference | EmptyReference | EmptyTopicReference | ExternalReference;


export type PuffMainLinkRef = ArticleLink | Link;


export type PuffSecondaryLinkRef = Anchor | ArticleLink | Link;


export type PuzzleSectionSlice = PuffSlice | Puzzle;


export type StandardPageSlice = PageSlice | PaginatedPageSlice | TopicAuthorSlice;


export type StandardSectionSlice = CommentLeadAndCartoonSlice | CommentTwoAndNotebookSlice | ContainerSlice | DailyUniversalRegister | FocusSlice | LeadOneAndFourSlice | LeadOneAndOneSlice | LeadOneAndTwoSlice | LeadOneFullWidthSlice | LeadOneNoPicAndOneAndPortraitSlice | LeadTwoNoPicAndTwoSlice | LeadersSlice | LetterThundererPodcastSlice | ObituariesLeadAndTwoSlice | OpinionOneAndTwoSlice | PuffSlice | SecondaryFourSlice | SecondaryOneAndColumnistSlice | SecondaryOneAndFourSlice | SecondaryOneSlice | SecondaryTwoAndTwoSlice | SecondaryTwoNoPicAndTwoSlice | StandardSlice | SupplementLeadAndFourStackSlice | SupplementSecondaryOneAndFourSlice | TopSecondaryFourSlice | TopSecondaryTwoAndTwoSlice | TopSecondaryTwoNoPicAndTwoSlice | TwoPicAndSixNoPicSlice;


