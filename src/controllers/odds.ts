import { Request, Response } from "express";
import { fetchOddsForWinners } from "../helpers/data-fetch";
import { asyncMiddleware } from "../helpers/utils";
import {
  fetchOddsByFixtureId,
  getRecentBetsByFixtureId,
} from "../helpers/fixture";
import { getReelsFixtures } from "../helpers/odds";

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

const getReels = asyncMiddleware(async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters, with defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Fetch the paginated reels fixtures
    const odds = await getReelsFixtures(page, limit);

    if (!odds.data) {
      return res.status(404).json({ message: "No fixtures found" });
    }

    // Send the odds data as a successful response
    res.status(200).json(odds);
  } catch (error) {
    console.error("Error fetching reels:", error);
    res.status(500).json({ error: "An error occurred while fetching reels" });
  }
});

const getBetsRecent = asyncMiddleware(async (req: Request, res: Response) => {
  try {
    const { fixtureIds } = req.body;
    const getFixtures = await getRecentBetsByFixtureId(fixtureIds);
    res.status(200).json(getFixtures);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching fixtures" });
  }
});

export { getWinnerOdds, getOddsByFixtureId, getReels, getBetsRecent };
