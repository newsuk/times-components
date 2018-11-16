const mockTpa = require("@times-components/mock-tpa-server");

module.exports = (on, config) => {
 
  on('task', {
    startServer () {
      return mockTpa.start() 
    }
  })
}