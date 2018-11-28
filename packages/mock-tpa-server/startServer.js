const server = require("./dist/index")
const { MockArticle } = require("@times-components/fixture-generator")

const mockArticle = new MockArticle()
.sundayTimes()
.withRelatedArticles(1)
.get()

server.startWithMockData({Article: mockArticle})

