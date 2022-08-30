import "../styles/collection.css"
import { AppMain } from "../components/interfaces";
import PlayList from "../components/PlayList";
import Explore from "../components/Explore";
import {
  Routes,
  Route,
} from "react-router-dom";
import Artist from "../components/Artist";
// import Upload from "./upload";
import TopNav from "../components/topNav";
import LeftNav from "../components/leftNav";
import Library from "../components/Library";
import { useSelector } from "react-redux";

const Main = ({ playerRef }: AppMain) => {
  let { user } = useSelector((state: any) => state.user)
  return (
    <>
      <div className={`container ${user.selectedSong && user.selectedSong.id.length > 0 ? 'addPlayer' : ''}`}>
        <div className={`main`}>

          <LeftNav />
          <div className="collection">
            <TopNav />
            <Routes>
              {/* <Route path="/upload" element={<Upload />} /> */}
              <Route path="/playlist" element={<PlayList playerRef={playerRef} />} />

              <Route path="/artist" element={<Artist />} />
              <Route path="/library" element={<Library playerRef={playerRef} />} />

              <Route path="/explore" element={<Explore playerRef={playerRef} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;