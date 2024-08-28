import { Response } from "express";
import { getData } from "../helpers/data-fetch";
import { asyncMiddleware } from "../helpers/utils";
import { createFixtureData, updateBookmakers } from "../helpers/create-records";
import { getFixturesByLeagueId } from "../helpers/fixture";
import { getOddsByLeagueId } from "../helpers/odds";

const createRecords = asyncMiddleware(async (_req: any, res: Response) => {
  const { leagueId, season } = _req.body;
  const response = await getFixturesByLeagueId(leagueId, season);
  if (response.data === null) {
    return res.status(404).json({ message: "No fixtures found" });
  }
  const create = await createFixtureData(response.data);

  res.status(200).json({
    message: "Records created",
    existingIds: create,
  });
});

const value = 100_100_100;
const updateRecords = asyncMiddleware(async (_req: any, res: Response) => {
  const { leagueId, season } = _req.body;
  const response = await getOddsByLeagueId(leagueId, season);
  const create = await updateBookmakers(response.data);

  res.status(200).json({
    message: "Records updated",
    existingIds: create,
  });
});

export { createRecords, updateRecords };
