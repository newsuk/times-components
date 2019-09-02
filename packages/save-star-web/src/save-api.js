/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import get from "lodash.get";
import { Bookmarks } from "@times-components/provider";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";

function cacheReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, ...action.bookmarks];

    case "remove":
      return state.filter(bookmark => !action.ids.includes(bookmark.id));

    default:
      return state;
  }
}

function updateCache(cache, action) {
  const cached = cache.readQuery({
    query: getBookmarks
  });

  const updated = cacheReducer(cached.viewer.bookmarks.bookmarks, action);

  cache.writeQuery({
    query: getBookmarks,
    data: {
      viewer: {
        ...cached.viewer,
        bookmarks: {
          ...cached.viewer.bookmarks,
          total: updated.length,
          bookmarks: updated
        }
      }
    }
  });
}

function onSaveMutationUpdate(cache, { data }) {
  updateCache(cache, { type: "add", bookmarks: data.saveBookmarks });
}

function onUnsaveMutationUpdate(cache, { data }) {
  updateCache(cache, { type: "remove", ids: data.unsaveBookmarks });
}

const hasViewerBookmarkedArticle = (viewer, articleId) =>
  get(viewer, "bookmarks.bookmarks", []).some(
    bookmark => bookmark.id === articleId
  );

function SaveAPI({ articleId, children }) {
  return (
    <Bookmarks debounceTimeMs={0}>
      {({ isLoading, viewer }) => (
        <Mutation mutation={saveBookmarks} update={onSaveMutationUpdate}>
          {(save, { loading: saveMutationLoading }) => (
            <Mutation
              mutation={unsaveBookmarks}
              update={onUnsaveMutationUpdate}
            >
              {(unsave, { loading: unsaveMutationLoading }) => {
                const savedStatus = hasViewerBookmarkedArticle(
                  viewer,
                  articleId
                );

                return children({
                  savedStatus,
                  async toggleSaved() {
                    const args = { variables: { id: articleId } };

                    if (savedStatus) {
                      await unsave(args);
                    } else {
                      await save(args);
                    }
                  },
                  isLoading:
                    isLoading || saveMutationLoading || unsaveMutationLoading
                });
              }}
            </Mutation>
          )}
        </Mutation>
      )}
    </Bookmarks>
  );
}

SaveAPI.propTypes = {
  children: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};

export default SaveAPI;
