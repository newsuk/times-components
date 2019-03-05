import { isPaidOnly } from "../../src/video.web";

it("isPaidOnly true should be true", () => {
  expect(isPaidOnly(true)).toBe(true);
});

it("isPaidOnly 'true' should be true", () => {
  expect(isPaidOnly("true")).toBe(true);
});

it("isPaidOnly positive int should be true", () => {
  expect(isPaidOnly(1)).toBe(true);
});

it("isPaidOnly false should be false", () => {
  expect(isPaidOnly(false)).toBe(false);
});

it("isPaidOnly 'false' should be false", () => {
  expect(isPaidOnly("false")).toBe(false);
});

it("isPaidOnly zero should be true", () => {
  expect(isPaidOnly(0)).toBe(false);
});

it("isPaidOnly undefined should be false", () => {
  expect(isPaidOnly(undefined)).toBe(false);
});

it("isPaidOnly null should be false", () => {
  expect(isPaidOnly(null)).toBe(false);
});
