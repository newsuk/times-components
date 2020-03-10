import { verifyPaidOnly } from "../../src/video.web";

it("verifyPaidOnly true should be true", () => {
  expect(verifyPaidOnly(true)).toBe(true);
});

it("verifyPaidOnly 'true' should be true", () => {
  expect(verifyPaidOnly("true")).toBe(true);
});

it("verifyPaidOnly positive int should be true", () => {
  expect(verifyPaidOnly(1)).toBe(true);
});

it("verifyPaidOnly false should be false", () => {
  expect(verifyPaidOnly(false)).toBe(false);
});

it("verifyPaidOnly 'false' should be false", () => {
  expect(verifyPaidOnly("false")).toBe(false);
});

it("verifyPaidOnly zero should be true", () => {
  expect(verifyPaidOnly(0)).toBe(false);
});

it("verifyPaidOnly undefined should be false", () => {
  expect(verifyPaidOnly(undefined)).toBe(false);
});

it("verifyPaidOnly null should be false", () => {
  expect(verifyPaidOnly(null)).toBe(false);
});
