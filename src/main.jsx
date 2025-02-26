import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthContextProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </AuthContextProvider> */}
  </StrictMode>
);
