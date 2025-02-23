import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context";
import {
  Dashboard,
  Fixtures,
  ManageApp,
  ManageLive,
  Leagues,
  News,
  Administration,
  Types,
  CreateMatch,
  EditMatch,
  ContactUs,
  Highlights,
  Notification,
  Logout,
} from "./components/pages/index.js";
import AddNews from "./components/News/AddNews.jsx";
import EditNews from "./components/News/EditNews.jsx";
import CreateNotification from "./components/Notifications/CreateNotification.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-live" element={<ManageLive />} />
          <Route path="/admin/fixtures" element={<Fixtures />} />
          <Route path="/admin/manage-apps" element={<ManageApp />} />
          <Route path="/admin/selected-leagues" element={<Leagues />} />
          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/administration" element={<Administration />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/manage-live/edit/:id" element={<EditMatch />} />
          <Route
            path="/admin/manage-live/create-match"
            element={<CreateMatch />}
          />
          <Route path="/admin/news/create-news" element={<AddNews />} />
          <Route path="/admin/news/edit-news/:id" element={<EditNews />} />
          <Route path="/admin/highlights" element={<Highlights />} />
          <Route path="/admin/contact-us" element={<ContactUs />} />
          <Route path="/admin/notifications" element={<Notification />} />
          <Route
            path="/admin/notification/create-notification"
            element={<CreateNotification />}
          />
          <Route path="/admin/logout" element={<Logout />} />
        </Routes>
        {/* <Portal /> */}
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

export default App;
