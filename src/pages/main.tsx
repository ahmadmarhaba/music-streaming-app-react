import "../styles/collection.css"
import { AppMain } from "../components/interfaces";
import PlayList from "../components/PlayList";
import { useState } from "react";
import Explore from "../components/Explore";
import {
  Routes,
  Route,
} from "react-router-dom";
import Artist from "../components/Artist";
import Upload from "./upload";
import TopNav from "../components/topNav";
import LeftNav from "../components/leftNav";

const Main = ({ audios, setAudios, selectedSong, playerRef, setSelectedSong }: AppMain) => {

  return (
    <>
      <div className={`container ${selectedSong && selectedSong.id.length > 0 ? 'addPlayer' : ''}`}>
        <div className={`main`}>

          <LeftNav />
          <div className="collection">
            <TopNav />
            <Routes>
              {/* <Route path="/upload" element={<Upload />} /> */}
              <Route path="/playlist" element={<PlayList audios={audios} setAudios={setAudios} setSelectedSong={setSelectedSong} selectedSong={selectedSong} playerRef={playerRef} />} />

              <Route path="/artist" element={<Artist />} />

              <Route path="/explore" element={<Explore setSelectedSong={setSelectedSong} selectedSong={selectedSong} playerRef={playerRef} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;