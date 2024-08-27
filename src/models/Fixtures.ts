import mongoose, { Document, Schema } from "mongoose";

interface IOddValue {
  value: string;
  odd: string;
}

interface IBet {
  id: number;
  name: string;
  values: IOddValue[];
}

interface IBookmaker {
  id: number;
  name: string;
  bets: IBet[];
}

interface IOdds {
  update: string;
  bookmakers: IBookmaker[];
}

export interface IFixtureData extends Document {
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
  odds: IOdds | null; // Updated field to include both update and bookmakers
}

const FixtureSchema: Schema = new Schema({
  fixture: {
    id: { type: Number, required: true, unique: true },
    referee: { type: String, default: null },
    timezone: { type: String, required: true },
    date: { type: String, required: true },
    timestamp: { type: Number, required: true },
    periods: {
      first: { type: Number, default: null },
      second: { type: Number, default: null },
    },
    venue: {
      id: { type: Number, default: null },
      name: { type: String, default: null },
      city: { type: String, default: null },
    },
    status: {
      long: { type: String, default: null },
      short: { type: String, default: null },
      elapsed: { type: Number, default: null },
    },
  },
  league: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    logo: { type: String, default: null },
    flag: { type: String, default: null },
    season: { type: Number, required: true },
    round: { type: String, required: true },
  },
  teams: {
    home: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      logo: { type: String, default: null },
      winner: { type: Boolean, default: null },
    },
    away: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      logo: { type: String, default: null },
      winner: { type: Boolean, default: null },
    },
  },
  goals: {
    home: { type: Number, default: null },
    away: { type: Number, default: null },
  },
  score: {
    halftime: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
    fulltime: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
    extratime: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
    penalty: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
  },
  odds: {
    update: { type: String, default: null },
    bookmakers: {
      type: [
        {
          id: { type: Number, required: true },
          name: { type: String, required: true },
          bets: [
            {
              id: { type: Number, required: true },
              name: { type: String, required: true },
              values: [
                {
                  value: { type: String, required: true },
                  odd: { type: String, required: true },
                },
              ],
            },
          ],
        },
      ],
      default: [],
    },
  },
});

const FixtureData = mongoose.model<IFixtureData>("FixtureData", FixtureSchema);
export default FixtureData;
