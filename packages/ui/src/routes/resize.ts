import { Request, Response } from 'express';
import { resizeTerminal } from '../terminal';

import { IContext } from '../UmiUI';

export default (ctx: Partial<IContext>) => async (req: Request, res: Response) => {
  const rows = parseInt(req.query.rows || 30);
  const cols = parseInt(req.query.cols || 180);
  try {
    resizeTerminal({ rows, cols });
    res.send({
      success: true,
      rows,
      cols,
    });
  } catch (_) {
    res.send({
      success: false,
      rows,
      cols,
    });
  }
};
