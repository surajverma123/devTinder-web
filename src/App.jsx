import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "@material-tailwind/react";

import 'react-toastify/dist/ReactToastify.css';

import Body from "./components/Body";
import Login from "./components/AuthForm/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import SignUp from "./components/AuthForm/SignUp";
import ForgotPassword from "./components/AuthForm/ForgotPassword";
import ResetPassword from "./components/AuthForm/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ConnectedUsers from "./pages/Connection/ConnectedUser";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <ThemeProvider>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <>
            {/* Toast container is added at the root level */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/connections" element={<ConnectedUsers/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
