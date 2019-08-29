import { MockList } from "graphql-tools";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";

export default ({ id, error = () => {} } = {}) => {
  return [
    {
      defaults: {
        types: {
          Bookmark: () => ({
            id
          }),
          PageOfBookmarks: () => ({
            bookmarks: [],
            total: 0
          })
        }
      },
      error: error(),
      query: getBookmarks,
      variables: {},
      delay: 1000
    },
    {
      query: saveBookmarks,
      error: error(),
      variables: {
        id
      },
      defaults: {
        mutationValues: {
          saveBookmarks: () => [{ id, __typename: "Bookmark" }]
        }
      },
      repeatable: true,
      delay: 1000
    },
    {
      query: unsaveBookmarks,
      error: error(),
      variables: {
        id
      },
      defaults: {
        mutationValues: {
          unsaveBookmarks: () => [id]
        }
      },
      repeatable: true,
      delay: 1000
    }
  ];
};
