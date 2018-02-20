import { Linter } from "eslint";

export const getSerialisableFunctionErrors = f => {
  const linter = new Linter();
  // eslint can't handle top level unnamed function
  const source = String(f).replace(/^function\s*\(/, "function _(");
  return linter
    .verify(source, {
      rules: { "no-undef": "error" }
    })
    .filter(e => !/'cov_\w+' is not defined./.test(e.message))
    .filter(e => !/'console' is not defined./.test(e.message));
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

export const expectFunctionToBeSerialisable = f => {
  const errors = getSerialisableFunctionErrors(f);
  reportErrors(errors);
  expect(errors).toEqual([]);
};
