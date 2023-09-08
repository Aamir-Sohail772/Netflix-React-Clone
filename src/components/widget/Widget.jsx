import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./widget.scss";

const Widget = ({ type }) => {
  const { currentUser } = useContext(AuthContext);
  const title =
    type === "user"
      ? "Reccomended for " + currentUser.displayName
      : type === "popular"
      ? "Popular on DesignMediaX"
      : "Editor's choice";

  const img =
    type === "user"
      ? "../../../public/assets2/learn.jpg"
      : type === "popular"
      ? "../../../public/assets2/world.jpg"
      : "../../../public/assets2/schoolpupils.jpg";
      

  return (
    <div className="widget">
      <span className="rightTitle">{title}</span>
      <img className="rightImg" src={img} alt="" />
    </div>
  );
};

export default Widget;
