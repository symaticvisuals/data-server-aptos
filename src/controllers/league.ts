import { Request, Response } from "express";
import { asyncMiddleware } from "../helpers/utils";
import { getLeague } from "../helpers/league";
import registerLeague from "../helpers/register-data";

const createLeague = asyncMiddleware(async (req: Request, res: Response) => {
  const { leagueId, season } = req.body;
  if (!leagueId || !season) {
    return res.status(400).json({ message: "League ID or season not found" });
  }

  const league = await getLeague(leagueId, season);
  if (!league || league.data === null) {
    return res.status(404).json({ message: "League not found" });
  }

  const { data } = league;

  const leagueResponse = {
    id: data.league.id,
    name: data.league.name,
    country: data.country.name,
    logo: data.league.logo,
    flag: data.country.flag,
    season: season,
  };

  const create = await registerLeague(leagueResponse);

  if (create.message === "League already exists") {
    return res.status(409).json({ message: "League already exists" });
  }

  if (create.message === "An error occurred while creating the league") {
    return res
      .status(500)
      .json({ message: "An error occurred while creating the league" });
  }

  return res.status(200).json({ data: create });
});

export { createLeague };
