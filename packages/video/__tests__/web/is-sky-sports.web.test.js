import { isSkySports } from "../../src/inline-video-player";

it("isSkySports true should be true", () => {
  expect(isSkySports(true)).toBe(true);
});

it("isSkySports 'true' should be true", () => {
  expect(isSkySports("true")).toBe(true);
});

it("isSkySports positive int should be true", () => {
  expect(isSkySports(1)).toBe(true);
});

it("isSkySports false should be false", () => {
  expect(isSkySports(false)).toBe(false);
});

it("isSkySports 'false' should be false", () => {
  expect(isSkySports("false")).toBe(false);
});

it("isSkySports zero should be true", () => {
  expect(isSkySports(0)).toBe(false);
});

it("isSkySports undefined should be false", () => {
  expect(isSkySports(undefined)).toBe(false);
});

it("isSkySports null should be false", () => {
  expect(isSkySports(null)).toBe(false);
});
