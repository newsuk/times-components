# Edition Checker

A tool that allows you to crawl a specific edition or the past six days for issues in loading articles when using react.

This requires being logged in to work, so you must set a `ACS_COOKIE` and `SACS_COOKIE` environment variable. We should probably set up credentials specifically for this tool in the long run.

This also requires the use of an internal Times API, and you must set the path to this with the `TIMES_API_ROOT` environment variable.

You can also configure the tool to post to Slack using a Slack incoming webhook with the `TIMES_SLACK_HOOK` and `TIMES_SLACK_USERNAME` environment variables.

In the long term, it might be useful to consider adding other kinds of checks to the crawler. Currently, the only checks it employs are checking that the status code is 200.

```bash
$ ./times-components check edition # check todays edition
$ ./times-components check edition -e 2019-01-01 # check a specific edition
$ ./times-components check past-six-days # check articles from the past six days

$ ./times-components check [method] -m 30 # only check the first 30 articles
$ ./times-components check [method] -c 30 # check 30 articles at a time
$ ./times-components check [method] -v # verbose, display more information
```
