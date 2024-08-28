import axios from "axios";
import FixtureData from "../models/Fixtures";

const getLeague = async (leagueId: number, season: number) => {
  if (!process.env.RAPID_API_KEY) {
    throw new Error("API Key not found");
  }

  if (!leagueId || !season) {
    throw new Error("League ID or season not found");
  }

  const options = {
    method: "GET",
    hostname: "api-football-v1.p.rapidapi.com",
    port: null,
    path: `/v3/leagues?id=${leagueId}&season=${season}`,
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY!,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const response = await axios({
    ...options,
    url: `https://${options.hostname}${options.path}`,
  });

  if (!response.data.response || response.data.response.length === 0) {
    return {
      message: "League not found",
      data: null,
    };
  }

  return {
    message: "League found",
    data: response.data.response[0],
  };
};

const getFixturesForUpcomingMatches = async () => {
  const fixtures = await FixtureData.findOne({ "fixture.status.short": "NS" });
  if (!fixtures) {
    return { data: null, message: "Fixtures not found" };
  }

  return { data: fixtures, message: "Fixtures found" };
};

export { getLeague, getFixturesForUpcomingMatches };
