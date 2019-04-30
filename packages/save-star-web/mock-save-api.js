export default {
  bookmark: () =>
    Promise.resolve({
      data: {
        saveBookmarks: [
          {
            id: "96508c84-6611-11e9-adc2-05e1b87efaea"
          },
          {
            id: "9bd029d2-49a1-11e9-b472-f58a50a13bbb"
          },
          {
            id: "5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          }
        ]
      }
    }),
  getBookmarks: () =>
    Promise.resolve({
      data: {
        viewer: {
          bookmarks: {
            bookmarks: [
              {
                id: "96508c84-6611-11e9-adc2-05e1b87efaea"
              },
              {
                id: "5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
              }
            ],
            total: 2
          }
        }
      },
      loading: false
    }),
  unBookmark: () =>
    Promise.resolve({
      data: {
        unsaveBookmarks: ["5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"]
      }
    })
};
