const fetch = require("node-fetch");
const PromisePool = require("es6-promise-pool");

const { retry } = require("./util");

class EditionChecker {
  constructor(options, { ids, title }, slackEditionIntegration) {
    this.options = options;
    this.title = title;
    this.total = ids.length;
    this.ids = options.max >= 0 ? ids.slice(0, options.max) : ids;
    this.slackEditionIntegration = slackEditionIntegration;
  }

  async getArticleStatus(id) {
    const { acs, sacs, articlePath } = this.options;

    const url = `${articlePath}/${id}?react=1`;
    const { status } = await fetch(url, {
      headers: {
        cookie: `acs_tnl=${acs}; sacs_tnl=${sacs}`
      }
    });

    return { url, status, id };
  }

  *articleStatusGenerator() {
    const { ids, options } = this;

    // eslint-disable-next-line no-restricted-syntax
    for (const id of ids) {
      yield retry(
        options.maxAttempts,
        () => this.getArticleStatus(id, options),
        (error, attempt, willRetry) => {
          if (willRetry) {
            console.warn(
              `(${id}) retrying (${attempt}/${options.maxAttempts})`
            );

            if (options.verbose) {
              console.warn(error);
            }
          }
        }
      );
    }
  }

  async pool() {
    const results = [];
    const pool = new PromisePool(
      this.articleStatusGenerator.bind(this),
      this.options.concurrency
    );

    let i = 0;

    pool.addEventListener("fulfilled", evt => {
      const { result } = evt.data;

      if (result.status !== 200) {
        results.push(result);
      }

      i += 1;
      this.logResult(i, result);
    });

    await pool.start();

    return results;
  }

  async crawl() {
    const { ids, total, options } = this;

    console.log(
      `Checking ${ids.length}/${total} articles, with concurrency of ${
        options.concurrency
      }`
    );

    const results = await this.pool();

    if (this.slackEditionIntegration) {
      console.log("Posting to slack…");
      await this.slackEditionIntegration.post(this, results);
    }

    return { hasFailed: !!results.length };
  }

  logResult(i, { status, id, url }) {
    const info = `(${i}/${this.ids.length})`;

    if (status === 200) {
      console.log(info);
    } else {
      console.log(`${info}: ${status} - ${id} (${url})`);
    }
  }
}

module.exports = EditionChecker;
