import { Request, Response } from 'express';
import url from 'url';

import { IContext } from '../UmiUI';

export default (ctx: Partial<IContext>) => async (req: Request, res: Response) => {
  // 完整版
  if (ctx.full) {
    return res.status(302).redirect(
      url.format({
        pathname: '/project/select',
        query: req.query,
      }),
    );
  }
  // mini 版
  const isMini = 'mini' in req.query;
  const { data } = ctx.config;
  if (isMini || data.currentProject) {
    return res.status(302).redirect(
      url.format({
        pathname: isMini ? '/blocks' : '/dashboard',
        query: req.query,
      }),
    );
  }
  return res.status(302).redirect(
    url.format({
      pathname: '/project/select',
      query: req.query,
    }),
  );
};
