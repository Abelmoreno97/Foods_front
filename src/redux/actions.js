import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/recipes");

    const users = apiData.data;
    dispatch({ type: GET_USERS, payload: users });
  };
};

export const getUser = (id) => {
return async function (dispatch){
    const apiData = await axios.get(`http://localhost:3001/recipes/${id}`);
    const user =apiData.data;
    dispatch({type:"GET_USER",payload: user });
};
};

export const getDiets = (id) => {
  return async function (dispatch){
      const apiData = await axios.get(`http://localhost:3001/diets`);
      const diets =apiData.data;
      dispatch({type:"GET_DIETS",payload: diets });
  };
  };

  export function getDetailFromState(payload) {
    return {
      type: "GET_DETAIL_FROM_STATE",
      payload,
    };
  };

  export function setCurrentPage(payload) {
    return {
      type: "SET_CURRENT_PAGE",
      payload,
    };
  };


  export const filterByName = (payload) => {
    return {
      type: "FILTER_BY_NAME",
      payload,
    };
  };
  
  export const filterByHealtScore = (payload) => {
    return {
      type: "FILTER_BY_HEALTHSCORE",
      payload,
    };
  };

  export function getNameUser(name) {
    return async function (dispatch) {
        const apiList = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        const user = apiList.data 
        return dispatch({
          type: "GET_NAME",
          payload: user,
        });
      };
    };
  
    export const filterByDiet = (payload) => {
      return {
          type: "FILTER_BY_DIET",
          payload,
      }
  }


  
  // export const filterByDiet = (type) => {
  //   return async function (dispatch) {
  //       const apiList = await axios.get(/types/${type});
  //       const pokemons = apiList.data;
  
  //       dispatch({
  //         type: FILTER_BY_TYPE,
  //         payload: pokemons,
  //       })}}


// export const postRecipe = (body) => {
//   return async function (dispatch) {
//       const response = await axios.post(`http://localhost:3001//recipes/create`, body);
//       const neww = response.data
//       dispatch({type: "POST_RECIPE",payload: neww});
//   };
// }

