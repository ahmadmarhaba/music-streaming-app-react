import { useNavigate } from "react-router-dom";
import { Song, SongRow } from "./interfaces"
import { TimeFormat } from "./TimeFormat"

const Row = ({ index, album, audio, selectedSong, setSelectedSong, playerRef }: SongRow) => {
    const navigate = useNavigate();
    const same = selectedSong.id === audio.id
    const playing = playerRef.current.duration > 0 && !playerRef.current.paused
    function playmusic() {
        if (same) {
            if (playing) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
        } else {
            let song: Song = audio;
            song.album = album;
            console.log(song.album)
            setSelectedSong(song);
        }
    }
    return <tr className={`row`}>
        <td onClick={() => playmusic()}>
            {
                same ? <i className={`bi bi-${playing ? 'pause' : 'play'}-fill selectedText`}></i> : index + 1
            }
        </td>
        <td>
            <div className="info">
                <img src={audio.image} alt="song" onClick={() => playmusic()} />
                <div className="infoDiv">
                    <span className={`albumTitle ${same ? 'selectedText' : ''}`}
                        onClick={() => playmusic()}>{audio.name}</span>
                    {
                        album && <div className="albumDetails">
                            <span onClick={() => {
                                navigate(`/artist?id=${album.author?.id}`)
                            }}>{album.author?.name}</span>
                            {`-`}
                            <span onClick={() => {
                                navigate(`/playlist?id=${album.id}`)
                            }}>{album.name}</span></div>
                    }
                </div>
            </div>
        </td>
        <td>
            <TimeFormat time={audio.duration} />
        </td>
        <td>
            <i className="bi bi-three-dots"></i>
        </td>
    </tr>
}

export default Row;