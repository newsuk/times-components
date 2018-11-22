const mockTpa = require("@times-components/mock-tpa-server");

module.exports = (on, config) => {
  on('task', {
    startMockServerWith (mockData) {
      return mockTpa.startWithMockData(mockData) 
    }
  })
}
