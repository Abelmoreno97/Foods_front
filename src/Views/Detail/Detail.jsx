import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getDetailFromState } from "../../redux/actions";
import style from "./detail.module.css"
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length) {
      dispatch(getDetailFromState(id));
    } else {
      dispatch(getUser(id));
    }
  }, [dispatch, id, users.length]);
  return (
    <div className={style.main} >
      {user.length ? (
        <div className={style.cont}>
        <div className={style.header}>
         <p>Nº {user[0].id}</p>
         <p>{user[0].name}</p>
         <p>Health Score: {user[0].healthScore}</p>
        </div>
        <div className={style.header}>
          <p>Dish Types: {user[0].dishTypes}</p>
          <p>Diet Types: {user[0].diets}</p>
        </div>
         <div className={style.imgdes}>
         <img className={style.imagen} src={user[0].image} alt="img" />
         <p>Summary:<br/><br/>{user[0].summary.replace(/<[^>]*>?/g, '')}</p>
       </div>
       <div>
          <p>Like:<br/>{user[0].like}</p>
        </div>
        <div>
          <p>Steps:<br/>{user[0].steps}</p>
        </div>
        </div>
      ) : (
        <div>
          <p>error</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
