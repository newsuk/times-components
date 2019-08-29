import { MockList } from "graphql-tools";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";

export default ({ id } = {}) => [
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
    query: getBookmarks,
    variables: {},
    delay: 1000
  },
  {
    query: saveBookmarks,
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
