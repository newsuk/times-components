import { CanShowPuzzleSidebar } from "../src/index";

describe("CanShowPuzzleSidebar should", () => {
  it("not allow the sidebar to show on the news articles", () => {
    expect(CanShowPuzzleSidebar("News")).toBeFalsy();
  });
  it("allow the sidebar to show on Times2", () => {
    expect(CanShowPuzzleSidebar("Times2")).toBeTruthy();
  });
});
