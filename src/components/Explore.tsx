import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchUser } from "../store/actions/userAction";
import '../styles/Explore.css'
import { Album, Author, Song } from "./interfaces";
import Row from "./Row";


const Explore = ({ playerRef }: any) => {

    const [suggestList, setSuggestList] = useState<Author[]>([])
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)
    useEffect(() => {
        axios.get(`http://localhost:4000/api/explore`).then((response: any) => {
            const suggest = response.data.suggest;
            const popular = response.data.popular;
            setSuggestList(suggest);
            dispatch(fetchUser({ ...user, songsList: popular }))
        }).catch(() => {
            console.error('Oooops, something went wrong!')
        })
    }, [])
    return <>
        <div className="suggest">
            <div className="title">Explore new</div>
            <div className="suggestList">
                {
                    suggestList && suggestList.map((author: any, index) => {
                        return <div key={index} className="slot">
                            <img src={author.image} alt="song" onClick={() => {
                                navigate(`/artist?id=${author.id}`)
                            }} />
                            <div>
                                <Link to={`/artist?id=${author.id}`}>{author.name}</Link>
                                <span onClick={() => {
                                    let song: Song = author.Albums[0].Songs[0];
                                    song.album = author.Albums[0] as Album;
                                    song.album.author = author;
                                    dispatch(fetchUser({ ...user, selectedSong: song }))
                                }}>{author.Albums[0].Songs[0].name}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className="popular">
            <div className="title">Popular</div>
            <table>
                <tbody>
                    {user.songsList && user.songsList.length > 0 &&
                        user.songsList.map((audio: Song, index: number) => {
                            return <Row key={audio.id} index={index} audio={audio} playerRef={playerRef} />
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default Explore;