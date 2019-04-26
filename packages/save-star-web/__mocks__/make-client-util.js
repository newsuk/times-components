module.exports = () => ({
  mutate: () =>
    Promise.resolve({
      data: {
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
            total: 4
          }
        }
      },
      loading: false
    })
});
