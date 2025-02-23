import DateSelector from "../global/DateSelector";
import LeagueFixtures from "../global/LeagueFixture";
import Location from "../global/Location";
import { useLocation } from "react-router-dom";
import Portal from "./Portal";
import { useEffect, useState } from "react";
import { getFixtures } from "../../Api";
import LoadingBall from "../global/LoadingBall.jsx";

const Fixtures = () => {
  const location = useLocation();
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0].toString()
  );

  useEffect(() => {
    setLoading(true);
    const fixtures = async () => {
      try {
        const dailyFixtures = await getFixtures({
          date: selectedDate,
        });
        console.log("ye mera 1 console", dailyFixtures);
        setFixtures(dailyFixtures);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };
    fixtures();
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selectedDate state
  };
  return (
    <>
      <Portal>
        <div className="w-full flex flex-col gap-5 bg-gray-100 p-5 min-h-screen">
          <div>
            <Location location={location} />
          </div>
          <div className="flex flex-col gap-10 bg-white shadow-md w-full mx-auto rounded-md p-5">
            <p className="font-bold">Pick Your Date</p>
            <DateSelector onDateSelect={handleDateSelect} />
          </div>

          <div className="min-h-[200px] bg-white shadow-md w-full mx-auto rounded-md p-5">
            {loading ? (
              <div className="mt-5">
                <LoadingBall />
              </div>
            ) : fixtures ? (
              <LeagueFixtures fixture={fixtures} />
            ) : (
              <div className="text-center w-full text-bold text-red-500 font-semibold">
                Could not fetch data
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Fixtures;
