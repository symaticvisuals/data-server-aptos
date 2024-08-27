import { Response } from "express";
import { getData } from "../helpers/data-fetch";
import { asyncMiddleware } from "../helpers/utils";
import { createFixtureData, updateBookmakers } from "../helpers/create-records";

const createRecords = asyncMiddleware(async (_req: any, res: Response) => {
  const response = await getData();
  const create = await createFixtureData(response.fixtures);

  res.status(200).json({
    message: "Records created",
    existingIds: create,
  });
});

const updateRecords = asyncMiddleware(async (_req: any, res: Response) => {
  const response = await getData();
  const create = await updateBookmakers(response.oddsForWinners);

  res.status(200).json({
    message: "Records updated",
    existingIds: create,
  });
});

export { createRecords, updateRecords };
