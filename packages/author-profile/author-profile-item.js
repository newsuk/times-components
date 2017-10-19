import React from "react";
import get from "lodash.get";
import { View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";

const AuthorProfileItem = item => {
  const {
    style,
    content,
    label,
    loading,
    onPress,
    publicationName,
    publishedTime,
    title,
    url
  } = item;

  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

  if (loading) {
    return (
      <View>
        <Card loading={loading} />
      </View>
    );
  }

  return (
    <Link url={url} onPress={onPress}>
      <View style={style}>
        <Card
          headline={title}
          text={content}
          image={imageUri ? { uri: imageUri } : null}
          date={publishedTime}
          label={label}
          publication={publicationName}
        />
      </View>
    </Link>
  );
};

export default withTrackEvents(AuthorProfileItem, {
  analyticsEvents: [
    {
      eventName: "onPress",
      actionName: "Pressed",
      getAttrs: ({ title, id }) => ({ articleTitle: title, articleId: id })
    }
  ]
});
