import mongoose, { Document, Schema } from "mongoose";

export interface ILeagueData extends Document {
  id: number;
  name: string;
  country: string;
  code: string | null;
  logo: string | null;
  flag: string | null;
  season: number;
}

const LeagueSchema = new Schema<ILeagueData>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  code: { type: String },
  logo: { type: String },
  flag: { type: String },
  season: { type: Number, required: true },
});

const League = mongoose.model<ILeagueData>("League", LeagueSchema);
export default League;
