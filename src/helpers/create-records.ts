import mongoose from "mongoose";
import FixtureData from "../models/Fixtures";

interface IBookmaker {
  id: number;
  name: string;
  bets: {
    id: number;
    name: string;
    values: {
      value: string;
      odd: string;
    }[];
  }[];
}

interface IOddsForWinners {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
  };
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
  };
  update: string;
  bookmakers: IBookmaker[];
}

interface IFixtureInput {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number | null;
      second: number | null;
    };
    venue: {
      id: number | null;
      name: string | null;
      city: string | null;
    };
    status: {
      long: string | null;
      short: string | null;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string | null;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string | null;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

export const createFixtureData = async (data: IFixtureInput[]) => {
  try {
    let existingFixturIds = [];
    // Loop through each fixture in the provided data
    for (const item of data) {
      // Check if the fixture with the same ID already exists
      const existingFixture = await FixtureData.findOne({
        "fixture.id": item.fixture.id,
      });

      if (existingFixture) {
        existingFixturIds.push(existingFixture.fixture.id);
        console.log(
          `Fixture with ID ${item.fixture.id} already exists. Skipping insertion.`
        );
        continue; // Skip to the next item if the fixture already exists
      }

      // Create a new document based on the FixtureData schema
      const fixtureData = new FixtureData({
        fixture: {
          id: item.fixture.id,
          referee: item.fixture.referee || null,
          timezone: item.fixture.timezone,
          date: item.fixture.date,
          timestamp: item.fixture.timestamp,
          periods: {
            first: item.fixture.periods.first || null,
            second: item.fixture.periods.second || null,
          },
          venue: {
            id: item.fixture.venue.id || null,
            name: item.fixture.venue.name || null,
            city: item.fixture.venue.city || null,
          },
          status: {
            long: item.fixture.status.long || null,
            short: item.fixture.status.short || null,
            elapsed: item.fixture.status.elapsed || null,
          },
        },
        league: {
          id: item.league.id,
          name: item.league.name,
          country: item.league.country,
          logo: item.league.logo || null,
          flag: item.league.flag || null,
          season: item.league.season,
          round: item.league.round,
        },
        teams: {
          home: {
            id: item.teams.home.id,
            name: item.teams.home.name,
            logo: item.teams.home.logo || null,
            winner: item.teams.home.winner || null,
          },
          away: {
            id: item.teams.away.id,
            name: item.teams.away.name,
            logo: item.teams.away.logo || null,
            winner: item.teams.away.winner || null,
          },
        },
        goals: {
          home: item.goals.home || null,
          away: item.goals.away || null,
        },
        score: {
          halftime: {
            home: item.score.halftime.home || null,
            away: item.score.halftime.away || null,
          },
          fulltime: {
            home: item.score.fulltime.home || null,
            away: item.score.fulltime.away || null,
          },
          extratime: {
            home: item.score.extratime.home || null,
            away: item.score.extratime.away || null,
          },
          penalty: {
            home: item.score.penalty.home || null,
            away: item.score.penalty.away || null,
          },
        },
        odds: null, // Since odds are null by default
      });

      // Save the document to the database
      await fixtureData.save();
    }

    console.log("Fixtures data successfully inserted into MongoDB");
    return existingFixturIds;
  } catch (error) {
    console.error("Error inserting fixtures data:", error);
  }
};

export const updateBookmakers = async (
  data: IOddsForWinners[]
): Promise<void> => {
  try {
    // Loop through each oddsForWinners item in the provided data
    for (const item of data) {
      const { league, fixture, bookmakers } = item;

      // Find the existing fixture data in the database
      const existingFixture = await FixtureData.findOne({
        "fixture.id": fixture.id,
        "league.id": league.id,
      });

      if (!existingFixture) {
        console.log(
          `No fixture found with ID ${fixture.id} and League ID ${league.id}. Skipping.`
        );
        continue; // Skip to the next item if the fixture is not found
      }

      // Aggregate the bookmakers' odds to calculate the average odds
      const aggregatedOdds = await aggregateBookmakers(bookmakers);

      // Update the odds information with the aggregated odds
      existingFixture.odds = {
        update: item.update,
        bets: aggregatedOdds, // Store the aggregated odds
      };

      // Save the updated document to the database
      await existingFixture.save();

      console.log(
        `Updated bookmakers for Fixture ID ${fixture.id} and League ID ${league.id}`
      );
    }

    console.log("Bookmakers update completed successfully.");
  } catch (error) {
    console.error("Error updating bookmakers:", error);
  }
};

const aggregateBookmakers = async (bookmakers: IBookmaker[]) => {
  const aggregatedBets: any = [];

  // Loop through each bookmaker and aggregate bets
  bookmakers.forEach((bookmaker) => {
    bookmaker.bets.forEach((bet) => {
      // Find the existing bet in the aggregatedBets array
      let existingBet = aggregatedBets.find(
        (aggBet: any) => aggBet.id === bet.id
      );

      if (!existingBet) {
        // If the bet doesn't exist yet, create it
        existingBet = {
          id: bet.id,
          name: bet.name,
          values: [],
        };
        aggregatedBets.push(existingBet);
      }

      // Aggregate odds for Home, Away, and Draw
      bet.values.forEach((betValue) => {
        let existingValue = existingBet!.values.find(
          (value: any) => value.value === betValue.value
        );

        if (!existingValue) {
          // If the value doesn't exist, create it
          existingValue = {
            value: betValue.value,
            odd: 0,
            count: 0, // Track the count of odds to calculate the average
          };
          existingBet!.values.push(existingValue);
        }

        // Accumulate the odds and increment the count
        existingValue.odd += +betValue.odd;
        existingValue.count += 1;
      });
    });
  });

  // Calculate the average odds for each value type
  aggregatedBets.forEach((bet: any) => {
    bet.values = bet.values.map((value: any) => ({
      value: value.value,
      odd: +(value.odd / value.count).toFixed(2), // Calculate average and format to 2 decimal places
      _id: value._id,
    }));
  });

  return aggregatedBets;
};
