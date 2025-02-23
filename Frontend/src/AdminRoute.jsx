import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Fixtures from "./components/pages/Fixtures.jsx";
import ManageApp from "./components/pages/ManageApp.jsx";
import ManageLive from "./components/pages/ManageLive.jsx";
import Leagues from "./components/pages/Leagues.jsx";
import News from "./components/pages/News.jsx";
import Administration from "./components/pages/Administration.jsx";
import Types from "./components/pages/Types.jsx";
import CreateMatch from "./components/pages/CreateMatch.jsx";
import EditMatch from "./components/pages/EditMatch.jsx";
import ContactUs from "./components/pages/ContactUs.jsx";
import Highlights from "./components/pages/Highlights.jsx";
import Notification from "./components/pages/Notification.jsx";
import Logout from "./components/pages/Logout.jsx";
import AddNews from "./components/News/AddNews.jsx";
import EditNews from "./components/News/EditNews.jsx";
import CreateNotification from "./components/Notifications/CreateNotification.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manage-live" element={<ManageLive />} />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/manage-apps" element={<ManageApp />} />
      <Route path="/selected-leagues" element={<Leagues />} />
      <Route path="/news" element={<News />} />
      <Route path="/administration" element={<Administration />} />
      <Route path="/types" element={<Types />} />
      <Route path="/manage-live/edit/:id" element={<EditMatch />} />
      <Route path="/manage-live/create-match" element={<CreateMatch />} />
      <Route path="/news/create-news" element={<AddNews />} />
      <Route path="/news/edit-news/:id" element={<EditNews />} />
      <Route path="/highlights" element={<Highlights />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/notifications" element={<Notification />} />
      <Route
        path="/notification/create-notification"
        element={<CreateNotification />}
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default AdminRoutes;
