import axios from 'axios'

class Api {
  _baseURL = 'https://jlrc.dev.perx.ru/carstock/api/v1'

  _getFromRecource = async ({ url, qparams }) => {
    const res = await axios.get(`${this._baseURL}/${url}`, {
      params: {...qparams},
      headers: {
        'X-CS-Dealer-Id-Only': '1'
      }
    })

    return res
  }

  getCarList = async (page = 1) => {
    const res = await this._getFromRecource({
      url: 'vehicles/',
      qparams: {
        state: 'active',
        hidden: 'false',
        group: 'new',
        per_page: '10',
        page
      }
    })

    return res
  }

  getDealers = async (ids) => {
    const res = await this._getFromRecource({
      url: 'dealers/',
      qparams: {
        id__in: ids
      }
    })

    return res
  }

}


export default new Api()