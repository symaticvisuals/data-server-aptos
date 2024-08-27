// Define types for the league and fixture data

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

interface Fixture {
  id: number;
  timezone: string;
  date: string;
  timestamp: number;
}

interface BetValue {
  value: "Home" | "Draw" | "Away";
  odd: string;
}

interface Bet {
  id: number;
  name: string;
  values: BetValue[];
}

interface Bookmaker {
  id: number;
  name: string;
  bets: Bet[];
}

interface Match {
  league: League;
  fixture: Fixture;
  update: string;
  bookmakers: Bookmaker[];
  id: string;
}

// Define the type for the array of matches
type Matches = Match[];

export { League, Fixture, BetValue, Bet, Bookmaker, Match, Matches };
