import {Link} from "react-router-dom";
import style from "./NavBar.module.css"


const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            {/* <Link to="/home" className={style.word}>Home</Link> */}
            <Link to="/create" className={style.word}>Create a new Pokemon!</Link>
        </div>

    )
}

export default NavBar;