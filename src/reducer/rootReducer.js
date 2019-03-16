const initialState = {
  games: [],
  bets: [],
  teams: [],
  players: [],
  currentUser: {}
};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "UPDATE_GAMES":
      return { ...state, games: action.payload };
    case "UPDATE_TEAMS":
      return { ...state, teams: action.payload };
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}

export default reducer;