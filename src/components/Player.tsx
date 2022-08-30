import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../store/actions/userAction";

import { Song, SongPlayer } from "./interfaces";
import { TimeFormat } from "./TimeFormat"

const Player = ({ progress, playerRef }: SongPlayer) => {
    const [volume, setVolume] = useState(100);
    const [playing, setPlaying] = useState(true);
    const [looping, setLooping] = useState(false);
    const [shuffling, setShuffling] = useState(false);
    const [shuffleArray, setShuffleArray] = useState<number[]>([]);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)
    function shuffle(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function getNewShuffleArray() {
        let temp: number[] = [];
        let tempWithData: Song[] = [];
        user.songsList.forEach((element: Song, index: number) => {
            temp.push(index);
            tempWithData.push(element);
        });
        shuffle(temp)
        let splicedIndex: any = temp.splice(0, 1);
        if (user.selectedSong.id === tempWithData[splicedIndex].id) splicedIndex = temp.splice(0, 1);
        setShuffleArray(temp)
        return splicedIndex;
    }
    function nextSong(forward: boolean) {
        const song = user.songsList.find((music: Song) => user.selectedSong.id === music.id)
        let index = user.songsList.indexOf(song);
        if (index === -1) return;
        index = forward ? index + 1 : index - 1;
        if (shuffling)
            index = shuffleArray.length > 0 ? shuffleArray.splice(0, 1) : getNewShuffleArray();
        else if (index >= user.songsList.length)
            index = 0;
        else if (index < 0)
            index = user.songsList.length - 1;
        if (user.songsList && user.songsList[index].id && user.songsList[index].id.length > 0) {
            dispatch(fetchUser({ ...user, selectedSong: user.songsList[index] }))
        }
    }
    useEffect(() => {
        playerRef.current.volume = volume / 100;
    }, [volume])
    const percent = progress.currentTime / progress.duration * 100;
    const linear = 'linear-gradient(to right, #ff3e3e 0%, #ff3e3e ' + percent + '%, rgb(255 255 255 / 38%) ' + percent + '%, rgb(255 255 255 / 38%) 100%)';
    return <div className="player">
        <div className="bar">
            {
                progress && <input type="range" min={0} value={progress.duration && progress.currentTime ? progress.currentTime / progress.duration * 100 : 0} max={100} className="progress" onChange={(e) => {
                    playerRef.current.currentTime = parseFloat(e.target.value) * progress.duration / 100;
                }} disabled={user.selectedSong.id.length === 0} style={{
                    background: linear
                }} />
            }
        </div>
        <div className="inside">
            <div className="details">
                <img src={user.selectedSong ? user.selectedSong.image : ''} alt="song" />
                <div className="detailsDiv">
                    <span className={`albumTitle`}>{user.selectedSong.name}</span>
                    <div className="albumDetails">
                        <span onClick={() => {
                            navigate(`/artist?id=${user.selectedSong.album?.author?.id}`)
                        }}>{user.selectedSong.album?.author?.name}</span>
                        {`-`}
                        <span onClick={() => {
                            navigate(`/playlist?id=${user.selectedSong.album?.id}`);
                        }}>{user.selectedSong.album?.name}</span>
                    </div>
                </div>
                <div className="timeShown">
                    <TimeFormat time={progress.currentTime} />
                    {`-`}
                    <TimeFormat time={progress.duration} />
                </div>
            </div>
            <div className="utilites">
                <span className={`bi bi-skip-backward-fill`} onClick={() => {
                    nextSong(false)
                }} />
                <span className={`play bi bi-${playing && percent !== 100 ? 'pause' : 'play'}-fill`} onClick={() => {
                    if (playerRef.current.paused) {
                        playerRef.current.play()
                    } else {
                        playerRef.current.pause()
                    }
                    setPlaying(playerRef.current.duration > 0 && !playerRef.current.paused)
                }} />
                <span className={`bi bi-skip-forward-fill`} onClick={() => {
                    nextSong(true)
                }} />
            </div>
            <div className="utilites">
                <span className={`bi bi-arrow-clockwise ${looping ? 'selectedText' : ''}`} onClick={() => {
                    playerRef.current.loop = !playerRef.current.loop;
                    setLooping(playerRef.current.loop)
                }} />
                <span className={`bi bi-shuffle ${shuffling ? 'selectedText' : ''}`} onClick={() => {
                    setShuffling(!shuffling)
                }} />
                <span className={`bi ${volume === 0 ? 'bi-volume-mute-fill selectedText' : 'bi-volume-up-fill'}`} onClick={() => {
                    setVolume(playerRef.current.volume > 0 ? 0 : 100);
                }} />
                <input type="range" className="volume" value={volume} min={0} max={100} onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                }} />
            </div>
        </div>
    </div>
}

export default Player;