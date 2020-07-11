import {
  REQUEST_CARS,
  RECIEVE_CARS,
  RECIEVE_DEALERS
} from '../actions'

const initialState = {
  loading: true,
  totalPages: null,
  hasPages: [],
  currentPage: 1,
  cars: [],
  dealers: []
}

const rootReducer = (
  state = initialState,
  {type, payload}
) => {
  switch(type) {
    case REQUEST_CARS:
      const newPages = state.hasPages.indexOf(payload.currentPage) === -1 ? 
        [...state.hasPages, payload.currentPage] : state.hasPages
      return {
        ...state,
        currentPage: payload.currentPage,
        loading: payload.loading,
        hasPages: newPages
      }
    case RECIEVE_CARS:
      return {
        ...state,
        totalPages: payload.totalPages ?? state.totalPages,
        cars: [
          ...state.cars,
          ...payload.cars
        ]
        
      }
    case RECIEVE_DEALERS:
      return {
        ...state,
        loading: payload.loading,
        dealers: [
          ...state.dealers,
          ...payload.newDealers
        ]
      }
    default:
      return state
  }
}

export default rootReducer;