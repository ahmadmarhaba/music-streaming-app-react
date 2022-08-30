import { useNavigate } from "react-router-dom";

const LeftNav = () => {
    const navigate = useNavigate();

    return <div className="options">
        <div>Music App</div>
        <div className={window.location.pathname === "/explore" ? "selectedText" : ''} onClick={() => { navigate("/explore") }}>
            <i className="bi bi-compass"></i>
            <span>Explore</span>
        </div>
        <div className={window.location.pathname === "/library" ? "selectedText" : ''} onClick={() => { navigate("/library") }}>
            <i className="bi bi-music-note-list"></i>
            <span>Your Library</span>
        </div>
    </div>
}

export default LeftNav;