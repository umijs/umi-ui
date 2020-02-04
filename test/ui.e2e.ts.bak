import puppeteer from 'puppeteer';
import UmiUI from '../packages/ui/src/UmiUI';

describe('Umi UI e2e', () => {
  let server;
  let browser;
  let page;
  process.env.UMI_TEST = true;
  process.env.BROWSER = 'none';
  process.env.UMI_UI_TEST = '1';

  let port = 3000;
  let url;

  beforeAll(async () => {
    const umiui = new UmiUI();
    const { server: uiServer, port: uiPort } = await umiui.start();
    server = uiServer;
    // eslint-disable-next-line prefer-destructuring
    port = uiPort;
    url = `http://localhost:${port}`;
    browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--no-zygote',
        '--no-sandbox',
      ],
    });
  });

  afterAll(async () => {
    await server?.close();
    await browser?.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  describe('project manager page', () => {
    it('project list normal', async () => {
      console.log('ui server url: ', url);
      await page.goto(`${url}/project/select`, { waitUntil: 'networkidle2' });
      await page.waitForSelector('[data-test-id="project-title"]');
      const text = await page.evaluate(
        () => document.querySelector('[data-test-id="project-title"]').textContent,
      );
      // not inject analyze script
      const gaScript = await page.evaluate(() => {
        const ga = document.querySelector('script[src*=analytics]');
        return ga && ga.src;
      });

      expect(text).toEqual('Project List');
      expect(gaScript).toBeNull();
    }, 10000);
  });

  it('project import', async () => {
    await page.goto(`${url}/project/select`);

    await page.setViewport({ width: 1680, height: 866 });

    await page.waitForSelector('[data-test-id="project-action-import"]');
    await page.click('[data-test-id="project-action-import"]');

    const formTagName = await page.evaluate(
      () => document.querySelector('#form_create_project').tagName,
    );
    expect(formTagName).toEqual('FORM');
  });
});
