const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  long: { type: String, default: null },
  short: { type: String, default: null },
  elapsed: { type: Number, default: null },
});

const PeriodsSchema = new mongoose.Schema({
  first: { type: Number, default: null },
  second: { type: Number, default: null },
});

const VenueSchema = new mongoose.Schema({
  id: { type: Number, default: null },
  name: { type: String, default: null },
  city: { type: String, default: null },
});

const TeamSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, default: null },
  winner: { type: Boolean, default: null },
});

const GoalsSchema = new mongoose.Schema({
  home: { type: Number, default: null },
  away: { type: Number, default: null },
});

const ScoreSchema = new mongoose.Schema({
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
});

const OddsSchema = new mongoose.Schema({
  bookmaker: { type: String, default: null },
  bet: { type: String, default: null },
  values: [
    {
      value: { type: String, default: null },
      odd: { type: String, default: null },
    },
  ],
});

const FixtureSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  referee: { type: String, default: null },
  timezone: { type: String, required: true },
  date: { type: Date, required: true },
  timestamp: { type: Number, required: true },
  periods: { type: PeriodsSchema, default: null },
  venue: { type: VenueSchema, default: null },
  status: { type: StatusSchema, default: null },
});

const LeagueSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  logo: { type: String, default: null },
  flag: { type: String, default: null },
  season: { type: Number, required: true },
  round: { type: String, required: true },
});

const TeamsSchema = new mongoose.Schema({
  home: { type: TeamSchema, default: null },
  away: { type: TeamSchema, default: null },
});

const FixtureDataSchema = new mongoose.Schema({
  fixture: { type: FixtureSchema, default: null },
  league: { type: LeagueSchema, default: null },
  teams: { type: TeamsSchema, default: null },
  goals: { type: GoalsSchema, default: null },
  score: { type: ScoreSchema, default: null },
  odds: { type: [OddsSchema], default: null }, // Adding odds with default to null
});

const FixtureData = mongoose.model("FixtureData", FixtureDataSchema);

module.exports = FixtureData;
