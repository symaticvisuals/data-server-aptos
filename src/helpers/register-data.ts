import { ILeagueData } from "../models/League";
import League from "../models/League";

const registerLeague = async (league: {
  id: number;
  name: string;
  country: string;
  logo: string | null;
  flag: string | null;
  season: number;
}) => {
  try {
    // Check if the league already exists
    const existingLeague = await League.findOne({
      id: league.id,
      season: league.season,
    });

    if (existingLeague) {
      return {
        message: "League already exists",
        league: existingLeague,
      };
    }

    // Create and save the new league
    const newLeague = new League(league);
    const savedLeague = await newLeague.save();

    return {
      message: "League created successfully",
      league: savedLeague,
    };
  } catch (error: any) {
    // Handle any errors that may occur
    return {
      message: "An error occurred while creating the league",
      error: error.message,
    };
  }
};

export default registerLeague;
