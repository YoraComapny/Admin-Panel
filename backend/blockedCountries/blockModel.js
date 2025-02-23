import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  countryArray: {
    type: [String],
    required: true,
    unique: true,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
