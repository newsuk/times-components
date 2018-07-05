import {
  getSelfContainedFunctionErrors,
  reportErrors
} from "../../fixtures/check-self-contained-function";

describe("checkSelfContainedFunction", () => {
  it("does not find errors in function that does not use global variables", () => {
    function f(a1) {
      const useOfA1 = a1;
      function X(a3) {
        const secondUseOfA1 = a1;
        a3(secondUseOfA1, useOfA1);
      }
      X();
    }
    expect(getSelfContainedFunctionErrors(f)).toEqual([]);
  });

  it("does not find errors in an unnamed function", () => {
    expect(getSelfContainedFunctionErrors(() => {})).toEqual([]);
  });

  it("does not find errors in a function using console", () => {
    // eslint-disable-next-line no-console
    expect(getSelfContainedFunctionErrors(() => console.log("Hi!"))).toEqual(
      []
    );
  });

  it("finds errors in a function that refers to a global variable", () => {
    function f() {
      setTimeout(f, 1);
    }
    expect(getSelfContainedFunctionErrors(f)).not.toEqual([]);
  });

  it("finds errors in a function that uses classes", () => {
    function f() {
      class Foo {}
      return Foo;
    }
    expect(getSelfContainedFunctionErrors(f)).not.toEqual([]);
  });

  it("logs errors to the console", () => {
    jest.spyOn(console, "error").mockImplementation();
    reportErrors(getSelfContainedFunctionErrors(() => {}));
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
    function f() {
      setTimeout(f, 1);
    }
    reportErrors(getSelfContainedFunctionErrors(f));
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
  });
});
