import "./header.scss";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdSubscriptions,
  MdManageAccounts,
  // MdDarkMode,
  MdFavoriteBorder,
} from "react-icons/md";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
// import {BiMoviePlay} from "react-icons/bi"
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.svg";

// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { current } from "@reduxjs/toolkit";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Add Profile Update starting here
  // const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const controlNavbar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);
  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/home")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigate("/home")}>
            <AiFillHome />
          </li>
          {/* <li className="menuItem" ><BiMoviePlay/></li> */}
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <MdFavoriteBorder />
            My List
          </li>
          <li
            className="menuItem"
            onClick={() => navigate("/subscriptionPlan")}
          >
            <MdSubscriptions />
            Subscriptions
          </li>
          {/* <li className="menuItem">
            <MdDarkMode />
            Theme
          </li> */}
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          <li className="menuItem profile" onClick={() => navigate("/profile")}>
            <MdManageAccounts />
            Profile
          </li>
          <li className="menuItem" onClick={() => navigate("/login")}>
            <AiOutlineLogout /> Log In
          </li>
          <li className="menuItem" onClick={() => navigate("/register")}>
            <AiOutlineLogout /> Sign Up
          </li>
          {/* Add Profile  */}
          {/* <li className="menuItem">
            <div className="navbarRight">
              <img
                className="profileImg"
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "../../../assets2/DefaultProfile.jpg"
                }
                alt=""
              />
              <span className="navbarName">{currentUser.displayName}</span>
            </div>
          </li> */}
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Searching for a movies or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
