import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";
import { makeClient } from "@times-components/utils";

const client = makeClient();
const saveApi = {
  bookmark: id =>
    client.mutate({
      mutation: saveBookmarks,
      variables: {
        id
      }
    }),
  getBookmarks: () => client.query({ query: getBookmarks }),
  unBookmark: id =>
    client.mutate({
      mutation: unsaveBookmarks,
      variables: {
        id
      }
    })
};

export default saveApi;
