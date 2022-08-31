import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actions/userAction";
import { Song } from "./interfaces";
import Row from "./Row";

const Library = ({ playerRef }: any) => {
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)
    useEffect(() => {
        dispatch(fetchUser({
            ...user,
            songsList: user.library
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <div className="title">My Music</div>
        {
            user.library && user.songsList && user.songsList.length === 0 && <>No music added</>
        }
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {user.library && user.songsList && user.songsList.length > 0 &&
                    user.songsList.map((audio: Song, index: number) => {
                        return <Row key={audio.id} index={index} audio={audio} playerRef={playerRef} />
                    })
                }
            </tbody>
        </table>
    </>
}

export default Library;