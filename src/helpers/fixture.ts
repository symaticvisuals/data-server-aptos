import axios from "axios";
import FixtureData from "../models/Fixtures";

const fetchOddsByFixtureId = async (fixtureId: string) => {
  const numericFixtureId = parseInt(fixtureId, 10);
  console.log(`Querying for fixture ID: ${numericFixtureId}`);

  const fixture = await FixtureData.findOne({ "fixture.id": numericFixtureId });
  if (!fixture) {
    return { data: null, message: "Fixture not found" };
  }

  const { odds } = fixture;
  if (odds === null || !odds.bets || odds.bets.length === 0) {
    return { data: null, message: "Odds not found" };
  }

  // Assuming the odds we're interested in are in the first bookmaker's bets
  const betValues = odds.bets[0].values;

  // Transform the array into an object
  const oddsObject: { [key: string]: string } = {};
  betValues.forEach((value: any) => {
    if (value.value.toLowerCase() === "home") {
      oddsObject.home = value.odd;
    } else if (value.value.toLowerCase() === "away") {
      oddsObject.away = value.odd;
    } else if (value.value.toLowerCase() === "draw") {
      oddsObject.draw = value.odd;
    }
  });

  oddsObject.fixtureId = fixtureId;

  return { data: oddsObject, message: "Odds found" };
};

const getFixturesByLeagueId = async (leagueId: number, season: number) => {
  const options = {
    method: "GET",
    hostname: "api-football-v1.p.rapidapi.com",
    port: null,
    path: `/v3/fixtures?league=${leagueId}&season=${season}&status=NS`,
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
      message: "Fixtures not found",
      data: null,
    };
  }

  return {
    message: "Fixtures found",
    data: response.data.response,
  };
};

export { fetchOddsByFixtureId, getFixturesByLeagueId };
