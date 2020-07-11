import api from '../api'

export const REQUEST_CARS = 'REQUEST_CARS'
export const RECIEVE_CARS = 'RECIEVE_CARS'
export const REQUEST_DEALERS = 'REQUEST_DEALERS'
export const RECIEVE_DEALERS = 'RECIEVE_DEALERS'


const fetchDealersIfNeed = (ids) => async (dispatch, getState) => {
  
  const { dealers } = getState()
  let queryIds = []
  ids.forEach(id => {
    if(Object.keys(dealers).indexOf(id) === -1) {
      queryIds.push(id)
    }
  })
  if (queryIds.length) {
    dispatch({ type: REQUEST_DEALERS })
    const res = await api.getDealers(queryIds.join(','))
    let newDealers = {}
    res.data.forEach(dealerData => {
      newDealers[dealerData.id] = dealerData
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
      loading: true
    }})
  
    const res = await api.getCarList(page)
    let dealersIds = []
    res.data.forEach(car => {
      if(dealersIds.indexOf(car.dealer) === -1) {
        if(car.dealer) {
          dealersIds.push(car.dealer)
        }
      }
    });
  
    fetchDealersIfNeed(dealersIds)(dispatch, getState);
  
    let payload = {}
    let cars = {}
    if(!getState().totalPages) {
      payload.totalPages = Math.ceil(+res.headers['x-total-count'])
    }

    if (getState().hasPages.indexOf(page) === -1) {
      res.data.forEach(car => {
        if(!cars[page]) {
          cars[page] = [
            car
          ]
        } else {
          cars[page] = [
            ...cars[page],
            car
          ]
        }
      })

      payload.cars = cars
      payload.currentPage = page
      dispatch({ type: RECIEVE_CARS, payload })
    }
  } else {
    dispatch({ type: RECIEVE_CARS, payload: {
      currentPage: page
    }})
  }
}