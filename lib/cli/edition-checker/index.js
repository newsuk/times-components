const main = require("./src/main");

function configureShared(subcommander) {
  subcommander
    .option("acs", {
      desc:
        "Times acs cookie. You can also set this with the ACS_COOKIE env variable (required)",
      default: process.env.ACS_COOKIE
    })
    .option("sacs", {
      desc:
        "Times sacs cookie. You can also set this with the SACS_COOKIE env variable (required)",
      default: process.env.SACS_COOKIE
    })
    .option("api", {
      abbr: "a",
      desc:
        "Times API root. You can also set this with the TIMES_API_ROOT env variable (required)",
      default: process.env.TIMES_API_ROOT
    })
    .option("max", {
      abbr: "m",
      desc:
        "Maximum number of articles you would like to check. Do not set this if you wish to check every article (-1 for no max)",
      default: "-1"
    })
    .option("concurrency", {
      abbr: "c",
      desc:
        "Maximum number of articles to check simultaneously. The higher this is, the faster the tool will run. The tool is also less reliable at higher concurrencies",
      default: 5
    })
    .option("maxAttempts", {
      abbr: "a",
      desc:
        "Maximum number of times to attempt an article check when there has been a network failure",
      default: 3
    })
    .option("articlePath", {
      abbr: "p",
      desc: "Times article root",
      default: "https://thetimes.co.uk/article"
    })
    .option("verbose", {
      abbr: "v",
      desc: "Show hidden logs",
      flag: true
    })
    .option("slackHook", {
      desc:
        "Slack API hook. You can also set this with the TIMES_SLACK_HOOK env variable",
      default: process.env.TIMES_SLACK_HOOK
    })
    .option("slackUsername", {
      desc:
        "Slack Bot username. You can also set this with the TIMES_SLACK_USERNAME env variable",
      default: process.env.TIMES_SLACK_USERNAME || "Times Edition Checker"
    });
}

function configureEdition(subcommander) {
  const edition = subcommander.command("edition", {
    desc: "Crawl articles contained within a specific edition",
    callback: main.edition
  });

  configureShared(edition);

  edition.option("edition", {
    abbr: "e",
    desc: "Edition to check",
    default: "latest"
  });
}

function configurePastSixDays(subcommander) {
  const pastSixDays = subcommander.command("past-six-days", {
    desc: "Crawl articles contained within the past six editions",
    callback: main.pastSixDays
  });

  configureShared(pastSixDays);
}

function configure(subcommander, command) {
  const check = subcommander.command(command, {
    desc: "Crawl times articles and report status codes"
  });

  configureEdition(check);
  configurePastSixDays(check);
}

module.exports = configure;
