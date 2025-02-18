import { CanShowPuzzleSidebar } from "../src/index";

describe("CanShowPuzzleSidebar should", () => {
  it("not allow the sidebar to show on the news articles", () => {
    expect(CanShowPuzzleSidebar("news")).toBeFalsy();
  });
  it("allow the sidebar to show on Times2", () => {
    expect(CanShowPuzzleSidebar("culture")).toBeTruthy();
  });
});
