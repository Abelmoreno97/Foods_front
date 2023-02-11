import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  filterByName,
  setCurrentPage,
  filterByHealtScore,
  getNameUser,
  getUsers,
  getDiets,
  filterByDiet,
} from "../redux/actions";
import style from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const users = useSelector((state) => state.users);

  const [input, setInput] = useState("");
  const [order, setOrder] = useState("");
  const [dietSelect, setDietSelect] = useState({
    diet: [],
  });

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
      dispatch(getDiets());
    }
  }, [dispatch, users.length]);

  let disabledSelect = !!dietSelect.diet.length;

  const handlerFilterDiet = (event) => {
    const value = event.target.value;

    if (value === "all") {
      dispatch(getUsers());
    } else {
      dispatch(filterByDiet(value));
    }

    setDietSelect({
      ...dietSelect,
      diet: [value],
    });
  };

  const handleDeleteDiet = (event) => {
    setDietSelect({
      diet: [],
    });
    window.location.reload();
    dispatch(getUsers);
  };

  const changeHandler = (event) => {
    const value = event.target.value;

    setInput(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getNameUser(input.toLowerCase()));
    setInput("");
  };

  const reloadHandler = (event) => {
    history.push("/home");
    window.location.reload();
    dispatch(getUsers());
    setInput("");
  };
  // ******************************************************
  const handleFilterOrder = (event) => {
    const value = event.target.value;

    if (value === "asc" || value === "des") {
      event.preventDefault();

      dispatch(filterByName(value));
      setCurrentPage(1);
      setOrder(`Ordenado por nombre ${value}`);
    }
    if (value === "healther" || value === "unhealtier") {
      event.preventDefault();

      dispatch(filterByHealtScore(value));
      setCurrentPage(1);
      setOrder(`Ordenado por ${value}`);
    }

    if (value === "def") {
      event.preventDefault();

      dispatch(getUsers());
      setCurrentPage(1);
      setOrder("Sin orden");
    }

    if (order.length < 0) {
      setOrder("");
    }
  };
  // *****************************************************
  return (
    <div className={style.mainCont}>
      <NavLink to="/home">
        <button className={style.button}>Home</button>{" "}
      </NavLink>
      <NavLink to="/create">
        <button className={style.button}>Create</button>{" "}
      </NavLink>
      <div className={style.filters}>
        <p>Order by</p>
        <select onChange={handleFilterOrder} defaultValue="def">
          <option value="def">Default</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
          <option value="healther">healther</option>
          <option value="unhealtier">unhealtier</option>
        </select>
      </div>
      <div>
        <select
          className={style.selectType}
          disabled={disabledSelect}
          onChange={handlerFilterDiet}
          defaultValue="all"
        >
          <option value="all">All Diets</option>
          {diets.map((type) => {
            return (
              <option name={type.name} value={type.name} key={type.name}>
                {type.name[0].toUpperCase()+type.name.slice(1).toLowerCase()}
              </option>
            );
          })}
        </select>

        {dietSelect.diet?.map((type, index) => {
          return (
            <div>
              <div key={index}>
                <p>{type[0].toUpperCase()+type.slice(1).toLowerCase()}</p>
                <button
                  className={style.popupButtonType}
                  name={type}
                  key={type}
                  onClick={handleDeleteDiet}
                >
                    X
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.container}>
        <input
          type="text"
          autoComplete="off"
          value={input}
          onChange={(event) => changeHandler(event)}
          placeholder="Find your recipe..."
        />
        <button
          onClick={submitHandler}
          disabled={!input.length}
          className={style.button}
        >
          SEARCH
        </button>
        <button onClick={reloadHandler} className={style.button}>
          RELOAD
        </button>
      </div>
    </div>
  );
};

export default NavBar;
