import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";
import makeClient from "./make-client-util";

const client = makeClient();
export default {
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
