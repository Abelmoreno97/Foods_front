import styles from "./Card.module.css"
import { Link } from "react-router-dom";
const Card = (props)=>{
    return(
        <div className={styles.card}>
            <p className={styles.parrafo}>Nº:{props.id}</p>
            <p className={styles.parrafo}>Name:<br/>{props.name}</p>
            <Link to={`recipes/${props.id}`}>
            <img className={styles.img} src={props.image} alt={props.name}></img>
        </Link>
        <p>CLICK PHOTO FOR DETAIL</p>
            {/* <p>healthScore:{props.healthScore}</p> */}
            <p className={styles.parrafo}>Diets:<br/>{props.diets}</p>
            {/* <p>dishTypes:{props.dishTypes}</p> */}
            {/* <button onClick={()=>window.location.href = `/recipes/${props.id}`}> ir a detalle</button> */}
        </div>
    )
};

export default Card;