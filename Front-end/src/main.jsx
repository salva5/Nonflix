//import './index.css'
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.baseURL = 'https://nonflix-backend-production.up.railway.app';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <React.StrictMode>
          <GoogleOAuthProvider clientId="176801974472-rlnchhhjsmsna5ifp1rf92aeuevko5nh.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
