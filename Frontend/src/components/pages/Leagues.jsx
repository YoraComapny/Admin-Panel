// import { CiSearch } from "react-icons/ci";
// import SelectedLeagues from "../global/SelectedLeagues";
// import Portal from "./Portal";
// import { searchLeagues, saveLeagues, getLeagues } from "../../Api.js";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import LoadingBall from "../global/LoadingBall.jsx";

// const Leagues = () => {
//   // States
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loading2, setLoading2] = useState(false);
//   const [leagues, setLeagues] = useState([]);

//   // Search function
//   const handleSearch = async () => {
//     setLoading(true);
//     setShowDropdown(true);
//     try {
//       const data = await searchLeagues(search);
//       if (data.data.length > 0) {
//         setData(data.data);
//       } else {
//         toast.error("Couldn't find league..");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (e.target.closest(".input-wrapper") === null) {
//       setData("");
//       setSearch("");
//       setShowDropdown(false);
//     }
//   };

//   // Add listener to input [search] field
//   useEffect(() => {
//     setLoading2(true);
//     try {
//       const getAllLeagues = async () => {
//         const res = await getLeagues();
//         setLeagues(res.data);
//       };
//       // Calling function
//       getAllLeagues();
//     } catch (err) {
//       console.log("Error: ", err);
//     } finally {
//       setLoading2(false);
//     }
//     // Attaching listener
//     document.body.addEventListener("click", handleClickOutside);
//     // Removing listener
//     return () => {
//       document.body.removeEventListener("click", handleClickOutside);
//     };
//   }, [loading2]);

//   // Save a league
//   const saveLeague = async (rapidLeague) => {
//     setLoading2(true);
//     try {
//       const name = rapidLeague.league.name;
//       const logo = rapidLeague.league.logo;
//       const code = rapidLeague.country.code;
//       const id = rapidLeague.league.id;

//       const myLeague = {
//         id: id,
//         name: name,
//         logo: logo,
//         code: code,
//       };
//       const res = await saveLeagues(myLeague);
//       console.log(res);
//     } catch (err) {
//       console.error("Error: ", err);
//     } finally {
//       setLoading2(false);
//       setData("");
//       setSearch("");
//       setShowDropdown(false);
//     }
//   };
//   return (
//     <>
//       <Portal>
//         <div className="bg-gray-100 w-full min-h-screen p-3">
//           <div className="mt-4 p-5 w-[90%] mx-auto bg-white shadow-md rounded-md flex flex-col ">
//             <h3 className="font-bold text-gray-600 ">Search Popular Leagues</h3>
//             <div className="relative w-1/2 input-wrapper">
//               <input
//                 type="text"
//                 placeholder="Search by a country..."
//                 className={`border-2 border-gray-300 w-full p-1 rounded-md transition ${
//                   loading ? "bg-gray-300 pointer-events-none" : ""
//                 }`}
//                 name="search"
//                 value={loading ? "Searching..." : search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSearch();
//                 }}
//                 onFocus={() => setShowDropdown(true)}
//               />
//               <CiSearch
//                 className="absolute text-gray-500 text-2xl top-1 right-4 cursor-pointer hover:text-black"
//                 onClick={() => handleSearch()}
//               />
//               {showDropdown && data !== "" ? (
//                 <div className=" bg-gray-200 text-black font-semibold rounded-md p-2 shadow-md flex flex-col gap-2">
//                   {data.map((league, index) => (
//                     <div
//                       className="p-1 flex gap-3 items-center rounded-md bg-white transition cursor-pointer hover:bg-gray-100"
//                       key={index}
//                       onClick={() => saveLeague(league)}
//                     >
//                       <img
//                         alt={league.country.code}
//                         src={league.league.logo}
//                         className="h-[50px] w-[50px] p-2 rounded-md"
//                       />
//                       <p>{league.country.code}</p>
//                       <h1>{league.league.name}</h1>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 ""
//               )}
//             </div>
//           </div>

//           <div className="mt-[3rem] w-[87%] mx-auto">
//             <h2 className="text-lg font-bold text-gray-500 mb-2">
//               Selected Leagues
//             </h2>
//             <div className="mt-2 flex flex-col gap-2">
//               {loading2 ? (
//                 <LoadingBall />
//               ) : (
//                 <SelectedLeagues leagues={leagues} />
//               )}
//             </div>
//           </div>
//         </div>
//       </Portal>
//     </>
//   );
// };

// export default Leagues;

import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import SelectedLeagues from "../global/SelectedLeagues";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall.jsx";
import { getLeagues } from "../../Api"; // Import API call
import LeaguesList from "../global/SelectedLeagues"; // Import LeaguesList component

const Leagues = () => {
  // 🔹 States for data and search
  const [search, setSearch] = useState("");
  const [leagues, setLeagues] = useState([]); // Store leagues from API
  const [filteredLeagues, setFilteredLeagues] = useState([]); // Live Filtered Data

  //🏆 Fetch leagues when component mounts
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await getLeagues(); // API call
        setLeagues(response); // Store API data
        setFilteredLeagues(response); // Initially show all leagues
        setLoadingLeagues(false);
      } catch (error) {
        console.error("Error fetching leagues:", error);
        setLoadingLeagues(false);
      }
    };

    fetchLeagues();
  }, []);

  // 🔎 **Step 2: Search Functionality**
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);

    // Filter leagues based on search input
    const filteredData = leagues.filter((league) =>
      league.name.toLowerCase().includes(searchText)
    );

    setFilteredLeagues(filteredData);
  };
  return (
    <Portal>
      <div className="bg-gray-100 w-full min-h-screen p-3">
        {/* Search Section */}
        <div className="mt-4 p-5 w-[90%] mx-auto bg-white shadow-md rounded-md flex flex-col">
          <h3 className="font-bold text-gray-600">Search Popular Leagues</h3>

          <div className="relative w-1/2 input-wrapper">
            <input
              type="text"
              placeholder="Search by a league..."
              className="border-2 border-gray-300 w-full p-1 rounded-md transition"
              // value={loading ? "Searching..." : search}
              onChange={handleSearch} // Use the search function
            />
            <CiSearch className="absolute text-gray-500 text-2xl top-1 right-4 cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Selected Leagues Section */}
        <div className="mt-12 w-[87%] mx-auto">
          <h2 className="text-lg font-bold text-gray-500 mb-2">
            Selected Leagues
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {<LoadingBall /> ? (
              <SelectedLeagues propsPass={filteredLeagues} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Leagues;
