import React from "react";
import { customToNewsKitIcon } from "newskit";

import ShareIcon from "./share";
import BookmarkOutlineIcon from "./bookmark-outline";
import BookmarkFilledIcon from "./bookmark-filled";

export const NewsKitShareIcon = customToNewsKitIcon(
  "NewsKitShareIcon",
  props => <ShareIcon {...props} />
);
export const NewsKitBookmarkFilledIcon = customToNewsKitIcon(
  "NewsKitBookmarkFilledIcon",
  props => <BookmarkFilledIcon {...props} />
);
export const NewsKitBookmarkOutlineIcon = customToNewsKitIcon(
  "NewsKitBookmarkOutlineIcon",
  props => <BookmarkOutlineIcon {...props} />
);
