module.exports = () => ({
  mutate: () =>
    Promise.resolve({
      data: {
        saveBookmarks: [
          {
            id: "123"
          },
          {
            id: "456"
          },
          {
            id: "567"
          }
        ],
        unsaveBookmarks: ["123"]
      }
    }),
  query: () =>
    Promise.resolve({
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
      },
      loading: false
    })
});
