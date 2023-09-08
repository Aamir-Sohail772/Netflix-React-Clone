import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import SubscriptionPlan from "./pages/subscriptionPlans/SubscriptionPlan";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import Sidebar from "./components/sidebar/Sidebar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  // Add Profile '
  const { currentUser } = useContext(AuthContext);
  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log("All Genres : ", JSON.stringify({...allGenres}));
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  };
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<AuthRoute><Sidebar /></AuthRoute>} />

          <Route
            path="/"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />

          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<AuthRoute><SearchResult /></AuthRoute>} />
          <Route path="/explore/:mediaType" element={<AuthRoute><Explore /></AuthRoute>} />
          <Route path="/subscriptionPlan" element={<SubscriptionPlan />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
