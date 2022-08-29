import { useNavigate } from "react-router-dom";

const TopNav = () => {
    const navigate = useNavigate();
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
            <input type="text" placeholder="Search music" />
        </div>
    </div>
}

export default TopNav;