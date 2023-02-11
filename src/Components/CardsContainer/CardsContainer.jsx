import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
const CardsContainer = (users)=>{


    return(
       <div className={style.container}>
        {users.map(user=>{
            return <Card
            id={user.id}
            name={user.name}
            healthScore={user.healthScore}
            diets={user.diets}
            dishTypes={user.dishTypes}
            summary={user.summary}
            image={user.image}
            steps={user.steps}
            />
        })}
       </div>
    )
};

export default CardsContainer;

