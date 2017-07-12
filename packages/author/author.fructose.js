/* globals withComponent test expect element by */
import React from "react";
import Author from "./author";

withComponent(<Author />, "author component", () => {
  test("Author component renders in device", async () => {
    await expect(element(by.text(`Author Bios!`))).toBeVisible();
  });
});
