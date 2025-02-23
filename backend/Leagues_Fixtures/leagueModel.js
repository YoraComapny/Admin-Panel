import mongoose from "mongoose";

const leagueSchema = mongoose.Schema(
  {
    league_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const League = mongoose.model("Leagues", leagueSchema);

export default League;
