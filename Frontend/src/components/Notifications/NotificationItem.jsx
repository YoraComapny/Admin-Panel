import { useState } from "react";
import { deleteNotification, sendNotification } from "../../Api";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const NotificationItem = ({ notification }) => {
  const [loading, setLoading] = useState(false);
  // Delete notif function
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteNotification(id);
      console.log("Notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send notif function
  const handleSendNotification = async (id) => {
    setLoading(true);
    try {
      await sendNotification(id);
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-between text-sm items-center">
      <p className="text-blue-500 w-[25%]">{notification.title}</p>
      <div className="overflow-none w-[50%] text-center">
        <p className="font-normal line-clamp-1">{notification.body}</p>
      </div>
      <div className="w-[25%] flex gap-3 justify-end items-center text-xs">
        <button
          className={`p-2 uppercase h-max  text-center flex items-center gap-1 text-white font-semibold rounded-md shadow-md transition cursor-pointer hover:bg-green-800 active:scale-95 ${
            loading ? "bg-gray-500 pointer-events-none" : "bg-green-600"
          }`}
          onClick={() => handleSendNotification(notification._id)}
        >
          <IoIosSend className="text-lg" />
          Resend
        </button>
        <button
          className={`p-2 uppercase h-max  text-center flex items-center gap-1 text-white font-semibold rounded-md shadow-md transition cursor-pointer hover:bg-red-800 active:scale-95 ${
            loading ? "bg-gray-500 pointer-events-none" : "bg-red-600"
          }`}
          onClick={() => handleDelete(notification._id)}
        >
          <MdDelete className="text-lg" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
