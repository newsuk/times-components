import MockDailyRegisterMarkup from "../mock-markup-daily-register";

describe("get markup", () => {
  it("returns an array", () => {
    expect(new MockDailyRegisterMarkup().get()).toEqual([]);
  });

  it("should be able to generate briefing tile of markup", () => {
    const mockDailyRegisterMarkup = new MockDailyRegisterMarkup().addBriefing().get();
    expect(mockDailyRegisterMarkup).toMatchObject([{ name: "paragraph" }, { name: "paragraph" }]);
  });

  it("should be able to generate on this day tile of markup", () => {
    const mockDailyRegisterMarkup = new MockDailyRegisterMarkup().addOnThisDay().get();
    expect(mockDailyRegisterMarkup).toMatchObject([{ name: "paragraph" }]);
  });

  it("should be able to generate nature notes tile of markup", () => {
    const mockDailyRegisterMarkup = new MockDailyRegisterMarkup().addNatureNotes().get();
    expect(mockDailyRegisterMarkup).toMatchObject([{ name: "paragraph" }]);
  });

  it("should be able to generate birthdays today tile of markup", () => {
    const mockDailyRegisterMarkup = new MockDailyRegisterMarkup().addBirthdaysToday().get();
    expect(mockDailyRegisterMarkup).toMatchObject([{ name: "paragraph" }]);
  });

  it("should generate large markup shapes", () => {
    expect(
      new MockDailyRegisterMarkup()
        .addBirthdaysToday(5)
        .get()
    ).toMatchObject([
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" },
      { name: "paragraph" }
    ])
  });
});
