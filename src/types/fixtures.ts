// Type for querying fixtures
interface FixtureQueryParams {
  id?: number; // The id of the fixture
  ids?: string; // One or more fixture ids in the format "id-id-id"
  live?: "all" | string; // Enum: "all" or specific fixture ids
  date?: string; // A valid date in YYYY-MM-DD format
  league?: number; // The id of the league
  season?: number; // The season of the league in YYYY format
  team?: number; // The id of the team
  last?: number; // For the X last fixtures (maximum 2 digits)
  next?: number; // For the X next fixtures (maximum 2 digits)
  from?: string; // A valid start date in YYYY-MM-DD format
  to?: string; // A valid end date in YYYY-MM-DD format
  round?: string; // The round of the fixture
  status?: "NS" | "NS-PST-FT"; // One or more fixture status short
  venue?: number; // The venue id of the fixture
  timezone?: string; // A valid timezone
}

// Type for a single fixture
interface Fixture {
  fixture: {
    id: number;
    referee: string;
    timezone: string;
    date: string; // ISO 8601 format date-time string
    timestamp: number; // Unix timestamp
    periods: {
      first: number; // Unix timestamp for the first period
      second: number; // Unix timestamp for the second period
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string; // E.g., "Match Finished"
      short: "NS" | "PST" | "FT"; // Enum for fixture status short
      elapsed: number; // Minutes elapsed in the match
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string; // URL to the league logo
    flag: string; // URL to the country flag
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string; // URL to the team's logo
      winner: boolean | null; // true if home team won, false if away team won, null if draw
    };
    away: {
      id: number;
      name: string;
      logo: string; // URL to the team's logo
      winner: boolean | null; // true if away team won, false if home team won, null if draw
    };
  };
  goals: {
    home: number; // Number of goals scored by the home team
    away: number; // Number of goals scored by the away team
  };
  score: {
    halftime: {
      home: number; // Home team goals at halftime
      away: number; // Away team goals at halftime
    };
    fulltime: {
      home: number; // Home team goals at fulltime
      away: number; // Away team goals at fulltime
    };
    extratime: {
      home: number | null; // Home team goals in extra time, if applicable
      away: number | null; // Away team goals in extra time, if applicable
    };
    penalty: {
      home: number | null; // Home team penalty goals, if applicable
      away: number | null; // Away team penalty goals, if applicable
    };
  };
}

type Fixtures = Fixture[];

export { FixtureQueryParams, Fixture, Fixtures };
