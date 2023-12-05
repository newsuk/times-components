class SlackEditionIntegration {
  constructor(slack) {
    this.slack = slack;
  }

  post({ title, ids, total }, results) {
    const info = `${title}. ${ids.length}/${total} articles checked.`;

    if (!results || !results.length) {
      return this.slack.post(`${info} No issues found`);
    }

    const header = `${info} Found ${results.length} problems.`;
    const resultText = results
      .map(result => `(${result.status}): ${result.id} – <${result.url}>`)
      .join(`\n`);
    const text = `${header}\n\`\`\`${resultText}\`\`\``;

    return this.slack.post(text);
  }
}

module.exports = SlackEditionIntegration;
