import React, { Component } from 'react'
import { Table } from 'antd'

export default class CarTable extends Component {
  render() {
    const { pagination, cars, dealers, loading } = this.props
    const { current, pageSize } = pagination
    const firstIndex = current * pageSize - pageSize
    const lastIndex = current * pageSize - 1
    let dataWithDealer = cars.slice(firstIndex, lastIndex)

    dataWithDealer.forEach(el => {
      el.dealerData = dealers.find(el2 => el2 === el.dealer)
    })

    const columns = [
      {
        title: 'VIN',
        dataIndex: 'vin',
      },
      {
        title: 'Brand',
        dataIndex: 'Brand',
      },
      {
        title: 'Model',
        dataIndex: 'Model',
      },
      {
        title: 'Grade',
        dataIndex: 'Grade',
      },
      {
        title: 'Dealer',
        dataIndex: 'Dealer',
      },
    ];


    return(
      <Table pagination={pagination} columns={columns} loading={loading} />
    )
  }
}