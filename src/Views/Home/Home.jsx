import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions";
import style from "./home.module.css";
import Pages from "../../Components/pages/Pages";

const Home = () => {
  const dispatch = useDispatch();
//   const users = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={style.home}>
      <Pages />
    </div>
  );
};

export default Home;
