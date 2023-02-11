import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardsContainer from "../CardsContainer/CardsContainer";
import { setCurrentPage } from "../../redux/actions";
import style from "./pages.module.css";

const Pages = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentPage = useSelector((state) => state.currentPage);
  const [usersPerPage] = useState(9);
  const handleClick = (event) => {
    dispatch(setCurrentPage(Number(event.target.id)));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pages.push(i);
  }

  const IlastUser = currentPage * usersPerPage;
  const IfirstUser = IlastUser - usersPerPage;
  const currentUsers = users.slice(IfirstUser, IlastUser);

  const pageNumbers = pages.map((number) => {
    if (currentPage === number) {
      return (
        <li
          className={style.active}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return (
        <li
          className={style.number}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    }
  });

  const handleNext = () => {
    if (currentPage + 1 <= pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      return null;
    }
  };

  const handlePrev = () => {
    if (currentPage - 1 >= 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      return null;
    }
  };

  return (
    <div>
      <nav >
        <ul name="top" className={style.list}>
          <li>
            <button className={style.button} onClick={handlePrev}>PREV PAGE</button>
          </li>

          {pageNumbers}

          <li>
            <button className={style.button} onClick={handleNext}>NEXT PAGE</button>
          </li>
        </ul>
      </nav>
      <div>
        {currentPage ? (
          CardsContainer(currentUsers)
        ) : (
          <button id="1" onClick={handleClick}>
            volver
          </button>
        )}
      </div>
      <nav className={style.pageBottom}>
        <ul name="bottom" className={style.list}>
          <li>
            <button className={style.button} onClick={handlePrev}>PREV PAGE</button>
          </li>

          {pageNumbers}

          <li>
            <button className={style.button} onClick={handleNext}>NEXT PAGE</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pages;
