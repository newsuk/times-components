const mockTpa = require("@times-components/mock-tpa-server");

module.exports = (on, config) => {
  on('task', {
    startMockServerWith (data) {
      return mockTpa.startWithMockData(data) 
    }
  })
}
