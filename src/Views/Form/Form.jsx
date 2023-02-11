import { useEffect, useState } from "react";
import style from "./form.module.css";
import { getDiets, getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    steps: "",
    dishTypes: "",
    like:"",
    diets: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    steps: "",
    dishTypes: "",
    like:"",
    diets: [],
  });

  ////////////////^^^^^^^^^bariables de estado^^^^^^^^^//////////////////////

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(validate({ ...form, [property]: value }));
    // validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // agregar peticion al back para enviar formulario
    axios.post(`http://localhost:3001/recipes`, form);
    alert("recipe created");
    setForm({
      name: "",
      summary: "",
      healthScore: "",
      image: "",
      steps: "",
      dishTypes: "",
      like:"",
      diets: [],
    });
    history.push("/home");
    dispatch(getUsers())
  };

  const handleSelect = (event) => {
    if (!form.diets.includes(event.target.value)) {
      setForm({
        ...form,
        diets: [...form.diets, event.target.value],
      });
    }
  };

  const handleDeleteType = (ev) => {
    setForm({
      ...form,
      diets: form.diets.filter((t) => t !== ev),
    });
  };
  /////////////////////^^^^^^^^^^^^^^^handlers^^^^^^^^^^^^^^^^^^^^^^^^^^^////////////////////
  const validate = (form) => {
    const err = {};

    if (form.name === "") {
      err.name = "error, campo vacio";
    } else {
      err.name = "";
    }

    if (form.summary === "") {
      err.summary = "error, campo vacio";
    } else {
      err.summary = "";
    }

    if (form.healthScore === "") {
      err.healthScore = "error, campo vacio";
    } else if (form.healthScore > 100) {
      err.healthScore = "max 100";
    } else {
      err.healthScore = "";
    }

    if (form.steps === "") {
      err.steps = "error, campo vacio";
    } else {
      err.steps = "";
    }

    if (form.dishTypes === "") {
      err.dishTypes = "error, campo vacio";
    } else {
      err.dishTypes = "";
    }

    if (form.like === "") {
      err.like = "error, campo vacio";
    } else {
      err.like = "";
    }

    if (form.image === "") {
      err.image = "error, campo vacio";
    } else {
      err.image = "";
    }

    return err;
  };

  return (
    <form className={style.Form} onSubmit={submitHandler}>
      <h1> CREA TU RECETA</h1>
      <div className={style.divForm}>
        <label>name</label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div className={style.divForm}>
        <label>summary</label>
        <input
          type="text"
          value={form.summary}
          onChange={changeHandler}
          name="summary"
        />
        {errors.summary && <span>{errors.summary}</span>}
      </div>

      <div className={style.divForm}>
        <label>healthscore</label>
        <input
          type="number"
          value={form.healthScore}
          onChange={changeHandler}
          name="healthScore"
        />
        {errors.healthScore && <span>{errors.healthScore}</span>}
      </div>

      <div className={style.divForm}>
        <label>steps</label>
        <input
          type="text"
          value={form.steps}
          onChange={changeHandler}
          name="steps"
        />
        {errors.steps && <span>{errors.steps}</span>}
      </div>

      <div className={style.divForm}>
        <label>dishtypes</label>
        <input
          type="text"
          value={form.dishTypes}
          onChange={changeHandler}
          name="dishTypes"
        />
        {errors.dishTypes && <span>{errors.dishTypes}</span>}
      </div>

      <div className={style.divForm}>
        <label>like</label>
        <input
          type="text"
          value={form.like}
          onChange={changeHandler}
          name="like"
        />
        {errors.like && <span>{errors.like}</span>}
      </div>

      <div className={style.divForm}>
        <label>image</label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
        />
        {errors.image && <span>{errors.image}</span>}
      </div>

      <div className={style.ulDiets}>
        <>
        <label className={style.dietSelect} >Diets</label>
        <select className={style.dietSelect} onChange={(e) => handleSelect(e)} defaultValue="title">
          <option value="title" disabled>
            Select Diets
          </option>

          {diets.map((t) => {
            return (
              <option value={t.name} key={t.name}>
                {t.name[0].toUpperCase() + t.name.slice(1).toLowerCase()}
              </option>
            );
          })}
        </select>
        </>
          <>
        <ul>
          {form.diets.map((t) => {
            return (
              <li key={t}>
                {t[0].toUpperCase() + t.slice(1).toLowerCase()+" "}
                <button onClick={() => handleDeleteType(t)}>x</button>
              </li>
            );
          })}
        </ul>
        </>
        {errors.diets && <span>{errors.diets}</span>}
      </div>

      <button className={style.submit} type="submit">SUBMIT</button>
    </form>
  );
};

export default Form;
