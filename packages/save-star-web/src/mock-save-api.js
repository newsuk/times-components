export default ({
  bookmark: id => Promise.resolve(true),
  unbookmark: id => Promise.resolve(true),
  getBookmarks: () => Promise.resolve({
    data: {
      viewer: {
        bookmarks: {
          bookmarks: [
            {
              id: "123"
            },
            {
              id: "456"
            }
          ],
          total: 2
        }
      }
    }
  })
})
