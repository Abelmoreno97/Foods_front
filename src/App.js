import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./Components/Navbar";
import style from "./app.module.css"


function App() {
  const loc = useLocation();
  
  return (
    <div className={style.APP}>

{loc.pathname !== "/" && <NavBar/>}

      <Route exact path={"/"}>
        <Landing />
      </Route>

      <Route exact path={"/recipes/:id"}>
        <Detail />
      </Route>

      <Route exact path={"/create"}>
        <Form />
      </Route>

      <Route exact path={"/home"}>
        <Home></Home>
      </Route>
    </div>
  );
}

export default App;
