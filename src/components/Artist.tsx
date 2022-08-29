import axios from "axios";
import { useEffect, useState } from "react";
import { Album, Author, Song } from "./interfaces";
import Row from "./Row";
import { useNavigate } from 'react-router-dom';
const Artist = () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const [authorParam, setAuthorParam] = useState(params.get('id'));
    const [author, setAuthor] = useState<Author>({
        id: "",
        name: "",
        image: ""
    })
    const [albums, setAlbums] = useState<Album[]>([]);
    useEffect(() => {
        authorParam && axios.get(`http://localhost:4000/api/artist?id=${authorParam}`).then((response: any) => {
            const tempAuth: Author = response.data.author;
            const tempAlb: Album[] = response.data.albums;
            setAuthor(tempAuth)
            setAlbums(tempAlb);
        }).catch(() => {
            console.error('Oooops, something went wrong!')
        })
    }, [authorParam])

    if (!authorParam || !author) return <>loading</>
    return <>
        <div className="albumHeader">
            <img src={author.image} />
            <div>
                <span>{`ARTIST`}</span>
                <div className="albumName">{author.name}</div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Album</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {albums && albums.length > 0 &&
                    albums.map((album: Album, index: number) => {
                        return <tr key={index} className={`row`}

                        >
                            <td onClick={() => navigate(`/playlist?id=${album.id}`)}>{index + 1} </td>
                            <td>
                                <div className="info">
                                    <img src={album.image} alt="song" onClick={() => navigate(`/playlist?id=${album.id}`)} />
                                    <div className="infoDiv">
                                        <span className={`albumTitle`}
                                            onClick={() => navigate(`/playlist?id=${album.id}`)}
                                        >{album.name}</span>
                                        {
                                            album && <div className="albumDetails">
                                                <span onClick={() => {
                                                    navigate(`/artist?id=${author.id}`)
                                                }}>{author.name}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                <i className="bi bi-three-dots"></i>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}


export default Artist;