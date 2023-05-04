/* eslint-disable no-console */
import logger from "../../src/utils/logger";

export default () => {
  it("for type error", () => {
    console.error = jest.fn();
    logger("error", "bar");
    expect(console.error).toHaveBeenCalledWith("bar");
  });

  it("for type warn", () => {
    console.warn = jest.fn();
    logger("warn", "bar");
    expect(console.warn).toHaveBeenCalledWith("bar");
  });

  it("for type info", () => {
    console.info = jest.fn();
    logger("info", "bar");
    expect(console.info).toHaveBeenCalledWith("bar");
  });

  it("for type debug", () => {
    console.debug = jest.fn();
    logger("debug", "bar");
    expect(console.debug).toHaveBeenCalledWith("bar");
  });

  it("for type log", () => {
    console.log = jest.fn();
    logger("log", "bar");
    expect(console.log).toHaveBeenCalledWith("bar");
  });

  it("for unsupported type", () => {
    console.log = jest.fn();
    logger("foo", "bar");
    expect(console.log).toHaveBeenCalledWith("foo");
    expect(console.log).toHaveBeenCalledWith("bar");
  });
};
