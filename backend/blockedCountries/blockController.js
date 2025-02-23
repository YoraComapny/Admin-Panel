import Country from "./blockModel.js";

// Function to validate and filter unique countries
const validateCountries = (countries) => {
  const uniqueCountries = new Set(countries);
  if (uniqueCountries.size !== countries.length) {
    throw new Error("Duplicate countries found in request array.");
  }
  return Array.from(uniqueCountries); // Convert Set back to array
};

const createAndUpdateCountryArray = async (req, res) => {
  try {
    const { countries } = req.body;
    if (!countries || !countries.length) {
      return res.status(400).json({ message: "Empty country array provided." });
    }
    

    const validatedCountries = validateCountries(countries);

    const existingCountry = await Country.findOne();

    if (existingCountry) {
      existingCountry.countryArray = validatedCountries;
      await existingCountry.save();
      return res
        .status(200)
        .json({ message: "Country array updated successfully." });
    }

    const newCountry = new Country({ countryArray: validatedCountries });
    await newCountry.save();
    return res
      .status(201)
      .json({ message: "Country array created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};





const deleteCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const countryName = country;
    // some basic validation
    if (!countryName) {
      return res.status(400).json({ message: "Country name not provided." });
    }
    // fetching array from db
    const existingCountry = await Country.findOne();
    // more validation
    if (!existingCountry) {
      return res.status(404).json({ message: "Country array not found." });
    }

    // getting index of requested array
    const countryIndex = existingCountry.countryArray.indexOf(countryName);
    if (countryIndex === -1) {
      return res.status(404).json({ message: "Country not found in array." });
    }
    // remove country from array
    existingCountry.countryArray.splice(countryIndex, 1);
    // save the new array
    await existingCountry.save();
    return res.status(200).json({ message: "Country deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getCountryArray = async (req, res) => {
  try {
    const country = await Country.findOne();

    if (!country) {
      return res.status(404).json({ message: "Country array not found." });
    }

    return res.status(200).json({ countryArray: country.countryArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { getCountryArray, deleteCountry, createAndUpdateCountryArray };
