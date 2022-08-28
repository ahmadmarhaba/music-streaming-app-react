import { SongRow } from "./interfaces"
import { TimeFormat } from "./TimeFormat"

const Row = ({ index, audio, selectedSong, setSelectedSong, playerRef }: SongRow) => {
    const same = selectedSong.id === audio.id
    const playing = playerRef.current.duration > 0 && !playerRef.current.paused
    return <tr onClick={() => {
        if (same) {
            if (playing) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
        } else {
            setSelectedSong(audio);
        }
    }} className={`row`}>
        <td>
            {
                same ? <i className={`bi bi-${playing ? 'pause' : 'play'}-fill selectedText`}></i> : index + 1
            }
        </td>
        <td>
            <div className="info">
                <img src={audio.songImage} />
                <div>
                    <span className={same ? 'selectedText' : ''}>{audio.songName}</span>
                    <span>{audio.author}</span>
                </div>
            </div>
        </td>
        <td>
            {audio.albumName}
        </td>
        <td>
            <TimeFormat time={audio.songDuration} />
        </td>
    </tr>
}

export default Row;