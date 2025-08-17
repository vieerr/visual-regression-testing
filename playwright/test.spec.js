import { test, expect } from "@playwright/test";

test.describe("Theme button tests with one trace", () => {
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true });
    page = await context.newPage();
  });

  test("Test theme buttons", async () => {
    await page.goto("https://dearmom.vercel.app");
    await page.click("button.btn.bg-pink-600");

    const card = page.locator("div#letter > div");
    const classList = await card.evaluate((el) => el.className);
    expect(classList).toContain("bg-pink-100");
  });

  test("Theme buttons should have the correct background classes", async () => {
    await page.goto("http://localhost:5173");

    const buttons = [
      { id: "#theme-button-love", expectedClass: "bg-pink-600" },
      { id: "#theme-buttons button:nth-of-type(2)", expectedClass: "bg-green-400" },
      { id: "#theme-buttons button:nth-of-type(3)", expectedClass: "bg-blue-600" },
      { id: "#theme-buttons button:nth-of-type(4)", expectedClass: "bg-gray-600" },
      { id: "#theme-buttons button:nth-of-type(5)", expectedClass: "bg-yellow-600" },
      { id: "#theme-buttons button:nth-of-type(6)", expectedClass: "bg-purple-600" },
    ];

    for (const { id, expectedClass } of buttons) {
      const button = page.locator(id);
      await expect(button).toHaveClass(new RegExp(expectedClass));
    }
  });

  test.afterAll(async () => {
    await context.tracing.stop({ path: "trace.zip" });
    await context.close();
  });
});
