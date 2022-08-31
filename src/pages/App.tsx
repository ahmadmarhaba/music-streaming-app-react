import { useEffect, useRef, useState } from 'react';
import '../styles/App.css';
import Main from './main';
import { Progress } from '../components/interfaces';
import Player from '../components/Player';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {

  let { user } = useSelector((state: any) => state.user)
  let playerRef = useRef<any>(null);

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
    <Router>
      <Main playerRef={playerRef} />
      {
        user.selectedSong && user.selectedSong.id.length > 0 && <Player progress={progress} playerRef={playerRef} />
      }
      <audio src={user.selectedSong ? user.selectedSong.url : ''} typeof="audio/mpeg" autoPlay ref={playerRef} />
    </Router>
  );
}

export default App;
