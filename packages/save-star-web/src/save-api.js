/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { ArticleBookmarked } from "@times-components/provider";
import { articleBookmarked
} from "@times-components/provider-queries";

function updateCache(cache, { id, isBookmarked }) {
  const cached = cache.readQuery({
    query: articleBookmarked,
    variables: { id }
  });

  cache.writeQuery({
    query: articleBookmarked,
    variables: { id },
    data: {
      ...cached,
      article: {
        ...cached.article,
        isBookmarked
      }
    }
  });
}

function addBookmark(cache, id) {
  updateCache(cache, { id, isBookmarked: true });
}

function removeBookmark(cache, id) {
  updateCache(cache, { id, isBookmarked: false });
}
function SaveAPI({ articleId, children }) {
  return (
    <ArticleBookmarked id={articleId} debounceTimeMs={0}>
      {({ isLoading, article }) => {
        const isSaved = article && Boolean(article.isBookmarked);
      }}
    </ArticleBookmarked>
  );
}

SaveAPI.propTypes = {
  children: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};

export default SaveAPI;
