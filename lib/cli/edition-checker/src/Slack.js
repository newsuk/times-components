const fetch = require("node-fetch");

class Slack {
  constructor(hook, username) {
    this.hook = hook;
    this.username = username;
  }

  async post(text) {
    await fetch(this.hook, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: `payload=${encodeURIComponent(
        JSON.stringify({
          text,
          username: this.username
        })
      )}`
    });
  }
}

module.exports = Slack;
