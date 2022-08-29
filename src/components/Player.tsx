import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Song, SongPlayer } from "./interfaces";
import { TimeFormat } from "./TimeFormat"

const Player = ({ audio, progress, playerRef, setSelectedSong, audios }: SongPlayer) => {
    const [playing, setPlaying] = useState(true);
    const [looping, setLooping] = useState(false);
    const [shuffling, setShuffling] = useState(false);
    const [shuffleArray, setShuffleArray] = useState<number[]>([]);
    const navigate = useNavigate();

    function shuffle(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function getNewShuffleArray() {
        let temp: number[] = [];
        let tempWithData: Song[] = [];
        audios.forEach((element: Song, index: number) => {
            temp.push(index);
            tempWithData.push(element);
        });
        shuffle(temp)
        let splicedIndex: any = temp.splice(0, 1);
        if (audio.id === tempWithData[splicedIndex].id) splicedIndex = temp.splice(0, 1);
        setShuffleArray(temp)
        return splicedIndex;
    }
    function nextSong(forward: boolean) {
        let index = audios.indexOf(audio);
        if (index === -1) return;
        index = forward ? index + 1 : index - 1;
        if (shuffling)
            index = shuffleArray.length > 0 ? shuffleArray.splice(0, 1) : getNewShuffleArray();
        else if (index >= audios.length)
            index = 0;
        else if (index < 0)
            index = audios.length - 1;
        if (audios && audios[index].id && audios[index].id.length > 0)
            setSelectedSong(audios[index])
    }
    const percent = progress.currentTime / progress.duration * 100;
    const linear = 'linear-gradient(to right, #ff3e3e 0%, #ff3e3e ' + percent + '%, rgb(255 255 255 / 38%) ' + percent + '%, rgb(255 255 255 / 38%) 100%)';

    return <div className="player">
        {
            playerRef.current && <>
                <div className="details">
                    <img src={audio ? audio.image : ''} alt="song" />
                    <div className="detailsDiv">
                        <span className={`albumTitle`}>{audio.name}</span>
                        <div className="albumDetails">
                            <span onClick={() => {
                                navigate(`/artist?id=${audio.album?.author?.id}`)
                            }}>{audio.album?.author?.name}</span>
                            {`-`}
                            <span onClick={() => {
                                navigate(`/playlist?id=${audio.album?.id}`);
                            }}>{audio.album?.name}</span>
                        </div>
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
                    <span className={`bi bi-arrow-clockwise ${looping ? 'selectedText' : ''}`} onClick={() => {
                        playerRef.current.loop = !playerRef.current.loop;
                        setLooping(playerRef.current.loop)
                    }} />
                    <span className={`bi bi-shuffle ${shuffling ? 'selectedText' : ''}`} onClick={() => {
                        setShuffling(!shuffling)
                    }} />
                </div>
                <div className="bar">
                    <TimeFormat time={progress.currentTime} />
                    {
                        progress && <input type="range" min={0} value={(progress.currentTime / progress.duration * 100).toString()} max={100} className="progress" onChange={(e) => {
                            playerRef.current.currentTime = parseFloat(e.target.value) * progress.duration / 100;
                        }} disabled={audio.id.length === 0} style={{
                            background: linear
                        }} />
                    }
                    <TimeFormat time={progress.duration} />
                </div>
            </>
        }
    </div>
}

export default Player;