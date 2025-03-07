import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import RoutesConfig from "./routes/RoutesConfig";
import { AuthProvider } from "./context/AuthContext";
import DynamicWrapper from "./components/DynamicWrapper";

const App = () => {
  return (
    <>
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <DynamicWrapper>
          <RoutesConfig />
        </DynamicWrapper>
      </Router>
      </AuthProvider>
    </>
  );
};

export default App;
