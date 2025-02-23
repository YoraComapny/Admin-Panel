import axios from "axios";
import League from "./leagueModel.js";
import AppInformation from "../AppInformation/appInformationModel.js";
import dotenv from "dotenv";
dotenv.config();




// Function to get the latest API key
// const getRapidAPIKey = async () => {
//   // const apiKey = process.env.SPORTS_API_KEY;
//   const apiKey = process.env.SPORTMONKS_API_TOKEN;

//     // console.log("Step 1: API key from environment variables:", apiKey);
//   try {
//     if (!apiKey) {
//       throw new Error('API key not found in environment variables');
//     }
//     const appInformation = await AppInformation.findOne({sports_api_key:apiKey});
//     //  console.log("Step 3: appInformation fetched:", appInformation);
//     //  console.log("Step 4: Returning API key from database:", appInformation ? appInformation?.apiKey : "No data found");
//     return appInformation?.apiKey;
//   } catch (err) {
//     // console.error("Error occurred while fetching API key: ", err);
//     throw err;
//   }
// };



// // Updated function to get Rapid API request config
// const getRapidRequest = async (country) => {
//   const apiKey = await getRapidAPIKey();
//   return {
//     method: "GET",
//     url: "https://v3.football.api-sports.io/leagues",
//     params: { country: country },
//     headers: {
//       "x-apisports-key": apiKey,
//       "x-rapidapi-host": "v3.football.api-sports.io",
//     },
//   };
// };

// Updated function to get SportMonks API request config
const getRapidRequest = async (country) => {
  const apiKey = 'kKfW8AqjO0J2uNBRliLdvi1urmp0QMWybFhFfDhyi3FrxSy83U9o6UzOyZfd'; // Directly adding the API key
  return {
    method: "GET",
    // url: "https://api.sportmonks.com/v3/football/fixtures",
    url: "https://api.sportmonks.com/v3/my/leagues",
    params: { 
      api_token: apiKey,  // Adding the API key as the parameter
      country: country,   // Passing the country as a parameter for filtering
    },
    headers: {
      "authentication": apiKey,
    },
  };
};









// Updated function to get fixtures request config
  // const getFixturesRequest = async (date) => {
  //   console.log("2-Step 1: Received date from request body: ", date);
  //  const regex = /^\d{4}-\d{2}-\d{2}$/;   const isValidFormat = regex.test(date);
  //   console.log("2-Step 2: Validating date format: ", isValidFormat);


  // if (!isValidFormat) {
  //   // console.log("2-Step 3: Invalid date format. Returning false.");
  //   return false;   }

  // const dateParts = date.split("-");
  // const year = parseInt(dateParts[0]);
  // const month = parseInt(dateParts[1]) - 1;   
  // const day = parseInt(dateParts[2]);
  //   console.log("2-Step 4: Parsed date - Year:", year, "Month:", month, "Day:", day);


  // const dateObject = new Date(year, month, day);

  //  console.log("2-Step 5: Constructed date object:", dateObject);


  // if (     dateObject.getFullYear() === year &&
  //   dateObject.getMonth() === month &&     dateObject.getDate() === day
  // ) {

  //    console.log("2-Step 6: Date is valid and matches. Fetching API key.");
  //    console.log(process.env.SPORTS_API_KEY)     
  //    const apiKey = await getRapidAPIKey({ sports_api_key: process.env.SPORTS_API_KEY });
    

  //     console.log("2-Step 7: Retrieved API Key: ", apiKey);

  //   return {
  //     method: "GET",
  //     url: "https://v3.football.api-sports.io/fixtures",
  //     params: { date: date },
  //    headers: {
  //       "x-apisports-key": apiKey,
  //       "x-rapidapi-host": "v3.football.api-sports.io",
  //     },
  //   };   } else {
  //    console.log("2-Step 8: Date validation failed. Returning false.");
  //    return false;
  // }
  // };



// const getFixturesRequest2 = async (date) => {

//   console.log("2-Step 1: Received date from request body: ", date);

//  const regex = /^\d{4}-\d{2}-\d{2}$/;
//  const isValidFormat = regex.test(date);

//   console.log("2-Step 2: Validating date format: ", isValidFormat);


//  if (!isValidFormat) {
//    // console.log("2-Step 3: Invalid date format. Returning false.");
//    return false;
//  }

//  const dateParts = date.split("-");
//  const year = parseInt(dateParts[0]);
//  const month = parseInt(dateParts[1]) - 1;
//  const day = parseInt(dateParts[2]);

//   console.log("2-Step 4: Parsed date - Year:", year, "Month:", month, "Day:", day);


//  const dateObject = new Date(year, month, day);

//   console.log("2-Step 5: Constructed date object:", dateObject);


//  if (
//    dateObject.getFullYear() === year &&
//    dateObject.getMonth() === month &&
//    dateObject.getDate() === day
//  ) {

//     console.log("2-Step 6: Date is valid and matches. Fetching API key.");
     
//     const API_TOKEN = process.env.SPORTMONKS_API_TOKEN; // Token `.env` se le rahe hain
//     const API_URL_getFixturesRequest = `https://api.sportmonks.com/v3/my/leagues?api_token=${API_TOKEN}`;

//    console.log(process.env.SPORTS_API_KEY)
//    // const apiKey = await getRapidAPIKey({ sports_api_key: process.env.SPORTS_API_KEY });
   

//    //  console.log("2-Step 7: Retrieved API Key: ", apiKey);

//    return {
//      method: "GET",
//      url: "https://v3.football.api-sports.io/fixtures",
//      params: { date: date },
//      headers: {
//        "x-apisports-key": apiKey,
//        "x-rapidapi-host": "v3.football.api-sports.io",
//      },
//    };
//  } else {
//     console.log("2-Step 8: Date validation failed. Returning false.");

//    return false;
//  }
// };



// Updated getLeaguesRapid function




const getLeaguesRapid = async (req, res) => {


  try {
    const { country } = req.params;

    //  console.log('Step 1 - Extracted Country:', country);

    const rapidRequest = await getRapidRequest(country);

    //  console.log('Step 2 - Rapid Request Configuration:', rapidRequest);


    const response = await axios.request(rapidRequest);

    //  console.log('Step 3 - API Response:', response.data);

    
    const firstThreeItems = response.data?.data?.slice(0, 3);
    //  console.log('Step 4 - First Three Items:', firstThreeItems);
    res.status(200).json({
      status: true,
      data: response.data?.data,
    });
    
    //  console.log('Step 5 - Response Sent Successfully');

  } catch (error) {
    console.error('Error in getLeaguesRapid function:', error);

    res.status(500).json({
      status: false,
      error: error,
    });
    console.error(error);
  }
};

// Updated getFixturesRapid function
// const getFixturesRapid = async (req, res) => {
//   try {
    
//     const { date } = req.body;

//      console.log("Step 1: Date received from request body:", date);

//     if (!date) {
//       return res.status(400).json({
//         status: false,
//         message: "Please enter the required field data for the request...",
//       });
//     }

//     const rapidRequest = await getFixturesRequest(date);

//      console.log("Step 3: Fixtures request based on date:", rapidRequest);


//     if (!rapidRequest) {

//        console.log("Step 4: Invalid date format received, no rapidRequest.");

//       return res.status(500).json({
//         status: false,
//         message: "Invalid date format",
//       });
//     }

//     const response = await axios.request(rapidRequest);

//       console.log("Step 5: API response from Rapid API:", response.data);

//     const firstTwentyItems = response.data.response.slice(0, 20);

//      console.log("Step 6: First 20 items from the API response:", firstTwentyItems);


//     res.status(200).json({
//       status: true,
//       fixtures: firstTwentyItems,
//     });

//       console.log("Step 7: Response sent with fixtures data.");

//   } catch (error) {

//       console.error("Step 8: Error occurred:", error);

//     res.status(500).json({
//       status: false,
//       error: error,
//     });
//     console.error(error);
//   }
// };








const getFixturesRapid = async (req, res) => {
  const { date } = req.body;  // Get the date from the request body

  // // Validate date format (YYYY-MM-DD)
  // const regex = /^\d{4}-\d{2}-\d{2}$/;
  // const isValidFormat = regex.test(date);
  // console.log("Step 2: Validating date format: ", isValidFormat);

  // if (!isValidFormat) {
  //     console.log("Step 3: Invalid date format. Returning false.");
  //     return res.status(400).json({ error: "Invalid date format. Expected YYYY-MM-DD." });
  // }

  // // Parse date
  // const dateParts = date.split("-");
  // const year = parseInt(dateParts[0]);
  // const month = parseInt(dateParts[1]) - 1; // Adjust month (January is 0)
  // const day = parseInt(dateParts[2]);
  // console.log("Step 4: Parsed date - Year:", year, "Month:", month, "Day:", day);

  // const dateObject = new Date(year, month, day);
  // console.log("Step 5: Constructed date object:", dateObject);

  // if (dateObject.getFullYear() === year && dateObject.getMonth() === month && dateObject.getDate() === day) {

      // Get SportMonks API token from environment variable
      const apiToken = process.env.SPORTMONKS_API_TOKEN;  // Make sure your .env has this key
      if (!apiToken) {
          return res.status(500).json({ error: "API token is missing." });
      }
      // console.log("Step 7: Retrieved API Token: ", apiToken);

      // Construct the URL dynamically with the date and API token
      const url = `http://api.sportmonks.com/v3/football/leagues/date/${date}?api_token=${apiToken}`;
      // console.log("Step 8: Constructed URL: ", url);  // Log the full URL to check if it's correct

      try {
          // Make the API call using axios
          const ress = await axios.get(url);

          // console.log(ress?.data?.data)



            // Extract relevant data into a new object
      const extractedData = ress?.data?.data.map(item => {
        return {
          name: item.name,
          active: item.active,
          short_code: item.short_code,
          image_path: item.image_path
        };
      });

      // console.log("Step 9: Extracted Data: ", extractedData);  // Log the extracted data to verify

      // Send the extracted response data back to the frontend
      return res.status(200).json({
        status: true,
        data: extractedData
      });  // Only return the relevant data

      } catch (error) {
          // console.error("Error fetching data from SportMonks API:", error);
          return res.status(500).json({ error: "Failed to fetch data from SportMonks API." });
      }

};


// Ftech saved leagues from db
// const getLeagues = async (req, res) => {
//   try {
//     const leagues = await League.find();
//     if (leagues) {
//       res.status(200).json({
//         found: true,
//         data: leagues,
//       });
//     } else {
//       res.status(400).json({
//         found: false,
//         error: "Leagues not found",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//     });
//   }
// };


// const getLeagues = async (req, res) => {
//   try {
//     const API_URL = "https://api.sportmonks.com/v3/my/leagues?api_token=2pAjjIxIHW00q4fImZWe4okOnm99kvmhLxla4Jz0NOiIEkC3AZky1jfNTRXB";


//     const response = await axios.get(API_URL);

//     console.log("✅ Leagues Data:", response.data); // Debugging log

//     const leagues = response.data.data.map((league) => ({
//       id: league.id,
//       name: league.name,
//       image_path: league.image_path,
//     }));

//     res.status(200).json({
//       status: true,
//       data: response.data,
//     });

//   } catch (error) {
//     console.error("❌ Error fetching leagues:", error.message || error);

//     // Ensure res is defined before using it
//     if (res) {
//       res.status(500).json({
//         status: false,
//         error: error.message || error,
//       });
//     } else {
//       console.error("🚨 Response object (res) is undefined!");
//     }
//   }
// };


const getLeagues = async (req, res) => {
  try {
    const API_TOKEN = process.env.SPORTMONKS_API_TOKEN; // Token `.env` se le rahe hain
    const API_URL_getLeagues = `https://api.sportmonks.com/v3/my/leagues?api_token=${API_TOKEN}`;

    const response = await axios.get(API_URL_getLeagues);
    const leagues = response.data.data.map((league) => ({
      id: league.id,
      name: league.name,
      image_path: league.image_path,
    }));
    res.status(200).json({
      status: true,
      data: leagues, // Only relevant data send karo
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message || error,
    });
  }
};




// Save a league
const setLeagues = async (req, res) => {
  try {
    const {league_id, name, logo, code } = req.body;

    // console.log("Step 1: Received request body:", req.body); // Log the request body

    if (name && logo) {

      // console.log("Step 2: Name and Logo found, proceeding with league creation.");

      const createLeague = new League({
        league_id,
        name: name,
        logo: logo,
        code: code,
      });


      // console.log("Step 3: League object created:", createLeague); // Log the created league object


      const saveLeague = await createLeague.save();

      // console.log("Step 4: League saved successfully:", saveLeague); // Log the saved league

      res.status(200).json({
        status: true,
        data: saveLeague,
      });

      // console.log("Step 5: Response sent successfully."); // Confirm response sent

    } else {

      // console.log("Step 6: Required fields missing, sending error response."); // Log missing field error

      res.status(500).json({
        error: "Required name & logo not found...",
      });
    }
  } catch (err) {
    // console.error("Step 7: Error occurred while saving league:", err); // Log the error

    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

// Delete a league from DB
const deleteLeague = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await League.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      deleted: del,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export {
  getLeaguesRapid,
  setLeagues,
  getLeagues,
  getFixturesRapid,
  deleteLeague,
};
