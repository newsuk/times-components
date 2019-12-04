/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { ArticleBookmarked } from "@times-components/provider";
import {
  saveBookmarks,
  unsaveBookmarks,
  articleBookmarked
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

function onSaveMutationUpdate(
  cache,
  { data: { saveBookmarks: bookmarks = [] } }
) {
  bookmarks.forEach(bookmark => addBookmark(cache, bookmark.id));
}

function onUnsaveMutationUpdate(
  cache,
  { data: { unsaveBookmarks: ids = [] } }
) {
  ids.forEach(articleId => removeBookmark(cache, articleId));
}

function SaveAPI({ articleId, children }) {
  return (
    <ArticleBookmarked id={articleId} debounceTimeMs={0}>
      {({ isLoading, article }) => {
        const isSaved = article && Boolean(article.isBookmarked);
        return (
          <Mutation mutation={saveBookmarks} update={onSaveMutationUpdate}>
            {(save, { loading: saveMutationLoading }) => (
              <Mutation
                mutation={unsaveBookmarks}
                update={onUnsaveMutationUpdate}
              >
                {(unsave, { loading: unsaveMutationLoading }) =>
                  children({
                    savedStatus: isSaved,
                    async toggleSaved() {
                      const args = { variables: { id: articleId } };

                      if (isSaved) {
                        await unsave(args);
                      } else {
                        await save(args);
                      }
                    },
                    isLoading:
                      isLoading || saveMutationLoading || unsaveMutationLoading
                  })
                }
              </Mutation>
            )}
          </Mutation>
        );
      }}
    </ArticleBookmarked>
  );
}

SaveAPI.propTypes = {
  children: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};

export default SaveAPI;
