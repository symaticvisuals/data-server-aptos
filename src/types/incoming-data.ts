type LeagueData = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
};

type FixtureData = {
  id: number;
  date: string; // DateTime in Prisma, so ISO string in TypeScript
  timezone: string;
  status: string;
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  goalsHome?: number | null; // Optional, as in Prisma schema
  goalsAway?: number | null; // Optional, as in Prisma schema
  halftimeHome?: number | null; // Optional, as in Prisma schema
  halftimeAway?: number | null; // Optional, as in Prisma schema
  bookmakerId?: number | null; // Optional, as in Prisma schema
  teamId?: number | null; // Optional, as in Prisma schema
};

type BetOddData = {
  id: number;
  value: string;
  odd: number; // Represented as Float in Prisma, so number in TypeScript
  betId: number;
};

type BetData = {
  id: number;
  name: string;
  fixtureId: number;
  bookmakerId: number;
  odds: BetOddData[];
};

type BookmakerData = {
  id: number;
  name: string;
  betId: number; // This is the foreign key reference to the Bet model
};

type OddsForWinner = {
  league: LeagueData;
  fixture: FixtureData;
  bookmakers: BookmakerData[];
};

type FixtureTeamData = {
  id: number;
  name: string;
  logo: string;
};

type FixtureGoalsData = {
  home?: number | null;
  away?: number | null;
};

type FixtureScoreData = {
  halftime: FixtureGoalsData;
  fulltime: FixtureGoalsData;
};

type FixtureDetailsData = {
  fixture: FixtureData;
  league: LeagueData;
  teams: {
    home: FixtureTeamData;
    away: FixtureTeamData;
  };
  goals: FixtureGoalsData;
  score: FixtureScoreData;
};

type IncomingData = {
  oddsForWinners: OddsForWinner[];
  fixtures: FixtureDetailsData[];
};

export {
  LeagueData,
  FixtureData,
  BetOddData,
  BetData,
  BookmakerData,
  OddsForWinner,
  FixtureTeamData,
  FixtureGoalsData,
  FixtureScoreData,
  FixtureDetailsData,
  IncomingData,
};
