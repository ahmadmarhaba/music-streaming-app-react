import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../store/actions/userAction";
import { Song } from "./interfaces";

const TopNav = () => {
    const dispatch: any = useDispatch();
    let { user } = useSelector((state: any) => state.user)
    const navigate = useNavigate();
    const [searchList, setSearchList] = useState<Song[]>([]);
    function search(text: string) {
        axios.get(`https://ahmadmarhaba-music-app-nodejs.herokuapp.com/api/search?text=${text}`).then((response: any) => {
            setSearchList(response.data)
        }).catch(() => {
            console.error('Oooops, something went wrong!')
        })
    }

    return <div className="topNav">
        <div className="split switch">
            <i className="bi bi-chevron-left" onClick={() => {
                navigate(-1)
            }}></i>
            <i className="bi bi-chevron-right" onClick={() => {
                navigate(1)
            }}></i>
        </div>
        <div className="split search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search music..." onChange={(e) => {
                const text = e.target.value
                if (text && text.length > 0)
                    search(text);
                else
                    setSearchList([])
            }} />
            {
                searchList && searchList.length > 0 &&
                <div>
                    {
                        searchList.map((song: Song, index: number) => {
                            return <span key={index}
                                onClick={() => {
                                    navigate(`/playlist?id=${song.album.id}&playId=${song.id}`);
                                    playId({ dispatch, user, fetchUser })
                                    setSearchList([])
                                }}
                            >{song.name}</span>
                        })
                    }
                </div>
            }

        </div>
    </div>
}
export function playId({ dispatch, user, fetchUser }: any) {
    const params = new URLSearchParams(window.location.search);
    const playId = params.get('playId')
    if (!playId) return;
    const song = user.songsList.find((music: Song) => playId === music.id)
    if (!song) return;
    let index = user.songsList.indexOf(song);
    if (index === -1) return;
    dispatch(fetchUser({ ...user, selectedSong: song }))
}
export default TopNav;