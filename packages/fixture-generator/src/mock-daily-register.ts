import { DailyUniversalRegisterItem } from "./types";
import MockMarkup from "./mock-markup";
import MockDailyRegisterMarkup from "./mock-markup-daily-register";

class MockDailyRegister {
  dailyRegister: DailyUniversalRegisterItem;

  constructor() {
    this.dailyRegister = {
      byline: new MockMarkup().addInlines().get(),
      content: new MockDailyRegisterMarkup().addBirthdaysToday(1).get(),
      title: "Nature notes"
    };
  }

  get() {
    return this.dailyRegister;
  }
}

export default MockDailyRegister;
