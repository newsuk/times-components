const { MockArticle } = require("@times-components/fixture-generator")
const mockTpa = require("./dist/index")

mockTpa.startWithMockData({Article:new MockArticle()
    .withSundayTimes()
    .withRelatedArticles(3)
    .create()
    })
