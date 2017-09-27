/* globals Chromeless withComponent describe beforeEach afterEach test expect */

import React from "react";
import Image from "../image";

let chromeless;
const setup = () => {
  chromeless = new Chromeless();
};

const teardown = async () => {
  await chromeless.end();
};

withComponent(
  <Image
    fructoseID="web-component"
    source={{
      uri:
        "https://vignette.wikia.nocookie.net/lotr/images/e/e9/Crazy_bilbo.jpg/revision/latest/scale-to-width-down/180?cb=20121220104853"
    }}
  />,
  "basic text",
  fructose => {
    describe("fructose", () => {
      beforeEach(setup);
      afterEach(async () => {
        await teardown;
      });

      test("loads up a component", async () => {
        await chromeless
          .goto("http://localhost:3000")
          .exists("[data-testid='fructose']");
        await fructose.loadComponent();
        const selector = `[src='https://vignette.wikia.nocookie.net/lotr/images/e/e9/Crazy_bilbo.jpg/revision/latest/scale-to-width-down/180?cb=20121220104853']`;
        const exists = await chromeless.wait(selector).exists(selector);
        expect(exists).toBe(true);
      });
    });
  }
);
