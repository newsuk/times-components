import { adConfig } from "./ad-mock";

const sharedProps = {
  adConfig,
  analyticsStream: () => {},
  onAuthorPress: () => {},
  onCommentGuidelinesPress: () => {},
  onCommentsPress: () => {},
  onLinkPress: () => {},
  onRelatedArticlePress: () => {},
  onTopicPress: () => {},
  onTwitterLinkPress: () => {},
  onVideoPress: () => {},
  onViewed: () => {},
  receiveChildList: () => {},
  refetch: () => {}
};

export default sharedProps;
