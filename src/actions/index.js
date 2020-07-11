import api from '../api'

export const REQUEST_CARS = 'REQUEST_CARS'
export const RECIEVE_CARS = 'RECIEVE_CARS'
export const REQUEST_DEALERS = 'REQUEST_DEALERS'
export const RECIEVE_DEALERS = 'RECIEVE_DEALERS'


const fetchDealersIfNeed = (ids) => async (dispatch, getState) => {
  
  const { dealers } = getState()
  let queryIds = []
  ids.forEach(id => {
    if(dealers.indexOf(id) === -1) {
      queryIds.push(id)
    }
  })
  if (queryIds.length) {
    dispatch({ type: REQUEST_DEALERS })
    const res = await api.getDealers(queryIds.join(','))
    let newDealers = []
    res.data.forEach(dealerData => {
      newDealers.push({
        [dealerData.id]: dealerData
      })
    })

    dispatch({type: RECIEVE_DEALERS, payload: {
      newDealers,
      loading: false
    }})
  }
}

export const getCars = (page) => async (dispatch, getState) => {
  if(getState().hasPages.indexOf(page) === -1) {
    dispatch({ type: REQUEST_CARS, payload: {
      loading: true,
      currentPage: page
    }})
  
    const res = await api.getCarList()
    let dealersIds = []
    res.data.forEach(car => {
      if(dealersIds.indexOf(car.dealer) === -1) {
        dealersIds.push(car.dealer)
      }
    });
  
    fetchDealersIfNeed(dealersIds)(dispatch, getState);
  
    let payload = {}
    if(!getState().totalPages) {
      payload.totalPages = Math.ceil(+res.headers['x-total-count'] / 10)
    }
  
    payload.cars = res.data
  
    dispatch({ type: RECIEVE_CARS, payload })
  }
}