import {
  getSerialisableFunctionErrors,
  reportErrors
} from "./check-serialisable-function";

describe("checkSerialisableFunction", () => {
  it("does not find errors in function that does not use global variables", () => {
    function f(a1) {
      const useOfA1 = a1;
      function X(a3) {
        const secondUseOfA1 = a1;
        a3(secondUseOfA1, useOfA1);
      }
      X();
    }
    expect(getSerialisableFunctionErrors(f)).toEqual([]);
  });

  it("does not find errors in an unnamed function", () => {
    expect(getSerialisableFunctionErrors(() => {})).toEqual([]);
  });

  it("does not find errors in a function using console", () => {
    // eslint-disable-next-line no-console
    expect(getSerialisableFunctionErrors(() => console.log("Hi!"))).toEqual([]);
  });

  it("finds errors in a function that refers to a global variable", () => {
    function f() {
      setTimeout(f, 1);
    }
    expect(getSerialisableFunctionErrors(f)).not.toEqual([]);
  });

  it("finds errors in a function that uses classes", () => {
    function f() {
      class Foo {}
      return Foo;
    }
    expect(getSerialisableFunctionErrors(f)).not.toEqual([]);
  });

  it("logs errors to the console", () => {
    jest.spyOn(console, "error").mockImplementation();
    reportErrors(getSerialisableFunctionErrors(() => {}));
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
    function f() {
      setTimeout(f, 1);
    }
    reportErrors(getSerialisableFunctionErrors(f));
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });
});
