import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../store/actions/userAction";
import { Song, SongRow } from "./interfaces"
import { TimeFormat } from "./TimeFormat"

const Row = ({ index, audio, playerRef }: SongRow) => {
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)
    const navigate = useNavigate();
    const [inLibrary, setInLibrary] = useState(user.library.find((music: Song) => audio.id === music.id) ? true : false);
    const [showMore, setShowMore] = useState(false);
    const same = user.selectedSong?.id === audio.id
    const playing = playerRef.current?.duration > 0 && !playerRef.current?.paused
    function playmusic() {
        if (same) {
            if (playing) {
                playerRef.current?.pause();
            } else {
                playerRef.current?.play();
            }
        } else {
            dispatch(fetchUser({ ...user, selectedSong: audio }))
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
                        audio.album && <div className="albumDetails">
                            <span onClick={() => {
                                navigate(`/artist?id=${audio.album.author?.id}`)
                            }}>{audio.album.author?.name}</span>
                            {`-`}
                            <span onClick={() => {
                                navigate(`/playlist?id=${audio.album.id}`)
                            }}>{audio.album.name}</span></div>
                    }
                </div>
            </div>
        </td>
        <td>
            <TimeFormat time={audio.duration} />
        </td>
        <td className="inLibrary">
            {
                showMore &&
                <div onClick={() => {
                    if (user.library == null) user.library = [];
                    const song = user.library.find((music: Song) => audio.id === music.id);
                    const index = user.library.indexOf(song);
                    if (index !== -1) {
                        user.library.splice(index, 1);
                    } else {
                        user.library.push(audio);
                    }
                    dispatch(fetchUser({ ...user, library: user.library }))
                    setInLibrary(index === -1)
                    setShowMore(false)
                }}>
                    {
                        !inLibrary ? "Add to Library" : "Remove from Library"
                    }
                </div>
            }
            <i className={`bi bi-${showMore ? "x-lg" : "three-dots"}`}
                onClick={() => setShowMore(!showMore)}
            ></i>
        </td>
    </tr>
}

export default Row;