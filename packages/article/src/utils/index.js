const getMediaList = (content, leadAsset) => {
  const ast = content || [];

  let index = 0;
  const mediaList = [];

  if (leadAsset) {
    index += 1;
    mediaList.push({
      index: 0,
      name: "leadAsset",
      value: leadAsset
    });
  }

  const inlineMediaList = ast.filter(
    item => item.name === "image" || item.name === "video"
  );

  inlineMediaList.forEach(item => {
    let inlineMedia;

    if (item.name === "video") {
      const { caption, posterImageUrl, skySports } = item.attributes;
      inlineMedia = {
        index,
        name: "inlineVideo",
        value: {
          caption,
          posterImageUrl,
          skySports
        }
      };
    } else {
      inlineMedia = {
        index,
        name: "inlineImage",
        value: item.attributes
      };
    }
    index += 1;
    mediaList.push(inlineMedia);
  });

  return mediaList;
};

const addIndexesToInlineImages = (content, leadAsset) => {
  const mutatedContent = content || [];
  let index = leadAsset ? 1 : 0;

  mutatedContent.forEach(item => {
    const contentItem = item;
    if (contentItem.name === "image" || contentItem.name === "video") {
      contentItem.attributes.imageIndex = index;
      index += 1;
    }
  });

  return mutatedContent;
};

export { addIndexesToInlineImages, getMediaList };
