import axios from "axios";
import FixtureData from "../models/Fixtures";

const getOddsByLeagueId = async (leagueId: number, season: number) => {
  const options = {
    method: "GET",
    hostname: "api-football-v1.p.rapidapi.com",
    port: null,
    path: `/v3/odds?league=${leagueId}&season=${season}&bet=1`,
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
      message: "Odds not found",
      data: null,
    };
  }

  return {
    message: "Odds found",
    data: response.data.response,
  };
};

const getReelsFixtures = async (page: number = 1, limit: number = 10) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated fixtures with only the necessary fields and ensure bets array has length > 0
    const response = await FixtureData.find(
      {
        "fixture.status.short": "NS", // Query to find non-started fixtures
        "odds.bets.0": { $exists: true }, // Ensure the bets array is not empty
        // date greater than today
      },
      {
        "fixture.id": 1,
        "fixture.date": 1,
        "fixture.timezone": 1,
        "league.name": 1,
        "league.country": 1,
        "league.logo": 1,
        "teams.home.name": 1,
        "teams.home.logo": 1,
        "teams.away.name": 1,
        "teams.away.logo": 1,
        "odds.bets": 1,
      } // Projection: Only include the fields needed for the client
    );

    if (!response || response.length === 0) {
      return { data: null, message: "Fixtures not found" };
    }

    return { data: response, message: "Fixtures found" };
  } catch (error) {
    console.error("Error fetching reels fixtures:", error);
    return { data: null, message: "An error occurred while fetching fixtures" };
  }
};

export { getOddsByLeagueId, getReelsFixtures };
