import { NextFunction, Response } from "express";

const asyncMiddleware =
  (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
  (req: any, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { asyncMiddleware };
