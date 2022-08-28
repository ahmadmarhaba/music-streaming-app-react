import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import '../styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Upload from './upload';
import Main from './main';
import { Progress, Song } from '../components/interfaces';
import Player from '../components/Player';
import { Link, NavLink, Route, Router } from 'react-router-dom';

function App() {
  const defaultSongValue: Song = {
    id: 0,
    author: "",
    authorImage: "",
    albumName: "",
    songName: "",
    songImage: "",
    songUrl: "",
    songDuration: 0,
    songSize: 0,
    songMimeType: "",
    cloudinaryId: "",
  }
  const [selectedSong, setSelectedSong] = useState<Song>(defaultSongValue);
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
      <Main audios={audios} setAudios={setAudios} selectedSong={selectedSong} playerRef={playerRef} setSelectedSong={setSelectedSong} />
      {
        selectedSong && selectedSong.id > 0 && <Player audio={selectedSong} progress={progress} playerRef={playerRef} setSelectedSong={selectedSong} audios={audios} />
      }
      <audio src={selectedSong ? selectedSong.songUrl : ''} typeof="audio/mpeg" autoPlay ref={playerRef} id="player" />
    </>
  );
}

export default App;
