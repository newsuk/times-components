import MockUser from "../mock-user";

 describe("The mock User", () => {
  it("should return the bookmarks fields", () => {
    const mockUser = new MockUser().get();
    expect(mockUser).toHaveProperty("bookmarks");
  });

   it("bookmarks should have bookmarks and total fields", () => {
    const mockUser = new MockUser().get();
    expect(mockUser.bookmarks).toHaveProperty("bookmarks");
    expect(mockUser.bookmarks).toHaveProperty("total");
  });

   it("bookmarks object should have total 3 bookmarks and every bookmark should have id property", () => {
    const mockUser = new MockUser().setBookmarksTotal(3);
    expect(mockUser.bookmarks ? mockUser.bookmarks.total : null).toBe(3);
    expect(mockUser.bookmarks ? mockUser.bookmarks.bookmarks.length : null).toBe(3);
    expect(mockUser.bookmarks ? mockUser.bookmarks.bookmarks[0] : null).toHaveProperty("id");
  });
});