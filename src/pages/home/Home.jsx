import "./home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import UpComing from "./upComing/UpComing";
import NowPlaying from "./nowPlaying/NowPlaying";


const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
      <UpComing/>
      <NowPlaying/>
      {/* <div style={{height: 1000}}></div> */}
    </div>
  );
};

export default Home;
