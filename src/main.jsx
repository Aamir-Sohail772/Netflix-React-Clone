import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

// import { AuthContextProvider } from "./context/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

{/* <AuthContextProvider> */}
{/* </AuthContextProvider> */}


