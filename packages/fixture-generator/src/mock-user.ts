import { User, Bookmark, PageOfBookmarks } from "./types";
import UUID from "./mock-UUID";

function getBookmarksObject(): PageOfBookmarks {
  return {
    bookmarks: getBookmarks(1),
    total: 1
  };
}

function getBookmarks(total: number): Bookmark[] {
  return new Array(total).fill(0).map(
    (): Bookmark => ({
      id: UUID()
    })
  );
}

class MockUser {
  user: User;

  constructor() {
    this.user = {
      bookmarks: getBookmarksObject()
    };
  }

  setBookmarksTotal(total: number) {
    if (this.user.bookmarks) {
      this.user.bookmarks.total = total;
      this.user.bookmarks.bookmarks = getBookmarks(total);
      return this.user;
    }
    return this.user;
  }

  get() {
    return this.user;
  }
}

export default MockUser;
