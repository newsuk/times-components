import { Linter } from "eslint";

export const getSelfContainedFunctionErrors = f => {
  const linter = new Linter();
  // eslint can't handle top level unnamed function
  const source = String(f).replace(/^function\s*\(/, "function _(");
  return linter
    .verify(source, {
      rules: { "no-undef": "error" }
    })
    .filter(e => !/'cov_\w+' is not defined./.test(e.message))
    .filter(e => !/'console' is not defined./.test(e.message))
    .filter(e => !/'_toConsumableArray2' is not defined./.test(e.message))
    .filter(e => !/'Promise' is not defined./.test(e.message));
};

export const reportErrors = (errors, source) => {
  if (errors.length === 0) {
    return;
  }
  const message = `
Errors found:
${errors
    .map(e => `${e.message} at line ${e.line} column ${e.column}`)
    .join("\n")}

Source:
${String(source)
    .split("\n")
    .map((line, i) => `${i + 1}:   ${line}`)
    .join("\n")}
`;
  // eslint-disable-next-line no-console
  console.error(message);
};

export const expectFunctionToBeSelfContained = f => {
  const errors = getSelfContainedFunctionErrors(f);
  reportErrors(errors);
  expect(errors).toEqual([]);
  // Object.assign transpiles to _extends global helper in react native compile, but
  // not in web compile, so getSelfContainedFunctionErrors doesn't catch the error
  expect(String(f)).not.toContain("Object.assign");
};
