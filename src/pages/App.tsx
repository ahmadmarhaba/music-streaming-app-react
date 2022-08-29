import { useEffect, useRef, useState } from 'react';
import '../styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Main from './main';
import { Progress, Song } from '../components/interfaces';
import Player from '../components/Player';
import {
  BrowserRouter as Router,
} from "react-router-dom";
function App() {
  const [selectedSong, setSelectedSong] = useState<Song>({
    id: "",
    name: "",
    image: "",
    url: "",
    duration: 0,
    size: 0,
    mimeType: "",
    albumId: "",
  });
  let playerRef = useRef<any>(null);
  const [audios, setAudios] = useState<Song[]>([]);
  const [progress, setProgress] = useState<Progress>({
    currentTime: 0,
    duration: 0
  });

  useEffect(() => {
    playerRef.current.addEventListener("timeupdate", function () {
      let currentTime: number = playerRef.current.currentTime;
      let duration: number = playerRef.current.duration;
      if (Number.isNaN(playerRef.current.duration) || Number.isNaN(playerRef.current.currentTime)) return;
      setProgress({
        currentTime,
        duration
      })
    });
    playerRef.current.addEventListener("ended", function () {
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    });
  }, [])
  return (
    <>
      {/* <Upload /> */}
      <Router>
        <Main audios={audios} setAudios={setAudios} selectedSong={selectedSong} playerRef={playerRef} setSelectedSong={setSelectedSong} />
        {
          selectedSong && selectedSong.id.length > 0 && <Player audio={selectedSong} progress={progress} playerRef={playerRef} setSelectedSong={selectedSong} audios={audios} />
        }
        <audio src={selectedSong ? selectedSong.url : ''} typeof="audio/mpeg" autoPlay ref={playerRef} id="player" />
      </Router>
    </>
  );
}

export default App;
