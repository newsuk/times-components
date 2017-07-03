import { client, setup, teardown } from "../../.fructose/setup";

beforeAll(async () => {
  await setup();
}, 60000);

afterAll(async () => {
  await teardown();
});

test("Author renders correctly on device", async () => {
  await client.loadComponent("Author", {});
  await expect(element(by.text("Author Bios!"))).toBeVisible();
});
