import MockDailyRegister from "../mock-daily-register";

describe("The mock Daily Register", () => {
  it("should return the minimum daily register type requirements", () => {
    const mockDailyRegister = new MockDailyRegister().get();
    expect(mockDailyRegister).toHaveProperty("title");
    expect(mockDailyRegister).toHaveProperty("content");
    expect(mockDailyRegister).toHaveProperty("byline");
  });
});
