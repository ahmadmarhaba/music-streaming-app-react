import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actions/userAction";
import { Album, Author, Song } from "./interfaces";
import Row from "./Row";
import { playId } from "./topNav";

const PlayList = ({ playerRef }: any) => {
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)

    const params = new URLSearchParams(window.location.search);
    const [albumParam] = useState(params.get('id'));

    const [album, setAlbum] = useState<Album>({
        id: "",
        name: "",
        image: "",
        authorId: "",
        author: {
            id: "",
            name: "",
            image: ""
        }
    });
    useEffect(() => {
        albumParam && axios.get(`https://ahmadmarhaba-music-app-nodejs.herokuapp.com/api/playlist?id=${albumParam}`).then((response: any) => {
            const tempSongs: Song[] = response.data.Songs;
            const tempAlbum: Album = {
                author: response.data.author as Author,
                id: response.data.id as string,
                name: response.data.name as string,
                image: response.data.image as string,
                authorId: response.data.authorId as string,
            }
            setAlbum(tempAlbum);
            dispatch(fetchUser({ ...user, songsList: tempSongs }))
            playId({ dispatch, user, fetchUser })
        }).catch(() => {
            console.error('Oooops, something went wrong!')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albumParam])

    if (!albumParam || !album) return <>loading</>
    return <>
        <div className="albumHeader">
            <img src={album.image} alt="Album" />
            <div>
                <span>{`PLAYLIST`}</span>
                <div className="albumName">{album.name}</div>
                <span className="albumAuthor">{album.author?.name}</span>
            </div>
        </div>
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
                {user.songsList && user.songsList.length > 0 &&
                    user.songsList.map((audio: Song, index: number) => {
                        return <Row key={audio.id} index={index} audio={audio} playerRef={playerRef} />
                    })
                }
            </tbody>
        </table>
    </>
}


export default PlayList;