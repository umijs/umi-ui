import { join } from 'path';
import { readFileSync } from 'fs';

import { Request, Response } from 'express';
import { utils } from 'umi';

import { IContext } from '../UmiUI';
import getScripts, { normalizeHtml } from '../utils/scripts';

const { got, winPath } = utils;

export default (ctx: Partial<IContext>) => async (req: Request, res: Response) => {
  const scripts = await getScripts();
  // Index Page
  let content = null;
  if (ctx.env === 'development') {
    try {
      const umiDevHost = 'http://localhost:8002';
      const { body } = await got(`${umiDevHost}${req.path}`);
      // replace @@/devScripts.js
      const html = body.replace('/@@/devScripts.js', `${umiDevHost}/@@/devScripts.js`);
      res.set('Content-Type', 'text/html');
      res.send(normalizeHtml(html, scripts));
    } catch (e) {
      console.error(e);
    }
  } else {
    if (!content) {
      content = readFileSync(join(winPath(__dirname), '../../web/dist/index.html'), 'utf-8');
    }
    res.send(normalizeHtml(content, scripts));
  }
};
