const titlesDefaultState = {
  isFetching: false,
  error: null,
  titles: [],
};

const titlesReducer = (state=titlesDefaultState, action) => {
  switch (action.type) {
    case "FETCH_TITLES": {
      return {...state, isFetching: true}
    }
    case "FETCH_TITLES_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "FETCH_TITLES_FULFILLED": {
      return {
        ...state,
        isFetching: false,
        titles: action.payload,
      }
    }
  }
  return state
}
export default titlesReducer;