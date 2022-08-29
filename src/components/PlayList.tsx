import axios from "axios";
import { useEffect, useState } from "react";
import { Album, Author, Song } from "./interfaces";
import Row from "./Row";

const PlayList = ({ audios, setAudios, setSelectedSong, selectedSong, playerRef }: any) => {

    const params = new URLSearchParams(window.location.search);
    const [albumParam, setAlbumParam] = useState(params.get('id'));

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
        albumParam && axios.get(`http://localhost:4000/api/playlist?id=${albumParam}`).then((response: any) => {
            const tempSongs: Song[] = response.data.Songs;
            const tempAlbum: Album = {
                author: response.data.author as Author,
                id: response.data.id as string,
                name: response.data.name as string,
                image: response.data.image as string,
                authorId: response.data.authorId as string,
            }
            setAlbum(tempAlbum);
            setAudios(tempSongs)
        }).catch(() => {
            console.error('Oooops, something went wrong!')
        })
    }, [albumParam])

    if (!albumParam || !album) return <>loading</>
    return <>
        <div className="albumHeader">
            <img src={album.image} />
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
                {audios && audios.length > 0 &&
                    audios.map((audio: Song, index: number) => {
                        return <Row key={audio.id} index={index} audio={audio} setSelectedSong={setSelectedSong} selectedSong={selectedSong} playerRef={playerRef} album={album} />
                    })
                }
            </tbody>
        </table>
    </>
}


export default PlayList;