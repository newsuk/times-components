const lernaExec = require("@lerna-test/command-runner")(require("../command"));
const initFixture = require("@lerna-test/init-fixture")(__dirname);


const doTheThing = async () => {
  const testDir = await initFixture("basic");

  await lernaExec(testDir)("ls", "--since");
}

doTheThing();