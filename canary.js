const puppeteer = require("puppeteer");

const isCanary = typeof process.env.AWS_EXECUTION_ENV !== "undefined";

async function canarySpec() {
  const browser = await puppeteer.launch({ headless: isCanary });

  const page = await browser.newPage();

  await page.goto("https://lego.com");
  await page.screenshot({ path: "/tmp/homepage.png" });

  if (isCanary) await page.waitForTimeout(2000);

  if (!isCanary) await browser.close();
}

exports.handler = async () => {
  return await canarySpec();
};
