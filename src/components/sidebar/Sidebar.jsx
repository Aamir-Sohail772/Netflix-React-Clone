import {
    ExitToAppOutlined,
    HearingOutlined,
    // HomeOutlined,
    // List,
    // MovieCreationOutlined,
    // PhotoSizeSelectActualOutlined,
    Settings,
  } from "@mui/icons-material";
  
    
  import { useContext } from "react";
  import { AuthContext } from "../../context/AuthContext";
  import MenuLink from "../menuLink/MenuLink";
  import "./sidebar.scss";
  import { useNavigate } from "react-router-dom";
  
  import Update from "../update/Update";
  // import Rightbar from "../rightbar/Rightbar";
  
  const Sidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = (e) => {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    };
  
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          {/* <MenuLink icon={<HomeOutlined />} text="Homepage" /> */}
          {/* <MenuLink icon={<List />} text="Lists" /> */}
          {/* <MenuLink icon={<PhotoSizeSelectActualOutlined />} text="Photos" /> */}
          {/* <MenuLink icon={<MovieCreationOutlined />} text="Videos" /> */}
          <MenuLink icon={<HearingOutlined />} text="Wishlist" />
          <MenuLink icon={<Settings />} text="Settings" />
          <span onClick={handleLogout}>
            <MenuLink icon={<ExitToAppOutlined />} text="Logout" />
          </span>
        </div>
      <Update/>
      {/* <Rightbar /> */}
      </div>
    );
  };
  
  export default Sidebar;
  
  