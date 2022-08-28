import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import Row from "../components/Row";
import "../styles/collection.css"
import { Album, AppMain, Song } from "../components/interfaces";

const Main = ({ audios, setAudios, selectedSong, playerRef, setSelectedSong }: AppMain) => {

  const [album, setAlbum] = useState<Album>({
    author: "",
    authorImage: "",
    albumName: "",
  });


  useEffect(() => {
    axios.get("http://localhost:4000/api/fetch").then((response: any) => {
      const data: Song[] = response.data;
      const temp = {
        author: data[0].author,
        authorImage: data[0].authorImage,
        albumName: data[0].albumName,
      }
      setAlbum(temp);
      console.log(data)
      setAudios(data)
    }).catch(() => {
      console.log('Oooops, something went wrong!')
    })

  }, [])
  const displayAudios = () =>
    audios.map((audio: Song, index: number) => {
      return <Row key={audio.cloudinaryId} index={index} audio={audio} setSelectedSong={setSelectedSong} selectedSong={selectedSong} playerRef={playerRef} />
    }
    )


  return (
    <>
      <div className={`container ${selectedSong && selectedSong.id > 0 ? 'addPlayer' : ''}`}>
        <div className={`main`}>
          <div className="options">
            <h4>Music Streaming App</h4>
            <div>
              <i className="bi bi-house"></i>
              <span>Home</span>
            </div>
            <div>
              <i className="bi bi-compass"></i>
              <span>Explore</span>
            </div>
            <div>
              <i className="bi bi-music-note-list"></i>
              <span>Playlist</span>
            </div>
          </div>
          <div className="collection">
            <div className="albumHeader">
              <img src={album.authorImage} />
              <div>
                <span>{`PLAYLIST`}</span>
                <div className="albumName">{album.albumName}</div>
                <span className="albumAuthor">{album.author}</span>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {audios && audios.length > 0 && displayAudios()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;