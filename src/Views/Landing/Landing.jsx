import { Link } from "react-router-dom";
import style from "./landing.module.css"

const Landing = ()=>{
    return(
        <div className={style.Landing}>
            <p className={style.title}> HENRY FOODS APP</p>
    <Link to="/home" >
        <button className={style.boton}>EMPECEMOS</button>
    </Link>
        </div>
    )
};

export default Landing;