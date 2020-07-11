import React, { Component } from 'react'
import { Table } from 'antd'

export default class CarTable extends Component {

  changePage = (pagination) => {
    this.props.getCars(pagination.current - 1)
  }

  render() {
    const { pag, cars, dealers, loading } = this.props
    const { current } = pag
    let dataWithDealers = []

    let pagination = {
      current: pag.current + 1,
      pageSize: pag.pageSize,
      total: pag.total
    }

    if(!loading) {
      dataWithDealers = cars[current]
      dataWithDealers.length > 0 && dataWithDealers.forEach(car => {
        if(car.dealer) {
          const dealer = dealers[car.dealer]
          car.dealerName = dealer.name
          let offices = []
          dealer.offices.forEach(of =>offices.push(of.address))
          car.dealerOffices = offices.join(', ')
          car.key = car.id
        }
      })
    }

    const columns = [
      {
        title: 'VIN',
        dataIndex: 'vin',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
      },
      {
        title: 'Model',
        dataIndex: 'model',
      },
      {
        title: 'Grade',
        dataIndex: 'grade',
      },
      {
        title: 'Dealer',
        dataIndex: 'dealerName',
      },
      {
        title: 'Adress',
        dataIndex: 'dealerOffices',
      },
    ]


    return(
      <Table 
        onChange={this.changePage}
        pagination={pagination} 
        columns={columns} 
        loading={loading} 
        dataSource={dataWithDealers} />
    )
  }
}