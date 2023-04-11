import style from "./Landing.module.css";
import img1 from "../../images/img1.png"
import logo from "../../images/logo.png"


const Landing = () => {
    return (
        <div>
            <img src={img1} className={style.landImg} alt="imagen landing"/>
            <a href = "http://localhost:3000/home" className={style.btn}>HOME</a>
            <br/>
            <img src={logo} className={style.logo} alt="imagen logo"/>


        </div>
        )
}

export default Landing;