import { Response } from "express";
import { fetchOddsForWinners } from "../helpers/data-fetch";
import { asyncMiddleware } from "../helpers/utils";
import { fetchOddsByFixtureId } from "../helpers/fiture";

const getWinnerOdds = asyncMiddleware(async (_req: any, res: Response) => {
  try {
    const odds = await fetchOddsForWinners();
    res.status(200).json(odds);
  } catch (error) {
    res.status(500).send(error);
  }
});

const getOddsByFixtureId = asyncMiddleware(async (req: any, res: Response) => {
  try {
    const { fixtureId } = req.params;
    console.log(fixtureId);

    if (!fixtureId) {
      return res.status(400).send("Fixture ID is required");
    }

    const odds = await fetchOddsByFixtureId(fixtureId);
    res.status(200).json(odds);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { getWinnerOdds, getOddsByFixtureId };
