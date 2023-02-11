// import { useReducer } from "react";

const initialState = {
  currentPage: 1,
  allUsers: [],
  users: [],
  user: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, allUsers: action.payload };
    case "GET_USER":
      return { ...state, user: action.payload };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_DETAIL_FROM_STATE":
      const users = [...state.allUsers];
      const userDetail = users.filter(
        (r) => r.id.toString() === action.payload
      );
      return {
        ...state,
        user: userDetail,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
      case "FILTER_BY_NAME":
            const usersName = [...state.users];

            const nameFilter = action.payload === "asc" 
            ? usersName.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) 
            : usersName.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            });

            return {
                ...state,
                users: nameFilter,
            };

        case "FILTER_BY_HEALTHSCORE":
            const Health = [...state.users];

            const healthFilter = action.payload === "healther" 
            ? Health.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                if (b.healthScore > a.healthScore) {
                    return 1;
                }
                return 0;
            }) 
            : Health.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                    return 1;
                }
                if (b.healthScore > a.healthScore) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state,
                users: healthFilter,
            };

            case "GET_NAME":
      return {
        ...state,
        users: action.payload,
        currentPage: 1,
      };
      case "FILTER_BY_DIET":
            const usersFD = [...state.users]
            let usersByDiet = 
            action.payload === ""
            ? usersFD
            : usersFD.filter((recipe) =>
            recipe.diets.includes(action.payload))
            // usersFD.forEach(user => user.diets.forEach(diet => diet.name === action.payload ? usersByDiet.push(diet) : false))
            return {
                ...state,
                currentPage: 1,
                users: usersByDiet,
                //error: usersByDiet.length > 0 ? false : `There are no recipe with the ${action.payload} diet`
            }
    default:
      return { ...state };
  }
};

export default rootReducer;

// case "FILTER_BY_DIET":
//   const allRecipes = state.allRecipes;
//   const dietFiltered =
//       action.payload === ""
//           ? allRecipes
//           : //payload includes
//           allRecipes.filter((recipe) =>
//               recipe.diets.includes(action.payload)
//           );
//   return {
//       ...state,
//       recipes: dietFiltered,
//   };