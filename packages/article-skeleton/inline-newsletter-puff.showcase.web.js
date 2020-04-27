import React from "react";

import InlineNewsletterPuff from "./src/article-body/inline-newsletter-puff.js";

export default {
  children: [
    {
      component: () => (
        <InlineNewsletterPuff
          newsletterId="a2l6E000000CdHzQAK"
          copy="Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am."
          label="STRAIGHT IN YOUR INBOX"
          headline="Politics. Explained."
        />
      ),
      name: "Default",
      platform: "web",
      type: "story"
    }
  ],
  name: "Composed/Inline Newsletter Puff"
};
