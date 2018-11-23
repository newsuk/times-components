const { MockArticle } = require("@times-components/fixture-generator")
const mockTpa = require("./dist/index")

mockTpa.startWithMockData({Article:new MockArticle()
    .sundayTimes()
    .withRelatedArticles(3)
    .create()
    })
