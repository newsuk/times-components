const Slack = require("./Slack");
const SlackEditionIntegration = require("./SlackEditionIntegration");
const EditionChecker = require("./EditionChecker");
const { unshiftContext } = require("./util");
const api = require("./api");

async function main(getData, options) {
  const slackIntegration =
    options.slackHook && options.slackUsername
      ? new SlackEditionIntegration(
          new Slack(options.slackHook, options.slackUsername)
        )
      : null;

  const data = await getData(options);
  const editionChecker = new EditionChecker(options, data, slackIntegration);

  return editionChecker.crawl();
}

function boot(command, options, getData) {
  if (!options.acs || !options.sacs || !options.api) {
    command.usage();
    process.exit(1);
    return;
  }

  const enhancedOptions = {
    ...options,
    concurrency: Number(options.concurrency),
    max: Number(options.max),
    maxAttempts: Number(options.maxAttempts)
  };

  main(getData, enhancedOptions)
    .then(({ hasFailed }) => {
      process.exit(hasFailed ? 2 : 0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

exports.edition = unshiftContext((command, options) =>
  boot(command, options, api.getEditionData)
);
exports.pastSixDays = unshiftContext((command, options) =>
  boot(command, options, api.getPastSixDaysData)
);
