import axios from "axios";
import { Matches } from "../types/odds";
import { Fixture, Fixtures } from "../types/fixtures";

const fetchOddsForWinners = async () => {
  const response = await axios.get(
    (process.env.DATABASE_URL_LOCAL as string) + "/oddsForWinners"
  );

  const data: Matches = response.data;

  const bets = data.map((match) => {
    const { bookmakers, fixture, league } = match;
    const matchOdds = bookmakers.map((bookmaker) => {
      const { bets } = bookmaker;
      const winnerOdds = bets.find((bet) => bet.name === "Match Winner");

      return {
        odds: winnerOdds?.values,
      };
    });
    return {
      ...matchOdds[0],
      matchId: match.id,
      league: league.name,
      fixture: fixture.date,
      leagueId: league.id,
      fixtureId: fixture.id,
    };
  });

  return bets;
};

const fetchFixtures = async () => {
  const response = await axios.get(
    (process.env.DATABASE_URL_LOCAL as string) + "/fixtures"
  );

  const data: Fixtures = response.data;

  const fixtures = data.map((match) => {
    const { fixture, league } = match;
    return {
      fixture: fixture.date,
      league: league.name,
      leagueId: league.id,
      fixtureId: fixture.id,
    };
  });

  return fixtures;
};

const getData = async () => {
  const reponseFixtures = await axios.get(
    (process.env.DATABASE_URL_LOCAL as string) + "/fixtures"
  );
  const odds = await axios.get(
    (process.env.DATABASE_URL_LOCAL as string) + "/oddsForWinners"
  );

  const fixtures: Fixtures = reponseFixtures.data;
  const data: Matches = odds.data;

  return {
    oddsForWinners: data,
    fixtures: fixtures,
  };
};

export { fetchOddsForWinners, fetchFixtures, getData };
