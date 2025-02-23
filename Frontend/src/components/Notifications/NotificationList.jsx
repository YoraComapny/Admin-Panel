import { useEffect, useState } from "react";
import { getAllNotifications } from "../../Api";
import LoadingBall from "../global/LoadingBall";
import NotificationItem from "./NotificationItem";
import { toast } from "react-toastify";

const NotificationList = () => {
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const notifications = await getAllNotifications();
        setNotifs(notifications.data);
      } catch (error) {
        toast.error("Error fetching Notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="w-[97%] mx-auto font-semibold">
        <div className="border-b flex justify-between px-3 py-1">
          <h4>Title</h4>
          <h4>Body</h4>
          <h4>Action</h4>
        </div>
        {loading ? (
          <div className="mt-5">
            <LoadingBall />
          </div>
        ) : (
          <div className="p-3 flex flex-col gap-2 justify-center">
            {notifs.map((notification) => (
              <div key={notification._id}>
                <NotificationItem notification={notification} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
